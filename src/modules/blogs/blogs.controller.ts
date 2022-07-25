import {
  Body,
  Controller,
  Delete,
  Get,
  HttpError,
  OnUndefined,
  Param,
  Patch,
  Post,
} from 'routing-controllers';
import { Service } from 'typedi';
import { BlogService } from './blogs.service';

@Controller('blogs')
@Service()
export class BlogsController {
  constructor(private readonly blogService: BlogService) {}

  @Get('/')
  async getAllBlogs(): Promise<any[]> {
    try {
      const allBlogs = await this.blogService.getAllBlogs();
      console.log(allBlogs);

      return allBlogs;
    } catch (error) {
      throw new HttpError(500, 'Error');
    }
  }

  @Get('/:id')
  @OnUndefined(200)
  async getSingleBlog(@Param('id') id: string) {
    const blog = await this.blogService.getSingleBlog(id);
    return blog?.toObject();
  }

  @Delete('/:id')
  @OnUndefined(200)
  async deleteBlog(@Param('id') id: string) {
    await this.blogService.deleteBlog(id);
    return 'Deleted';
  }

  @Post('/')
  @OnUndefined(201)
  async createBlog(@Body() body: any) {
    return await this.blogService.createNewBlog({
      name: body.name,
      content: body.content,
      date: new Date(),
    });
  }

  @Patch('/:id')
  @OnUndefined(200)
  async updateBlog(@Body() body: any, @Param('id') id: string) {
    return await this.blogService.updateBlog(id, {
      name: body.name,
      content: body.content,
      date: new Date(),
    });
  }
}
