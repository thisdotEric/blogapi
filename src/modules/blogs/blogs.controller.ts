import {
  Body,
  Delete,
  Get,
  HttpError,
  JsonController,
  NotFoundError,
  OnUndefined,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseBefore,
} from 'routing-controllers';
import { Service } from 'typedi';
import { BlogService } from './blogs.service';
import upload from '../../utils/multer';
import { Request } from 'express';

@JsonController('blogs')
@Service()
export class BlogsController {
  constructor(private readonly blogService: BlogService) {}

  @Get('/')
  async getAllBlogs(): Promise<any[]> {
    try {
      const allBlogs = await this.blogService.getAllBlogs();
      return allBlogs;
    } catch (error) {
      throw new HttpError(500, 'Error fetching blogs');
    }
  }

  @Get('/:id')
  @OnUndefined(200)
  async getSingleBlog(@Param('id') id: string) {
    try {
      const blog = await this.blogService.getSingleBlog(id);
      return blog;
    } catch (error) {
      throw new NotFoundError('Blog not found');
    }
  }

  @Delete('/:id')
  @OnUndefined(200)
  async deleteBlog(@Param('id') id: string) {
    try {
      await this.blogService.deleteBlog(id);
    } catch (error) {
      throw new HttpError(500, 'Error deleting blog');
    }
  }

  @Post('/')
  @OnUndefined(201)
  async createBlog(@Body() body: any) {
    try {
      const newBlog = await this.blogService.createNewBlog({
        name: body.name,
        content: body.content,
        date: body.date,
      });

      return newBlog;
    } catch (error) {
      throw new HttpError(500, 'Error adding new blog item');
    }
  }

  @Patch('/:id')
  @OnUndefined(200)
  async updateBlog(@Body() body: any, @Param('id') id: string) {
    try {
      const updatedBlog = await this.blogService.updateBlog(id, {
        name: body.name,
        content: body.content,
        date: body.date,
      });

      return updatedBlog;
    } catch (error) {
      throw new HttpError(500, 'Error updating blog item');
    }
  }

  @Post('/:id/images')
  @OnUndefined(200)
  @UseBefore(upload.single('image'))
  async uploadImage(
    @Req() req: Request,
    @Param('id') id: string,
    @UploadedFile('image') file: any
  ) {
    console.log(id);

    const filePath = req.protocol + '://' + req.hostname + '/' + file.filename;
    console.log(filePath);

    await this.blogService.createNewBlog({
      name: 'sd',
      content: 'sdf',
      date: new Date(),
    });

    return {
      status: 'uploaded',
    };
  }
}
