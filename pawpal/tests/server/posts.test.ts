import request from 'supertest';
import app from '../../src/server/index';
import { Post } from '../../src/server/models/post.model';

describe('Posts API', () => {
  let postId;

  beforeAll(async () => {
    await Post.deleteMany({});
  });

  it('should create a new post', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({
        title: 'My Dog is Awesome!',
        content: 'Check out my dog playing in the park!',
        imageUrl: 'http://example.com/dog.jpg',
        userId: '12345'
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('post');
    postId = res.body.post._id;
  });

  it('should fetch all posts', async () => {
    const res = await request(app).get('/api/posts');
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('posts');
    expect(res.body.posts.length).toBeGreaterThan(0);
  });

  it('should fetch a single post by ID', async () => {
    const res = await request(app).get(`/api/posts/${postId}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('post');
    expect(res.body.post._id).toEqual(postId);
  });

  it('should delete a post', async () => {
    const res = await request(app).delete(`/api/posts/${postId}`);
    
    expect(res.statusCode).toEqual(204);
  });

  afterAll(async () => {
    await Post.deleteMany({});
  });
});