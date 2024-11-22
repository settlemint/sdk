"use client";

import { Badge } from "@/components/ui/badge";
import {
  CheckIcon,
  CloudUploadIcon,
  FileIcon,
  FileSymlinkIcon,
  FileTextIcon,
  ImageIcon,
  TriangleAlertIcon,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import ReactDropzone from "react-dropzone";
import { toast } from "sonner";
import { useLocalStorage } from "usehooks-ts";
import { useMultiFormStep } from "./form-multistep";

interface DropzoneProps {
  label: string;
  name: string;
  uploadDir?: string;
  accept?: {
    images: Array<".jpg" | ".jpeg" | ".png" | ".webp">;
    text: Array<".pdf" | ".docx" | ".doc" | ".txt" | ".md" | ".csv" | ".xls" | ".xlsx">;
  };
  maxSize?: number;
  maxFiles?: number;
  multiple?: boolean;
}

type Action = {
  id: string;
  file: File;
  file_name: string;
  file_size: number;
  from: string;
  to: string | null;
  file_type: string;
  isUploading?: boolean;
  isUploaded?: boolean;
  is_error?: boolean;
  url?: string;
  output?: File;
};

function bytesToSize(bytes: number): string {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = (bytes / 1024 ** i).toFixed(2);
  return `${size} ${sizes[i]}`;
}

function truncateFileName(fileName: string): string {
  const maxSubstrLength = 18;
  if (fileName.length > maxSubstrLength) {
    const fileNameWithoutExtension = fileName.split(".").slice(0, -1).join(".");
    const fileExtension = fileName.split(".").pop() ?? "";
    const charsToKeep = maxSubstrLength - (fileNameWithoutExtension.length + fileExtension.length + 3);
    const compressedFileName = `${fileNameWithoutExtension.substring(
      0,
      maxSubstrLength - fileExtension.length - 3,
    )}...${fileNameWithoutExtension.slice(-charsToKeep)}.${fileExtension}`;
    return compressedFileName;
  }
  return fileName.trim();
}

function fileToIcon(file_type: string): React.ReactNode {
  if (file_type.includes("application")) return <FileTextIcon />;
  if (file_type.includes("text")) return <FileTextIcon />;
  if (file_type.includes("image")) return <ImageIcon />;
  return <FileIcon />;
}

export function Dropzone({
  label,
  name,
  accept = { images: [".jpg", ".jpeg", ".png", ".webp"], text: [".pdf"] },
  maxSize,
  maxFiles,
  multiple = true,
}: DropzoneProps) {
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

  const [isHover, setIsHover] = useState<boolean>(false);
  const [_multiple] = useState<boolean>(Boolean(multiple));
  const [actions, setActions] = useState<Action[]>([]);
  const [, setIsReady] = useState<boolean>(false);
  const [files, setFiles] = useState<Array<File>>([]);
  const [, setIsDone] = useState<boolean>(false);
  const [activeUploads, setActiveUploads] = useState<Record<string, XMLHttpRequest>>({});
  const { formId } = useMultiFormStep();
  const [storageState] = useLocalStorage<Record<string, unknown>>(
    "files",
    JSON.parse(typeof window !== "undefined" ? (localStorage.getItem("files") ?? "{}") : "{}"),
  );
  const [, setIsNavigate] = useState(true);

  const [storageStateActions, setStorageStateActions] = useState<Action[]>(
    Object.values(storageState[formId] ?? {}).map(
      (file) =>
        ({
          id: file.id,
          file_name: file.name,
          file_size: file.size,
          from: file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2),
          to: null,
          file_type: file.type,
          file: file,
          isUploaded: true,
          isUploading: false,
        }) as Action,
    ),
  );

  const generateUniqueId = () => `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const handleUpload = async (files: Array<File>): Promise<void> => {
    handleExitHover();
    setFiles((prevFiles) => [...prevFiles, ...files]);
    const _actions: Action[] = [...storageStateActions];

    for (const file of files) {
      const id = generateUniqueId();
      (file as File & { id: string }).id = id;
      _actions.push({
        id,
        file_name: file.name,
        file_size: file.size,
        from: file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2),
        to: null,
        file_type: file.type,
        file,
        isUploaded: false,
        isUploading: true,
        is_error: false,
      });
    }
    setActions(_actions);
    setStorageStateActions(_actions);

    for (const file of files) {
      try {
        const id = (file as File & { id: string }).id;

        // Get the upload URL
        const response = await fetch("/api/upload/s3", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileName: file.name, fileType: file.type }),
        });

        if (!response.ok) throw new Error("Failed to get upload URL");

        const {
          data: { uploadUrl },
        } = await response.json();

        const xhr = new XMLHttpRequest();

        console.log("UPLOAD URL", uploadUrl);

        xhr.open("PUT", uploadUrl, true);
        setActiveUploads((prev) => ({ ...prev, [id]: xhr }));

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            setUploadProgress((prev) => ({
              ...prev,
              [file.name]: progress,
            }));
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200) {
            setActions((prev) =>
              prev.map((action) =>
                action.file_name === file.name ? { ...action, isUploaded: true, isUploading: false, id } : action,
              ),
            );
            toast.success(`Upload file ${file.name} successfully`);

            const localStorageFiles = JSON.parse(localStorage.getItem("files") ?? "{}")[formId] ?? {};
            const localStorageState = {
              [formId]: {
                ...localStorageFiles,
                [(file as File & { id: string }).id]: {
                  id: (file as File & { id: string }).id,
                  name: file.name,
                  size: file.size,
                  type: file.type,
                },
              },
            };
            localStorage.setItem("files", JSON.stringify(localStorageState));
          } else {
            setActions((prev) =>
              prev.map((action) =>
                action.file_name === file.name ? { ...action, is_error: true, isUploading: false, id } : action,
              ),
            );
            toast.error(`Failed to upload ${file.name}`);
          }
        };

        xhr.onerror = () => {
          setActions((prev) =>
            prev.map((action) =>
              action.file_name === file.name ? { ...action, is_error: true, isUploading: false, id } : action,
            ),
          );

          setActiveUploads((prev) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [id]: _, ...rest } = prev;
            return rest;
          });

          toast.error(`Failed to upload ${file.name}`);
        };

        xhr.send(file);
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("There was an error initiating your upload.");
      }
    }
  };

  const handleHover = (): void => setIsHover(true);

  const handleExitHover = (): void => setIsHover(false);

  const checkIsReady = useCallback((): void => {
    const tempIsReady = actions.every((action) => action.to);
    setIsReady(tempIsReady);
  }, [actions]);

  const deleteAction = async (action: Action): Promise<void> => {
    const localStoragefiles = JSON.parse(localStorage.getItem("files") ?? "{}");
    delete localStoragefiles[formId][action.id];
    localStorage.setItem("files", JSON.stringify(localStoragefiles));
    setStorageStateActions(storageStateActions.filter((a) => a.id !== action.id));
    setActions(actions.filter((a) => a !== action));
    setFiles(files.filter((a) => a.name !== action.file_name));

    // Cancel the upload if it's still in progress
    if (activeUploads[action.id]) {
      activeUploads[action.id].abort();
      setActiveUploads((prev) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [action.id]: _, ...rest } = prev;
        return rest;
      });
    }

    try {
      const fileName = action.file_name.split(".").slice(0, -1).join(".");
      const extension = action.file_name.split(".").pop();
      const response = await fetch(`/api/upload?fileName=${fileName}_id_${action.id}.${extension}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete file");
      }

      // If the server deletion was successful, update the local state
      setActions(actions.filter((elt) => elt !== action));
      setFiles(files.filter((elt) => elt.name !== action.file_name));

      toast.success(`File ${action.file_name} deleted successfully`);
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error(`Failed to delete ${action.file_name}`);
    }
  };

  useEffect(() => {
    if (!actions.length) {
      setIsDone(false);
      setFiles([]);
      setIsReady(false);
    } else {
      checkIsReady();
    }
  }, [actions, checkIsReady]);

  useEffect(() => {
    setIsNavigate(false);
  }, []);

  const fileuploads = Array.from(new Map([...storageStateActions, ...actions].map((item) => [item.id, item])).values());

  return (
    <div className="Dropzone">
      <div className="space-y-6 mb-6">
        {fileuploads.map((action: Action, i: number) => (
          <div
            key={`${action.file_name}-${i}`}
            className="overflow-hidden w-full py-4 space-y-2 lg:py-0 relative rounded-xl border h-fit lg:h-20 px-4 flex flex-wrap lg:flex-nowrap items-center justify-between"
          >
            <div className="flex gap-4 items-center">
              <span className="text-2xl">{fileToIcon(action.file_type)}</span>
              <div className="flex items-center gap-1 w-96">
                <span className="text-md font-medium overflow-x-hidden">{truncateFileName(action.file_name)}</span>
                <span className="text-muted-foreground text-sm">({bytesToSize(action.file_size)})</span>
              </div>
            </div>

            {action.is_error ? (
              <Badge variant="destructive" className="flex gap-2">
                <span>Error Uploading File</span>
                <TriangleAlertIcon />
              </Badge>
            ) : action.isUploaded ? (
              <div>
                <CheckIcon />
              </div>
            ) : action.isUploading ? (
              <Badge variant="default" className="flex gap-2 bg-transparent">
                <span className="text-xs">{uploadProgress[action.file_name]}%</span>
              </Badge>
            ) : (
              <></>
            )}

            <button
              onClick={() => deleteAction(action)}
              className="hover:bg-muted rounded-full h-10 w-10 flex items-center justify-center text-2xl text-foreground"
              aria-label="Delete file"
              type="button"
            >
              <X />
            </button>

            {action.isUploading && (
              <span
                className="absolute bottom-0 left-0 inline-block h-1 bg-white"
                style={{ width: `${uploadProgress[action.file_name]}%` }}
              />
            )}
          </div>
        ))}
      </div>

      <div
        className={
          Array.from(fileuploads).length === 1 && multiple === false ? "Dropzone__content hidden" : "Dropzone__content"
        }
      >
        <ReactDropzone
          onDrop={handleUpload}
          onDragEnter={handleHover}
          onDragLeave={handleExitHover}
          accept={{
            "image/*": accept.images,
            "text/*": accept.text,
          }}
          maxSize={maxSize}
          maxFiles={maxFiles}
          multiple={_multiple}
          onDropRejected={() => {
            handleExitHover();
            toast.error("Error uploading your file(s). Allowed Files: Audio, Video and Images.");
          }}
          onError={() => {
            handleExitHover();
            toast.error("Error uploading your file(s). Allowed Files: Audio, Video and Images.");
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className=" bg-background h-72 lg:h-80 xl:h-40 rounded-3xl shadow-sm border-secondary border-2 border-dashed cursor-pointer flex items-center justify-center"
            >
              <input {...getInputProps()} name={name} multiple={_multiple} />
              <div className="space-y-4 text-foreground">
                {isHover ? (
                  <>
                    <div className="justify-center flex text-6xl">
                      <FileSymlinkIcon />
                    </div>
                    <h3 className="text-center font-medium text-md">Yes, right here</h3>
                  </>
                ) : (
                  <>
                    <div className="justify-center flex text-6xl">
                      <CloudUploadIcon />
                    </div>
                    <h3 className="text-center font-medium text-md">{label}</h3>
                  </>
                )}
              </div>
            </div>
          )}
        </ReactDropzone>
      </div>
    </div>
  );
}
