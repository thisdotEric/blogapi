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
  UploadedFile,
  UseBefore,
} from 'routing-controllers';
import { Service } from 'typedi';
import { BlogService } from './blogs.service';
import upload from '../../utils/multer';

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
      throw new HttpError(500, error.message);
    }
  }

  @Get('/:id')
  @OnUndefined(200)
  async getSingleBlog(@Param('id') id: string) {
    try {
      const blog = await this.blogService.getSingleBlog(id);
      return blog;
    } catch (error) {
      throw new NotFoundError(error.message);
    }
  }

  @Delete('/:id')
  @OnUndefined(200)
  async deleteBlog(@Param('id') id: string) {
    try {
      await this.blogService.deleteBlog(id);
    } catch (error) {
      throw new HttpError(500, error.message);
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
      throw new HttpError(500, error.message);
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
      throw new HttpError(500, error.message);
    }
  }

  @Post('/:id/images')
  @OnUndefined(200)
  @UseBefore(upload.single('image'))
  async uploadImage(@Param('id') id: string, @UploadedFile('image') file: any) {
    /**
     * TODO: Filenames with spaces in between must be trimmed
     */
    try {
      await this.blogService.addBlogImage(id, {
        name: file.originalname,
        path: file.path,
      });
    } catch (error) {
      throw new HttpError(500, error.message);
    }
  }
}
