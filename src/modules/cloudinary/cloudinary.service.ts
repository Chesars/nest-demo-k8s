import { Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 } from 'cloudinary';
import * as toStream from 'buffer-to-stream';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CloudinaryService {
  constructor(private readonly productsService: ProductsService)  {}

  async uploadImage(file: Express.Multer.File , productId : string ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            if (result) {
              const secureUrl = result.secure_url;
              const updatedProduct = this.productsService.updateProductImage(productId, secureUrl);
              resolve(result);
            } else {
              reject(new Error('Upload is undefined'));
            }
          }
        },
      );

      toStream(file.buffer).pipe(upload);
    
    });
  }
}