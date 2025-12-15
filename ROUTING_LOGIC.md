# Role-Based Routing Logic

This document explains how the Math-101 platform handles routing based on user roles.

---

## Overview

The application uses the `ProtectedRoute` component to enforce authentication and authorization. This component wraps all protected pages and automatically redirects users based on their role.

---

## User Roles

### 1. **Pending** (`role: 'pending'`)
- **Default role** for newly registered users
- **Status**: `pending`
- **Access**: Only `/pending` page
- **Behavior**: Cannot access any other protected routes until approved by admin

### 2. **Student** (`role: 'student'`)
- **Status**: `active`
- **Access**: Assigned courses and dashboard
- **Behavior**: 
  - Automatically redirected to first assigned course
  - Can navigate between assigned courses
  - Can access dashboard to view all courses

### 3. **Admin** (`role: 'admin'`)
- **Status**: `active`
- **Access**: Full access to all routes
- **Behavior**: 
  - Can access dashboard with admin panel
  - Can view all courses
  - Can manage users and courses (via Firestore Console for now)

---

## Routing Flow

### Public Routes (No Authentication Required)
```
/ (homepage)
/login
/register
```

### Protected Routes (Authentication Required)
```
/pending       → Pending users only
/dashboard     → Students and Admins
/courses/[id]  → Students (if assigned) and Admins
```

---

## Authentication Flow

```
┌─────────────────┐
│  User visits    │
│  protected page │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Authenticated?  │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
   No        Yes
    │         │
    ▼         ▼
┌────────┐  ┌──────────────┐
│ Redirect│  │ Check role   │
│ /login  │  │ and redirect │
└────────┘  └──────┬───────┘
                   │
         ┌─────────┼─────────┐
         │         │         │
      Pending   Student    Admin
         │         │         │
         ▼         ▼         ▼
    ┌────────┐ ┌────────┐ ┌────────┐
    │/pending│ │/courses│ │/dashboard│
    └────────┘ └────────┘ └────────┘
```

---

## Role-Based Redirect Logic

### Implementation in `ProtectedRoute.tsx`

```typescript
switch (userData.role) {
  case 'pending':
    // Pending users can only access /pending
    if (pathname !== '/pending') {
      router.push('/pending');
    }
    break;

  case 'student':
    // Students redirected to first assigned course
    if (userData.assignedCourses.length > 0) {
      const isOnCoursePage = pathname.startsWith('/courses/');
      const isOnDashboard = pathname === '/dashboard';
      
      if (!isOnCoursePage && !isOnDashboard) {
        router.push(`/courses/${userData.assignedCourses[0]}`);
      }
    } else {
      // No courses assigned → dashboard
      if (pathname !== '/dashboard') {
        router.push('/dashboard');
      }
    }
    break;

  case 'admin':
    // Admins have full access, no restrictions
    break;
}
```

---

## User Journey Examples

### Example 1: New User Registration

1. User visits `/register`
2. Fills out form and submits
3. Firebase creates authentication account
4. Firestore document created with:
   ```json
   {
     "uid": "abc123",
     "name": "John Doe",
     "email": "john@example.com",
     "role": "pending",
     "status": "pending",
     "assignedCourses": []
   }
   ```
5. User redirected to `/pending`
6. Sees "Account Pending" message
7. Cannot access other routes until admin approves

### Example 2: Admin Approves Student

1. Admin logs into Firebase Console
2. Opens Firestore → `users` collection
3. Finds John's document
4. Updates fields:
   ```json
   {
     "role": "student",
     "status": "active",
     "assignedCourses": ["algebra-101", "geometry-101"]
   }
   ```
5. John refreshes the app
6. `ProtectedRoute` detects role change
7. John is redirected to `/courses/algebra-101` (first assigned course)
8. John can now navigate to dashboard and view both courses

### Example 3: Student Login

1. Student visits `/login`
2. Enters credentials and submits
3. Firebase authenticates user
4. `AuthContext` fetches user data from Firestore
5. User redirected to `/dashboard`
6. `ProtectedRoute` checks role = "student"
7. Student automatically redirected to `/courses/algebra-101`
8. Can navigate freely between assigned courses

### Example 4: Admin Access

1. Admin visits `/login`
2. Enters credentials and submits
3. Firebase authenticates user
4. `AuthContext` fetches user data
5. User redirected to `/dashboard`
6. `ProtectedRoute` checks role = "admin"
7. No further redirects - admin stays on dashboard
8. Admin can access any route in the application

---

## Access Control Matrix

| Route              | Pending | Student | Admin |
|--------------------|---------|---------|-------|
| `/`                | ✅      | ✅      | ✅    |
| `/login`           | ✅      | ✅      | ✅    |
| `/register`        | ✅      | ✅      | ✅    |
| `/pending`         | ✅      | ❌      | ❌    |
| `/dashboard`       | ❌      | ✅      | ✅    |
| `/courses/[id]`    | ❌      | ✅*     | ✅    |

*Students can only access courses they are assigned to

---

## Course Access Control

### Student Access
Students can only view courses in their `assignedCourses` array:

```typescript
// In course page
const hasAccess = 
  userData?.role === 'admin' || 
  userData?.assignedCourses.includes(courseId);

if (!hasAccess) {
  // Show "Access Denied" message
}
```

### Admin Access
Admins can view all courses without restrictions.

---

## Firestore Security Rules

The routing logic is enforced on the client side, but **must also be enforced** in Firestore security rules:

```javascript
// Students can only read courses they are assigned to
match /courses/{courseId} {
  allow read: if isAuthenticated() 
              && (isAdmin() || courseId in getUserData().assignedCourses);
}
```

This ensures security even if someone bypasses the client-side routing.

---

## Future Enhancements

Potential improvements to the routing system:

1. **Email Verification**: Require email verification before granting access
2. **Multi-role Support**: Allow users to have multiple roles
3. **Course Permissions**: Fine-grained permissions per course (view, edit, etc.)
4. **Session Management**: Handle expired sessions gracefully
5. **Deep Linking**: Remember intended destination after login
6. **Role Hierarchy**: Implement role inheritance (e.g., admin inherits student permissions)

---

## Debugging Tips

### User stuck on pending page
- Check Firestore: Is `role` still "pending"?
- Check Firestore: Is `status` set to "active"?
- Have user refresh the page after role update

### Student can't access course
- Check Firestore: Is course ID in `assignedCourses` array?
- Check spelling: Course IDs are case-sensitive
- Check Firestore: Does the course document exist?

### Redirect loop
- Check `ProtectedRoute.tsx` logic
- Ensure role is one of: 'pending', 'student', 'admin'
- Check browser console for errors

### Admin redirected unexpectedly
- Verify role is exactly "admin" (not "Admin" or "administrator")
- Check Firestore document structure
- Clear browser cache and cookies

---

## Testing Checklist

- [ ] Pending user can only access `/pending`
- [ ] Pending user redirected from dashboard
- [ ] Student redirected to first assigned course
- [ ] Student can access all assigned courses
- [ ] Student cannot access unassigned courses
- [ ] Admin can access all routes
- [ ] Admin can view all courses
- [ ] Unauthenticated users redirected to login
- [ ] Login redirects to appropriate page based on role
- [ ] Role changes take effect after page refresh

---

This routing logic ensures a secure, role-appropriate experience for all users of the Math-101 platform.
