import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

type ActionResponse<T = unknown> = {
  data?: T;
  error?: string;
};

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: Request): Promise<NextResponse<ActionResponse>> {
  try {
    const { fileName, fileType } = await request.json();

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // URL expires in 1 hour

    return NextResponse.json({ success: true, data: { uploadUrl } });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    return NextResponse.json({ success: false, error: "Failed to generate upload URL" }, { status: 500 });
  }
}
