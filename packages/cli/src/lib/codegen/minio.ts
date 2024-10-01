export async function createMinioS3Client() {
  return {
    importLine: "",
    sdkLine: {
      minio: "sdkGenerator.createMinioS3Client({...config?.minio}),",
    },
  };
}
