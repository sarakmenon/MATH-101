# Math-101 Tutoring Platform

A modern web application for Math-101 tutoring business built with Next.js, Firebase, and Tailwind CSS.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Hosting**: Firebase Hosting ready

## Features

### Authentication
- Email/password authentication via Firebase Auth
- Protected routes with role-based access control
- Automatic user document creation in Firestore on registration

### User Roles
- **Pending**: New users awaiting admin approval (default role)
- **Student**: Approved users with access to assigned courses
- **Admin**: Full access to dashboard and management features

### Routing Structure
- `/` - Public homepage
- `/login` - User login
- `/register` - New user registration
- `/pending` - Pending approval page
- `/dashboard` - Main dashboard (role-based access)
- `/courses/[courseId]` - Individual course pages

### Role-Based Routing Logic
The application implements intelligent routing based on user roles:

1. **Pending Users**: Redirected to `/pending` page until approved by admin
2. **Students**: Redirected to their first assigned course, or dashboard if no courses assigned
3. **Admin**: Full access to all routes including dashboard and course management

## Project Structure

```
math-101-website/
├── app/                      # Next.js App Router pages
│   ├── courses/
│   │   └── [courseId]/      # Dynamic course pages
│   ├── dashboard/           # Dashboard page
│   ├── login/               # Login page
│   ├── pending/             # Pending approval page
│   ├── register/            # Registration page
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── components/              # React components
│   └── ProtectedRoute.tsx   # Route protection wrapper
├── contexts/                # React contexts
│   └── AuthContext.tsx      # Authentication context
├── lib/                     # Utility libraries
│   └── firebase.ts          # Firebase configuration
├── types/                   # TypeScript types
│   └── index.ts             # Type definitions
├── .env.local.example       # Environment variables template
├── firebase.json            # Firebase Hosting config
├── .firebaserc              # Firebase project config
└── package.json             # Dependencies
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Firebase

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password provider)
3. Create Firestore database
4. Enable Storage (optional, for future use)
5. Copy your Firebase config

### 3. Set Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Initialize Firestore Collections

The application expects these Firestore collections:

#### `users` collection
```typescript
{
  uid: string,
  name: string,
  email: string,
  role: 'admin' | 'student' | 'pending',
  status: 'active' | 'inactive' | 'pending',
  assignedCourses: string[], // Array of course IDs
  createdAt: Date,
  updatedAt: Date
}
```

#### `courses` collection
```typescript
{
  id: string,
  name: string,
  description: string,
  createdAt: Date,
  updatedAt: Date
}
```

**Note**: User documents are automatically created on registration with 'pending' role. You'll need to manually create course documents and update user roles via Firebase Console or admin interface.

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Firebase Hosting Deployment

### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
```

### 2. Login to Firebase

```bash
firebase login
```

### 3. Initialize Firebase (if not already done)

```bash
firebase init hosting
```

Select your Firebase project and configure:
- Public directory: `out`
- Single-page app: Yes
- Automatic builds: No

### 4. Update Firebase Project ID

Edit `.firebaserc` and replace `your-project-id` with your actual Firebase project ID.

### 5. Build and Deploy

For static export (recommended for Firebase Hosting):

1. Uncomment `output: 'export'` in `next.config.js`
2. Build and deploy:

```bash
npm run build
firebase deploy --only hosting
```

For server-side rendering (requires Firebase Functions):
- Keep `output: 'export'` commented out
- Set up Firebase Functions for Next.js
- Follow [Next.js Firebase Hosting guide](https://firebase.google.com/docs/hosting/nextjs)

## Development Workflow

### Creating an Admin User

Since new users default to 'pending' role, you'll need to manually promote the first admin:

1. Register a new user through the app
2. Go to Firebase Console → Firestore
3. Find the user document in the `users` collection
4. Update the `role` field to `'admin'`
5. Update the `status` field to `'active'`

### Creating Courses

Courses must be created manually in Firestore:

1. Go to Firebase Console → Firestore
2. Create a new document in the `courses` collection
3. Add fields: `id`, `name`, `description`

### Assigning Courses to Students

1. Go to Firebase Console → Firestore
2. Find the student's document in the `users` collection
3. Update the `assignedCourses` array with course IDs
4. Update the `role` to `'student'` and `status` to `'active'`

## Future Enhancements

This application is designed to scale with additional features:

- **Payments**: Integrate Stripe or other payment processors
- **Scheduling**: Add booking system for tutoring sessions
- **AI Tutor**: Integrate AI-powered tutoring assistance
- **Admin UI**: Build comprehensive admin dashboard for user/course management
- **Real-time Chat**: Add messaging between students and tutors
- **Progress Tracking**: Implement learning analytics and progress reports

## Security Notes

- Never commit `.env.local` to version control
- Use Firebase Security Rules to protect Firestore data
- Implement proper role-based access control in Security Rules
- Keep Firebase SDK and dependencies up to date

## License

Private - Math-101 Tutoring Business

## Support

For questions or issues, contact the development team.
"# MATH-101" 
