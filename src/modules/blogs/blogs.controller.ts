import {
  Body,
  Get,
  HttpError,
  JsonController,
  OnUndefined,
  Post,
} from 'routing-controllers';
import { Service } from 'typedi';
import { BlogService } from './blogs.service';

@JsonController('blogs')
@Service()
export class BlogsController {
  constructor(private readonly blogService: BlogService) {}

  @Get('/')
  async getAllBlogs() {
    try {
      const allBlogs = await this.blogService.getAllBlogs();
      return allBlogs;
    } catch (error) {
      return new HttpError(400, 'Error');
    }
  }

  @Post('/')
  @OnUndefined(201)
  async createBlog(@Body() body: any) {
    await this.blogService.createNewBlog({
      name: body.name,
      content: body.content,
      date: new Date(),
    });
  }
}
