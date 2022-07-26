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
    }

    return blogs.map((b) => ({
      id: b._id.toString(),
      name: b.name,
      content: b.content,
      date: b.date,
      tags: b.tags == undefined ? [] : b.tags,
      images: b.images ?? [],
    }));
  }

  async get(id: string): Promise<IBlogWithID> {
    const blog = await Blog.findOne({ _id: id }).lean();

    if (!blog) {
      throw new Error('Empty blog');
    }

    return {
      id: blog._id.toString(),
      name: blog.name,
      content: blog.content,
      date: blog.date,
      tags: blog.tags == undefined ? [] : blog.tags,
      images: blog.images ?? [],
    };
  }

  async create({ name, content, date }: IBlog): Promise<IBlogWithID> {
    const newBlog = new Blog({ name, content, date });
    const savedBlog = await newBlog.save();

    return {
      id: savedBlog.id,
      name: savedBlog.name,
      content: savedBlog.content,
      date: savedBlog.date,
      images: savedBlog.images ?? [],
      tags: savedBlog.tags ?? [],
    };
  }

  async update(
    id: string,
    { name, content, date }: IBlog
  ): Promise<IBlogWithID> {
    const updatedBlog = await Blog.findByIdAndUpdate(
      { _id: id },
      { name, content, date }
    ).lean();

    if (updatedBlog == null) {
      throw new Error('Unable to update blog item');
    }

    return {
      id: updatedBlog!._id.toString(),
      name: updatedBlog?.name,
      content: updatedBlog?.content,
      date: updatedBlog?.date,
    };
  }

  async delete(id: string): Promise<boolean> {
    const deletedBlog = await Blog.findOneAndDelete({ _id: id }).lean();

    if (deletedBlog == null) throw new Error('Error deleting blog item');

    return true;
  }
}
