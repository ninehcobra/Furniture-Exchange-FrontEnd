export const UPLOAD_CONSTANTS = {
  MAX_FILE_SIZE: 1024 * 1024,
  MAX_UPLOAD_MULTIPLE_FILES: 10,
  VALID_UPLOADS_MIME_TYPES: [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/webp',
  ],
} as const;
