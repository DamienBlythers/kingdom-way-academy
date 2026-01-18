# 🔐 Step 5: Set Admin Role in Clerk

## What This Does
Sets your user account as an **admin** so you can access the admin dashboard at `/admin` to create courses.

## Where to Do This
In the **Clerk Dashboard**: https://dashboard.clerk.com

---

## Instructions (5 minutes)

### 1. Sign up in your app first
```bash
npm run dev
```
- Go to http://localhost:3000
- Click "Sign Up"
- Create your account
- You'll be redirected to `/dashboard` (as a learner by default)

---

### 2. Go to Clerk Dashboard
- Open https://dashboard.clerk.com
- Select your "Kingdom Way Academy" application

---

### 3. Find your user
- In the left sidebar, click **"Users"**
- Find your email in the list
- Click on your user to open the user details

---

### 4. Set the admin role

#### Option A: Using Public Metadata (Recommended)
1. Scroll down to **"Public metadata"** section
2. Click **"Edit"**
3. Add this JSON:
```json
{
  "role": "admin"
}
```
4. Click **"Save"**

#### Option B: Using the Metadata Editor
1. Click on the **"Metadata"** tab
2. Under **"Public Metadata"**, click **"Edit JSON"**
3. Paste:
```json
{
  "role": "admin"
}
```
4. Click **"Save changes"**

---

### 5. Verify it worked

#### Test 1: Check your session
1. Sign out and sign back in to your app
2. Open browser dev tools (F12)
3. In Console, type:
```javascript
fetch('/api/auth/session').then(r => r.json()).then(console.log)
```
4. You should see `role: "admin"` and `isAdmin: true`

#### Test 2: Access admin dashboard
1. Go to http://localhost:3000/admin
2. You should see the Admin Dashboard with course management
3. Click "Create Course" to test

---

## What if I don't see the role?

### Clear your Clerk session:
```javascript
// In browser console:
localStorage.clear()
sessionStorage.clear()
// Then refresh the page
```

### Or sign out and sign in again:
- Go to http://localhost:3000
- Click your profile
- Click "Sign Out"
- Sign back in

---

## Troubleshooting

### "Access Denied" or "Unauthorized"
- **Check**: Did you save the metadata in Clerk dashboard?
- **Check**: Did you sign out and sign back in after setting the role?
- **Check**: Is your `CLERK_SECRET_KEY` in `.env.local` correct?

### "Cannot read property 'role' of undefined"
- **Fix**: Make sure the JSON is exactly `{ "role": "admin" }` with quotes
- **Fix**: Clear your browser cache and cookies
- **Fix**: Sign out and sign back in

### Still not working?
1. Check the terminal where `npm run dev` is running for errors
2. Check browser console (F12) for errors
3. Verify `.env.local` has the correct `CLERK_SECRET_KEY`

---

## What Happens After This?

Once you have admin role:
- ✅ You can access `/admin` dashboard
- ✅ You can create courses, chapters, and lessons
- ✅ You can manage Kingdom Labs
- ✅ You can view student progress and submissions

Without admin role (default learner):
- ✅ You can access `/dashboard` (student view)
- ✅ You can browse courses at `/browse`
- ✅ You can enroll in courses
- ✅ You can complete lessons and labs

---

## Next Steps

After setting admin role:
1. ✅ Create your first course at `/admin/courses`
2. ✅ Add chapters and lessons
3. ✅ Add Kingdom Labs with grading
4. ✅ Publish the course
5. ✅ Test as a student by creating a second account

---

## Quick Reference

### Clerk Dashboard URL
https://dashboard.clerk.com

### Admin Metadata JSON
```json
{
  "role": "admin"
}
```

### Test URLs
- Admin: http://localhost:3000/admin
- Dashboard: http://localhost:3000/dashboard
- Browse: http://localhost:3000/browse

---

## Still Stuck?

If you're still having issues:
1. Share the error message from your terminal
2. Share the error from browser console (F12)
3. Share a screenshot of your Clerk user metadata

I'll help you debug! 🚀
