import { IRead, IWrite } from 'src/interfaces/repository.interface';
import { Service } from 'typedi';
import Blog, { Image } from './blogs.model';
import { IBlog } from './blogs.model';

type IBlogWithID = IBlog & { id: string };

@Service()
export class BlogsRepository
  implements IWrite<IBlogWithID>, IRead<IBlogWithID>
{
  async getAll(): Promise<IBlogWithID[]> {
    const blogs = await Blog.find({}).lean();

    if (!blogs) {
      throw new Error('Blogs not found');
    }

    return blogs.map((b) => {
      console.log(b.images);

      let images: Image[] = [];

      if (b.images) {
        images = b.images.map((img: any) => ({
          id: img._id.toString(),
          name: img.name,
          path: `${process.env.SERVER}${img.path}`,
        }));
      }

      return {
        id: b._id.toString(),
        name: b.name,
        content: b.content,
        date: b.date,
        tags: b.tags ?? [],
        images,
      };
    });
  }

  async get(_id: string): Promise<IBlogWithID> {
    return this.getBlog(_id);
  }

  async getBlogByName(name: string): Promise<IBlogWithID> {
    return this.getBlog(name, false);
  }

  private async getBlog(key: string, byKey: boolean = true) {
    let blog;

    if (byKey) blog = await Blog.findOne({ _id: key }).lean();
    else blog = await Blog.findOne({ name: key }).lean();

    if (!blog) {
      throw new Error('Blog not found');
    }

    return {
      id: blog._id.toString(),
      name: blog.name,
      content: blog.content,
      date: blog.date,
      tags: blog.tags ?? [],
      images: blog.images ?? [],
    };
  }

  async create({ name, content, date }: IBlog): Promise<IBlogWithID> {
    const newBlog = new Blog({
      name,
      content,
      date,
    });
    const savedBlog = await newBlog.save();

    if (savedBlog == null) {
      throw new Error('Error adding new blog item');
    }

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
    const blog = await Blog.findByIdAndUpdate(
      { _id: id },
      { name, content, date }
    ).lean();

    if (blog == null) {
      throw new Error('Unable to update blog item');
    }

    const updatedBlog = await Blog.findByIdAndUpdate({ _id: id }).lean();

    return {
      id: updatedBlog!._id.toString(),
      name: updatedBlog!.name,
      content: updatedBlog!.content,
      date: updatedBlog!.date,
    };
  }

  async delete(id: string): Promise<boolean> {
    const deletedBlog = await Blog.findOneAndDelete({ _id: id }).lean();

    if (deletedBlog == null) throw new Error('Error deleting blog item');

    return true;
  }

  async addBlogImage(id: string, imageDetails: Image): Promise<boolean> {
    const updatedBlogImages = await Blog.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $addToSet: {
          images: imageDetails,
        },
      }
    );

    if (updatedBlogImages == null)
      throw new Error('Error adding images to blog item');

    return true;
  }
}
