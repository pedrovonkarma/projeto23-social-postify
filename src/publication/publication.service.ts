import { Injectable } from '@nestjs/common';
import { Publication } from './entity/publication.entity';
import { CreatePostDTO } from './dto/create-publication.dto';

@Injectable()
export class PublicationService {
  publication: Publication[] = [];

  createPublication({image, title, text, dateToPublish, published, socialMedia, userId}: CreatePostDTO){
    const post = new Publication(image, title, text, dateToPublish, published, socialMedia, userId)
    return this.publication.push(post)
  }
}