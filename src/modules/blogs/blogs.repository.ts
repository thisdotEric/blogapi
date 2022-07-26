import { IRead, IWrite } from 'src/interfaces/repository.interface';
import { Service } from 'typedi';
import Blog from './blogs.model';
import { IBlog } from './blogs.model';

type IBlogWithID = IBlog & { id: string };

@Service()
export class BlogsRepository
  implements IWrite<IBlogWithID>, IRead<IBlogWithID>
{
  async getAll(): Promise<IBlogWithID[]> {
    const blogs = await Blog.find({}).lean();

    if (!blogs) {
      throw new Error('Empty blogs');
    } else return [];
  }

  async get(id: string): Promise<IBlogWithID> {
    const blog = await Blog.findOne({ _id: id }).lean();

    if (!blog) {
      throw new Error('Empty blog');
    } else {
      return {
        id: '',
        name: blog.name,
        content: blog.content,
        date: blog.date,
      };
    }
  }

  async create({ name, content, date }: IBlog): Promise<IBlogWithID> {
    const newBlog = new Blog({ name, content, date });
    const savedBlog = await newBlog.save();

    return {
      id: savedBlog.id,
      name: savedBlog.name,
      content: savedBlog.content,
      date: savedBlog.date,
    };
  }

  async update(
    id: string,
    { name, content, date }: IBlog
  ): Promise<IBlogWithID> {
    await Blog.updateOne({ _id: id, name, content, date });
    return {
      id: 's',
      name: '',
      content: '',
      date: new Date(),
    };
  }

  async delete(id: string): Promise<boolean> {
    await Blog.findOneAndRemove({ _id: id });
    return true;
  }

  async updateBlog(id: string, updatedBlog: IBlog) {
    await Blog.updateOne({ _id: id, ...updatedBlog });
  }
}
