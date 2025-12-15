# Math-101 Setup Guide

## Quick Start Guide

Follow these steps to get your Math-101 tutoring platform up and running.

---

## Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 14
- React 18
- Firebase SDK
- Tailwind CSS
- TypeScript

---

## Step 2: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `math-101-tutoring` (or your preferred name)
4. Disable Google Analytics (optional)
5. Click "Create project"

---

## Step 3: Enable Firebase Authentication

1. In Firebase Console, go to **Build** → **Authentication**
2. Click "Get started"
3. Click on **Email/Password** provider
4. Enable **Email/Password**
5. Click "Save"

---

## Step 4: Create Firestore Database

1. In Firebase Console, go to **Build** → **Firestore Database**
2. Click "Create database"
3. Select **Start in test mode** (we'll add security rules later)
4. Choose a location (select closest to your users)
5. Click "Enable"

---

## Step 5: Enable Firebase Storage (Optional)

1. In Firebase Console, go to **Build** → **Storage**
2. Click "Get started"
3. Start in **test mode**
4. Click "Done"

---

## Step 6: Get Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps"
3. Click the **Web** icon (`</>`)
4. Register app with nickname: "Math-101 Web App"
5. Copy the Firebase configuration object

---

## Step 7: Configure Environment Variables

1. Copy the example file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` and paste your Firebase config:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
   ```

---

## Step 8: Deploy Firestore Security Rules

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project:
   ```bash
   firebase init
   ```
   - Select **Firestore** and **Hosting**
   - Choose your existing project
   - Accept default Firestore rules file: `firestore.rules`
   - Accept default Firestore indexes file: `firestore.indexes.json`
   - Set public directory to: `out`
   - Configure as single-page app: **Yes**
   - Don't overwrite existing files

4. Deploy security rules:
   ```bash
   firebase deploy --only firestore:rules
   firebase deploy --only storage:rules
   ```

---

## Step 9: Create Sample Course Data

1. Go to Firebase Console → **Firestore Database**
2. Click "Start collection"
3. Collection ID: `courses`
4. Add first document:
   - Document ID: `algebra-101`
   - Fields:
     ```
     id: "algebra-101"
     name: "Algebra 101"
     description: "Introduction to Algebra - Learn the fundamentals"
     createdAt: [timestamp]
     ```
5. Click "Save"

Repeat for additional courses:
- `geometry-101`: "Geometry 101"
- `calculus-101`: "Calculus 101"

---

## Step 10: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Step 11: Create Your First Admin User

1. Go to `http://localhost:3000/register`
2. Register with your email and password
3. You'll be redirected to the "Pending" page
4. Go to Firebase Console → **Firestore Database**
5. Find your user in the `users` collection
6. Edit the document:
   - Change `role` from `"pending"` to `"admin"`
   - Change `status` from `"pending"` to `"active"`
7. Refresh the app - you should now have admin access!

---

## Step 12: Test the Application

### Test Admin Access
1. Login with your admin account
2. You should see the admin dashboard
3. Navigate to different routes - all should be accessible

### Test Student Registration
1. Sign out
2. Register a new user (use a different email)
3. You'll see the "Pending" page
4. As admin, go to Firestore and update the new user:
   - Set `role` to `"student"`
   - Set `status` to `"active"`
   - Add `assignedCourses`: `["algebra-101"]`
5. Have the student refresh - they should be redirected to the course page

---

## Deployment to Firebase Hosting

### Option 1: Static Export (Recommended)

1. Edit `next.config.js` and uncomment:
   ```javascript
   output: 'export',
   ```

2. Update `.firebaserc` with your project ID:
   ```json
   {
     "projects": {
       "default": "your-project-id"
     }
   }
   ```

3. Build and deploy:
   ```bash
   npm run build
   firebase deploy --only hosting
   ```

4. Your app will be live at: `https://your-project-id.web.app`

### Option 2: Server-Side Rendering

For SSR, you'll need to set up Firebase Functions. Follow the [Next.js on Firebase guide](https://firebase.google.com/docs/hosting/nextjs).

---

## Troubleshooting

### "Firebase not initialized" error
- Check that `.env.local` exists and has correct values
- Restart the dev server after creating `.env.local`

### "Permission denied" errors
- Deploy Firestore security rules: `firebase deploy --only firestore:rules`
- Check that user role is set correctly in Firestore

### TypeScript errors
- Run `npm install` to ensure all dependencies are installed
- Restart your IDE/editor

### Build errors
- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

---

## Next Steps

Now that your platform is running:

1. **Customize branding**: Update colors, logo, and text in components
2. **Add more courses**: Create course documents in Firestore
3. **Invite students**: Share registration link and approve users
4. **Plan features**: Consider payment integration, scheduling, or AI tutoring

---

## Support

For issues or questions:
- Check the main `README.md` for detailed documentation
- Review Firebase Console for data and authentication issues
- Check browser console for client-side errors
- Review terminal output for server-side errors

---

## Security Checklist

Before going to production:

- [ ] Deploy Firestore security rules
- [ ] Deploy Storage security rules
- [ ] Enable Firebase App Check
- [ ] Set up proper user roles and permissions
- [ ] Use environment variables for all sensitive data
- [ ] Enable Firebase Authentication email verification (optional)
- [ ] Set up backup strategy for Firestore data
- [ ] Configure custom domain in Firebase Hosting
- [ ] Enable HTTPS (automatic with Firebase Hosting)

---

**Congratulations! Your Math-101 platform is ready to use! 🎉**
