import express from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import testRouter from './testRouter';
import authRouter from './authRouter'
import userRouter from './userRouter';
import categoryRouter from './categoryRouter';
import blogRouter from './blogRouter';
import imageRouter from './imageRouter'
import subRouter from './mailChimpRouter'
import commentRouter from './commentRouter'
const options= {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'A simple Express Library API',
    },
    servers: [
      {
        url: 'http://localhost:8000/v1',
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/routes/*.js'],
};


const api = express.Router();

const specs = swaggerJsDoc(options);
api.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
api.use('/test', testRouter);
api.use('/auth', authRouter);
api.use('/user', userRouter);
api.use('/category', categoryRouter);
api.use('/blog', blogRouter);
api.use('/image', imageRouter);
api.use('/subscribe-news', subRouter);
api.use('/comment', commentRouter);


export default api;
