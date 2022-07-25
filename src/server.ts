import 'reflect-metadata';
import 'dotenv/config';
import express, { Application } from 'express';
import { Container } from 'typedi';
import { useContainer, useExpressServer } from 'routing-controllers';
import { BlogsController } from './modules/blogs/blogs.controller';
import { HomeController } from './modules/home/home.controller';
import mongoose from 'mongoose';

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/test');
  } catch (error) {
    console.log('Error connecting');
  }

  useContainer(Container);

  const app: Application = express();
  app.use(express.json());

  const server = useExpressServer(app, {
    routePrefix: '/',
    controllers: [HomeController, BlogsController],
  });

  const PORT = process.env.PORT || '3000';
  server.listen(PORT, () => {
    console.log(`Server starting on port ${PORT}`);
  });
})();
