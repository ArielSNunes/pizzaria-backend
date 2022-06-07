import { Injectable } from '@nestjs/common'
import {
	ConfigOptions,
	UploadApiErrorResponse,
	UploadApiResponse,
	v2,
} from 'cloudinary'
import * as toStream from 'buffer-to-stream'

@Injectable()
export class CloudinaryService {
	constructor(private readonly config: ConfigOptions) {}

	async uploadFile(file: Express.Multer.File): Promise<UploadApiResponse> {
		return new Promise((resolve, reject) => {
			const upload = v2.uploader.upload_stream(
				{
					folder: 'nest-pizzaria',
					filename_override: Date.now().toString(),
				},
				(error, result) => {
					if (error) return reject(error)
					resolve(result)
				},
			)

			toStream(file.buffer).pipe(upload)
		})
	}
}
