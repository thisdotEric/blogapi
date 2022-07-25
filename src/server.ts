import 'reflect-metadata';
import { useContainer, createExpressServer } from 'routing-controllers';
import { BlogsController } from './modules/blogs/blogs.controller';
import { Container } from 'typedi';

useContainer(Container);

const app = createExpressServer({
  routePrefix: '/',
  controllers: [BlogsController],
});

app.listen('3000', () => {
  console.log('Server starting on port 3000');
});
