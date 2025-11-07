import { User } from '../src/server/models/user.model';
import { Post } from '../src/server/models/post.model';
import { Comment } from '../src/server/models/comment.model';
import { Like } from '../src/server/models/like.model';

async function seedDatabase() {
    // Create users
    const user1 = await User.create({ username: 'doglover1', password: 'password123' });
    const user2 = await User.create({ username: 'puppyfanatic', password: 'password456' });

    // Create posts
    const post1 = await Post.create({ userId: user1.id, content: 'Just adopted a new puppy!', imageUrl: 'puppy1.jpg' });
    const post2 = await Post.create({ userId: user2.id, content: 'Check out my dog at the park!', imageUrl: 'dogpark.jpg' });

    // Create comments
    await Comment.create({ postId: post1.id, userId: user2.id, content: 'Congrats on the new puppy!' });
    await Comment.create({ postId: post2.id, userId: user1.id, content: 'Looks like a fun day!' });

    // Create likes
    await Like.create({ postId: post1.id, userId: user2.id });
    await Like.create({ postId: post2.id, userId: user1.id });

    console.log('Database seeded successfully!');
}

seedDatabase().catch(err => {
    console.error('Error seeding database:', err);
});