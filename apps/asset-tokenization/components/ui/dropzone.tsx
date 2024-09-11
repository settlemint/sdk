"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import {
  CheckIcon,
  CloudUploadIcon,
  FileIcon,
  FileSymlinkIcon,
  FileTextIcon,
  ImageIcon,
  LoaderCircleIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import ReactDropzone from "react-dropzone";
import { useToast } from "./../hooks/use-toast";
import { Badge } from "./badge";
import { Skeleton } from "./skeleton";

type Action = {
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
  // Define the maximum length for the substring
  const maxSubstrLength = 18;
  // Check if the fileName is longer than the maximum length
  if (fileName.length > maxSubstrLength) {
    // Extract the first part of the fileName (before the extension)
    const fileNameWithoutExtension = fileName.split(".").slice(0, -1).join(".");
    // Extract the extension from the fileName
    const fileExtension = fileName.split(".").pop() ?? "";
    // Calculate the length of characters to keep in the middle
    const charsToKeep = maxSubstrLength - (fileNameWithoutExtension.length + fileExtension.length + 3);
    // Create the compressed fileName
    const compressedFileName = `${fileNameWithoutExtension.substring(
      0,
      maxSubstrLength - fileExtension.length - 3,
    )}...${fileNameWithoutExtension.slice(-charsToKeep)}.${fileExtension}`;
    return compressedFileName;
  }

  // If the fileName is shorter than the maximum length, return it trimmed
  return fileName.trim();
}

function fileToIcon(file_type: string): React.ReactNode {
  if (file_type.includes("application")) return <FileTextIcon />;
  if (file_type.includes("text")) return <FileTextIcon />;
  if (file_type.includes("image")) return <ImageIcon />;
  return <FileIcon />;
}

const extensions = {
  image: ["jpg", "jpeg", "png", "webp"],
  application: ["pdf"],
};

export function Dropzone({
  label,
  name,
  action,
}: { label: string; name: string; action: (state: unknown, formData: FormData) => void }) {
  const [state, formAction] = useFormState(action, null);
  const { toast } = useToast();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [actions, setActions] = useState<Action[]>([]);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [files, setFiles] = useState<Array<File>>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const accepted_files = {
    "image/*": [".jpg", ".jpeg", ".png", ".webp"],
  };

  const reset = () => {
    setIsDone(false);
    setActions([]);
    setFiles([]);
    setIsReady(false);
  };

  const handleUpload = (data: Array<File>): void => {
    handleExitHover();
    setFiles(data);
    const temp: Action[] = [];
    for (const file of data) {
      temp.push({
        file_name: file.name,
        file_size: file.size,
        from: file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2),
        to: null,
        file_type: file.type,
        file,
        isUploaded: false,
        isUploading: false,
        is_error: false,
      });
    }
    setActions(temp);
    const formData = new FormData();
    for (const file of data) {
      formData.append(name, file);
    }
    formAction(formData);
  };
  const handleHover = (): void => setIsHover(true);
  const handleExitHover = (): void => setIsHover(false);
  const updateAction = (file_name: string, to: string) => {
    setActions(
      actions.map((action): Action => {
        if (action.file_name === file_name) {
          console.log("FOUND");
          return {
            ...action,
            to,
          };
        }

        return action;
      }),
    );
  };
  const checkIsReady = useCallback((): void => {
    const tempIsReady = actions.every((action) => action.to);
    setIsReady(tempIsReady);
  }, [actions]);

  const deleteAction = (action: Action): void => {
    setActions(actions.filter((elt) => elt !== action));
    setFiles(files.filter((elt) => elt.name !== action.file_name));
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

  if (actions.length) {
    return (
      <div className="space-y-6">
        {actions.map((action: Action) => (
          <div
            key={action.file_name}
            className="w-full py-4 space-y-2 lg:py-0 relative cursor-pointer rounded-xl border h-fit lg:h-20 px-4 lg:px-10 flex flex-wrap lg:flex-nowrap items-center justify-between"
          >
            {!isLoaded && <Skeleton className="h-full w-full -ml-10 cursor-pointer absolute rounded-xl" />}
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
              <Badge variant="default" className="flex gap-2 bg-green-500">
                <span>Done</span>
                <CheckIcon />
              </Badge>
            ) : action.isUploading ? (
              <Badge variant="default" className="flex gap-2">
                <span>Uploading</span>
                <span className="animate-spin">
                  <LoaderCircleIcon />
                </span>
              </Badge>
            ) : (
              <></>
            )}

            {
              <span
                onClick={() => deleteAction(action)}
                onKeyDown={(e) => e.key === "Enter" && deleteAction(action)}
                role="button"
                tabIndex={0}
                className="cursor-pointer hover:bg-muted rounded-full h-10 w-10 flex items-center justify-center text-2xl text-foreground"
              >
                <Cross2Icon />
              </span>
            }
          </div>
        ))}
      </div>
    );
  }

  return (
    <ReactDropzone
      onDrop={handleUpload}
      onDragEnter={handleHover}
      onDragLeave={handleExitHover}
      accept={accepted_files}
      onDropRejected={() => {
        handleExitHover();
        toast({
          variant: "destructive",
          title: "Error uploading your file(s)",
          description: "Allowed Files: Audio, Video and Images.",
          duration: 5000,
        });
      }}
      onError={() => {
        handleExitHover();
        toast({
          variant: "destructive",
          title: "Error uploading your file(s)",
          description: "Allowed Files: Audio, Video and Images.",
          duration: 5000,
        });
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className=" bg-background h-72 lg:h-80 xl:h-40 rounded-3xl shadow-sm border-secondary border-2 border-dashed cursor-pointer flex items-center justify-center"
        >
          <input {...getInputProps()} />
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
  );
}
