export interface ICloudinaryUploadSinglePayload {
  image: string
}

export interface ICloudinaryUploadSingleResponse {
  url: string
}

export interface ICloudinaryUploadMultiplePayload {
  images: string[]
}

export interface ICloudinaryUploadMultipleResponse {
  urls: string[]
}

export interface ICloudinaryUploadUrlPayload {
  url: string
}

export interface iCloudinaryUploadUrlsPayload {
  urls: string[]
}

export interface ICloudinaryDeleteSinglePayload {
  publicId: string
}

export interface ICloudinaryDeleteMultiplePayload {
  publicIds: string[]
}
