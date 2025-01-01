import type { Route } from '../infrastructure/controllers/base.controller';
import { CONTROLLER_BINDINGS } from '../keys';

export const routingConfig: Route[] = [
  {
    name: 'GetAllPosts',
    methods: ['get'],
    path: '/posts',
    serviceName: CONTROLLER_BINDINGS.GetAllPostsController,
  },
  {
    name: 'GetPost',
    methods: ['get'],
    path: '/posts/:id',
    serviceName: CONTROLLER_BINDINGS.GetPostController,
  },
  {
    name: 'CreatePostUseCase',
    methods: ['post'],
    path: '/posts',
    serviceName: CONTROLLER_BINDINGS.CreatePostController,
  },
];
