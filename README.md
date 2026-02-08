# Job Portal

A modern, full-stack job portal application built with the MERN stack (MongoDB, Express.js, React, Node.js), integrated with Clerk for authentication and Sentry for error tracking.

## 🌟 Features

### Job Seeker Features
- **User Authentication**: Secure login and registration using Clerk
- **Browse Jobs**: Search and filter through available job listings
- **Apply for Jobs**: Submit job applications with a single click
- **View Applications**: Track the status of submitted job applications
- **Profile Management**: Manage user profile and preferences

### Recruiter Features
- **Post Jobs**: Create and publish new job listings
- **Manage Jobs**: Edit, update, and delete job postings
- **View Applications**: Review all applications received for posted jobs
- **Application Management**: Manage and respond to job applications
- **Dashboard**: Get insights into job postings and applications

### General Features
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Error Tracking**: Integrated Sentry for real-time error monitoring
- **Toast Notifications**: Real-time user feedback for actions
- **Rich Text Editor**: Quill editor for job descriptions and content
- **Date/Time Formatting**: Moment.js for better date handling

## 🛠️ Tech Stack

### Client (Frontend)
- **React 19** - UI library
- **Vite** - Build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Clerk** - Authentication provider
- **Quill** - Rich text editor
- **React Toastify** - Toast notifications
- **Moment.js** - Date/time manipulation
- **ESLint** - Code linting

### Server (Backend)
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Clerk API** - User management via webhooks
- **Sentry** - Error tracking and monitoring
- **Bcrypt** - Password hashing
- **JWT** - Authentication tokens
- **Cloudinary** - Image/file storage
- **Multer** - File upload handling
- **Svix** - Webhook management
- **Cors** - Cross-origin resource sharing

## 📁 Project Structure

```
Job-Portal/
├── client/                          # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/              # Reusable React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── JobCard.jsx
│   │   │   ├── JobListing.jsx
│   │   │   ├── RecruiterLogin.jsx
│   │   │   ├── AppDownload.jsx
│   │   │   ├── Loading.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/                   # Page components
│   │   │   ├── Home.jsx             # Landing page
│   │   │   ├── AddJob.jsx           # Add new job listing
│   │   │   ├── ManageJobs.jsx       # Manage existing jobs
│   │   │   ├── Applyjob.jsx         # Apply for job
│   │   │   ├── Applications.jsx     # View applications
│   │   │   ├── ViewApplication.jsx  # View single application
│   │   │   └── Dashboard.jsx        # User dashboard
│   │   ├── context/                 # React context for state
│   │   │   └── AppContext.jsx
│   │   ├── assets/                  # Static assets
│   │   ├── App.jsx                  # Main app component
│   │   └── main.jsx                 # Entry point
│   ├── package.json                 # Client dependencies
│   ├── vite.config.js               # Vite configuration
│   └── eslint.config.js             # ESLint configuration
│
├── server/                          # Backend (Express + MongoDB)
│   ├── controllers/                 # Route controllers
│   │   └── webhooks.js              # Clerk webhook handlers
│   ├── models/                      # Database models
│   │   └── User.js                  # User model
│   ├── routes/                      # API routes
│   ├── middlewares/                 # Custom middlewares
│   ├── config/                      # Configuration files
│   │   ├── db.js                    # Database connection
│   │   └── instrument.js            # Sentry initialization
│   ├── utils/                       # Utility functions
│   ├── server.js                    # Server entry point
│   ├── package.json                 # Server dependencies
│   └── vercel.json                  # Vercel deployment config
│
└── README.md                        # This file
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18+)
- **npm** or **yarn**
- **MongoDB** (local or Atlas account)
- **Git**

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/MdTohidReza/Job-Portal.git
cd Job-Portal
```

### 2. Backend Setup (Server)

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
echo > .env
```

**Configure `.env` file:**
```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Clerk Webhook
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

# Sentry
SENTRY_DSN=your_sentry_dsn

# Server
PORT=5000
NODE_ENV=development

# Cloudinary (for file storage)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 3. Frontend Setup (Client)

```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install

# Create .env file
touch .env.local
```

**Configure `.env.local` file:**
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:5000
```

## 🚀 Running the Project

### Development Mode

**Terminal 1 - Start Backend Server:**
```bash
cd server
npm run server
```
The server will run on `http://localhost:5000`

**Terminal 2 - Start Frontend Application:**
```bash
cd client
npm run dev
```
The application will run on `http://localhost:5173`

### Production Build

**Build Frontend:**
```bash
cd client
npm run build
npm run preview
```

**Build Backend:**
```bash
cd server
npm start
```

## 🧪 Code Quality

### Linting

```bash
cd client
npm run lint              # Run ESLint
```

## 🔐 Authentication & Security

- **Clerk Authentication**: Secure user authentication with Clerk
- **JWT Tokens**: Secure API authentication using JSON Web Tokens
- **Password Hashing**: Bcrypt for secure password storage
- **Webhook Verification**: Clerk webhooks for real-time user sync
- **CORS Protection**: Configured CORS for secure cross-origin requests

## 📊 Error Tracking

- **Sentry Integration**: Real-time error monitoring and tracking
- **Production Monitoring**: Track errors in production environment
- **Error Reports**: Detailed error reports with stack traces

## 🔗 API Endpoints

The server provides the following main endpoints:

- `GET /` - API health check
- `POST /webhooks` - Clerk webhook endpoint for user events
- `GET /debug-sentry` - Sentry debug endpoint (development only)

*Additional endpoints for jobs, applications, and users are being developed.*

## 📱 Pages & Components Flow

```
Home (Landing Page)
├── Hero Section
├── Job Listings
└── Footer

Dashboard (Logged-in Users)
├── Add Job (Recruiters)
├── Manage Jobs (Recruiters)
├── Apply Job (Job Seekers)
├── Applications (Both)
└── View Application (Both)
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the ISC License.

## 👨‍💻 Author

**Md Tohid Reza**

## 📧 Contact & Support

For support, please reach out through:
- GitHub Issues: [GitHub Repository](https://github.com/MdTohidReza/Job-Portal/issues)
- Email: [Your Email Here]

## 🔗 Useful Links

- [Clerk Documentation](https://clerk.com/docs)
- [Sentry Documentation](https://sentry.io/welcome)
- [MongoDB Documentation](https://docs.mongodb.com)
- [React Documentation](https://react.dev)
- [Express.js Documentation](https://expressjs.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)

---

**Happy Coding! 🎉**
