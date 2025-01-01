export const routingConfig = [
  {
    method: 'get',
    path: '/posts',
    serviceName: 'GetAllPosts',
  },
  {
    method: 'get',
    path: '/posts/:id',
    serviceName: 'GetPost',
  },
  {
    method: 'post',
    path: '/posts',
    serviceName: 'CreatePost',
  },
];
