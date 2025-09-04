# Resume Builder - Full Stack Application

A modern, full-stack resume builder application with authentication, MongoDB integration, and beautiful UI.

## Features

- 🔐 **Complete Authentication System**
  - Email/Password registration and login
  - OAuth integration (Google, GitHub, Twitter)
  - JWT-based authentication
  - Protected routes

- 👤 **Comprehensive User Management**
  - User profiles with bio, profile pictures
  - Social media integration
  - User preferences and settings
  - Role-based access control

- 🎨 **Beautiful UI/UX**
  - Material-UI components
  - Multiple theme options
  - Responsive design
  - Custom styled components

- 📊 **Resume Management**
  - Create and manage multiple resumes
  - Template system (ready for implementation)
  - Export functionality (ready for implementation)

## Tech Stack

### Frontend
- React 19
- Material-UI v7
- Styled Components
- React Router v7
- Axios for API calls
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Passport.js for OAuth
- Bcrypt for password hashing
- Express Validator

## Project Structure

```
resume-builder/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts (Auth, Theme)
│   │   ├── pages/          # Page components
│   │   ├── config/         # Configuration files
│   │   └── ...
│   └── package.json
├── server/                 # Node.js backend
│   ├── config/            # Database and Passport config
│   ├── middleware/        # Custom middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   └── server.js         # Main server file
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd resume-builder
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp env.example .env

# Edit .env file with your configuration
# Required variables:
# - MONGODB_URI
# - JWT_SECRET
# - OAuth credentials (optional)
```

### 3. Frontend Setup

```bash
# Navigate to client directory (from project root)
cd client

# Install dependencies
npm install

# Create environment file (optional)
# Add REACT_APP_API_URL=http://localhost:5000 if backend runs on different port
```

### 4. Environment Configuration

Create a `.env` file in the `server` directory with the following variables:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/resume-builder
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/resume-builder

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
JWT_EXPIRE=7d

# Server Configuration
PORT=5000
NODE_ENV=development

# OAuth Configuration (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
TWITTER_CONSUMER_KEY=your-twitter-consumer-key
TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret

# Session Configuration
SESSION_SECRET=your-session-secret-key-here

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:3000
```

### 5. Running the Application

#### Start the Backend Server
```bash
cd server
npm run dev  # Development mode with nodemon
# or
npm start    # Production mode
```

#### Start the Frontend
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `GET /api/auth/logout` - Logout user
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/preferences` - Update user preferences

### OAuth
- `GET /api/auth/google` - Google OAuth
- `GET /api/auth/github` - GitHub OAuth
- `GET /api/auth/twitter` - Twitter OAuth

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/:id/resumes` - Get user's resumes
- `POST /api/users/:id/resumes` - Add resume to user

## User Model

The User model includes comprehensive fields:

```javascript
{
  username: String,
  email: String,
  password: String (hashed),
  bio: String,
  profilePic: String,
  role: String (user/admin/premium),
  google: Object (OAuth data),
  github: Object (OAuth data),
  twitter: Object (OAuth data),
  resumes: Array,
  preferences: Object,
  subscription: Object,
  activity: Object
}
```

## OAuth Setup (Optional)

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:5000/api/auth/google/callback`

### GitHub OAuth
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create new OAuth App
3. Set Authorization callback URL: `http://localhost:5000/api/auth/github/callback`

### Twitter OAuth
1. Go to [Twitter Developer Portal](https://developer.twitter.com/)
2. Create a new app
3. Set callback URL: `http://localhost:5000/api/auth/twitter/callback`

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting
- CORS configuration
- Input validation
- Helmet.js for security headers
- Session management

## Development

### Adding New Features
1. Create new routes in `server/routes/`
2. Add corresponding models in `server/models/`
3. Update frontend components in `client/src/`
4. Test API endpoints

### Database
- Uses MongoDB with Mongoose ODM
- Comprehensive user model with social integration
- Resume management system ready for implementation

## Production Deployment

1. Set `NODE_ENV=production`
2. Use MongoDB Atlas for database
3. Set up proper environment variables
4. Use PM2 or similar for process management
5. Set up reverse proxy (nginx)
6. Enable HTTPS

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support, email support@resumate.com or create an issue in the repository.
