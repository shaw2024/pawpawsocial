# PawPal — dog lovers social app

This repository contains a full-stack prototype for PawPal: a small social platform for dog lovers. It includes a TypeScript/Express backend and a React frontend (Vite + Tailwind). Features implemented in this workspace:

- User signup/login with bcrypt + JWT (httpOnly cookie)
- Posting text + images (Cloudinary upload)
- Likes and comments on posts
- Timeline feed with server-side pagination
- Tailwind-based UI (Vite dev server configured)

Quick setup (local):

1. Copy environment variables (create a `.env` at project root or in `pawpal`):

```
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
PORT=5000
```

2. Install dependencies in `pawpal`:

```bash
cd pawpal
npm install
```

3. Start the Vite client (dev):

```bash
npm run client
```

4. Start the server (in another terminal):

```bash
npm start
```

Notes:
- This is a prototype. Production readiness (Redis caching, JWT refresh tokens, rate limiting, tests, CI/CD) is still TODO.
- If the editor flags `@tailwind` rules, run the Vite dev server to process Tailwind, or install Tailwind IntelliSense in your editor.

Want me to continue? I can:
- add tests (Jest + supertest) for API endpoints
- add Redis caching for the timeline
- implement JWT refresh tokens and rate limiting
- set up GitHub Actions and a deployment workflow
# PawPal - A Social Platform for Dog Lovers

Welcome to PawPal, a social platform dedicated to dog lovers! This application allows users to create accounts, post updates and pictures, and interact with each other through likes and comments. Join our community and share your love for dogs!

## Features

- **User Account Creation**: Sign up and create your profile to start sharing your dog stories.
- **Posting Updates and Pictures**: Share your thoughts and photos with the community.
- **Interaction through Likes and Comments**: Engage with posts by liking and commenting.
- **Shared Timeline**: View a timeline of posts from all users.
- **Mobile-Friendly Design**: Enjoy a seamless experience on mobile devices.
- **Hero Section**: A welcoming hero section featuring two dog paws and a tagline inviting users to join the community.

## Getting Started

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd pawpal
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Application**:
   - Start the server:
     ```bash
     npm run server
     ```
   - Start the client:
     ```bash
     npm run client
     ```

4. **Open in Browser**:
   Visit `http://localhost:3000` to view the application.

## Contributing

We welcome contributions! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

For any inquiries, please reach out to the project maintainers.