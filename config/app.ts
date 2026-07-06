export const APP_CONFIG = {
  upload: {
    maxFiles: 10,
    maxFileSize: 100 * 1024 * 1024, // 100 MB
    maxTotalSize: 500 * 1024 * 1024, // 500 MB
  },
} as const;