import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    // private connection: Connection
  ) { }

  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  async findAll() {
    const r = await this.postRepository.find();
    return r.map(x=>{
      let content = x.content || ''
      if ( content.includes('<!--more-->') ) {
        content = content.split('<!--more-->')[0].replace(/\n+$/g,'')
      } else {
        content = content.substring(0,60) + '...'
      }
      return {
        ...x,
        content

      }
    })
  }

  async findOne(id: number) {
    const r = await this.postRepository.find({id})[0]
    return r
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
