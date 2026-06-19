# SkillHub Learning Platform - Setup Guide

## Quick Start Guide

### Step 1: Install MongoDB

#### Option A: Local MongoDB Installation
- **Windows**: Download from https://www.mongodb.com/try/download/community
- **Mac**: `brew install mongodb-community`
- **Linux**: Follow: https://docs.mongodb.com/manual/installation/

#### Option B: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Copy connection string
5. Update MONGODB_URI in backend/.env

### Step 2: Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Start development server
npm run dev
```

✅ Backend will run on http://localhost:5000
✅ API health check: http://localhost:5000/api/health

### Step 3: Frontend Setup

```bash
# Navigate to frontend (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

✅ Frontend will run on http://localhost:5173
✅ Open browser automatically

## Verification

### Check Backend
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running"
}
```

### Check MongoDB Connection
```bash
curl http://localhost:5000/api/courses
```

Should return an empty courses array or existing courses.

## Testing API Endpoints

### 1. Get All Courses
```bash
curl http://localhost:5000/api/courses
```

### 2. Add a Course
```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Advanced React with Hooks",
    "students": 350
  }'
```

### 3. Send Contact Message
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "This is an amazing learning platform!"
  }'
```

### 4. Get All Messages
```bash
curl http://localhost:5000/api/contact
```

### 5. Delete a Course
```bash
curl -X DELETE http://localhost:5000/api/courses/{COURSE_ID}
```

Replace {COURSE_ID} with actual course ID from database.

## Frontend Testing

### Home Page
- Visit http://localhost:5173
- Verify hero section loads
- Search for courses
- View featured courses

### Courses Page
- Click "Courses" or "All Courses"
- Verify all courses display
- Test sorting (Recent, Popular, Alphabetical)
- Test search functionality

### Add Course Page
- Click "Add Course" button
- Fill in course title and student count
- Test form validation (empty fields, invalid numbers)
- Submit form and verify course is added

### Contact Page
- Click "Contact" link
- Fill in name, email, and message
- Test form validation
- Submit and verify success message

### Dark Mode
- Click theme toggle in navbar
- Verify entire app theme changes
- Refresh page and verify theme persists

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/skillhub
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## Project Structure Overview

### Frontend Components
- **Navbar**: Navigation with dropdown and theme toggle
- **Sidebar**: Categories and quick menu
- **Hero**: Landing section with CTA buttons
- **CourseCard**: Reusable course display card
- **Footer**: Footer with links and contact info
- **ThemeContext**: Dark mode context provider

### Frontend Pages
- **Home**: Hero section + featured courses + search
- **Courses**: All courses with advanced filtering/sorting
- **Contact**: Contact form with validation
- **AddCourse**: Form to add new courses

### Backend Controllers
- **courseController**: CRUD operations for courses
- **contactController**: Save and retrieve contact messages

### Backend Models
- **Course**: Title, students, timestamps
- **Contact**: Name, email, message, timestamps

## Common Issues & Solutions

### Issue: MongoDB Connection Failed
**Solution:**
```bash
# Make sure MongoDB is running
# Windows: Services -> MongoDB Server
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in backend/.env
```

### Issue: Port 5000 Already in Use
**Solution:**
```bash
# Change port in backend/server.js
# Change PORT env variable in .env
# Or kill process using port
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -i :5000
```

### Issue: API Endpoints Not Working
**Solution:**
```bash
# Verify backend is running
# Check port is 5000
# Verify CORS is enabled
# Check MongoDB connection
# Look at server console for errors
```

### Issue: Frontend Can't Connect to Backend
**Solution:**
```bash
# Verify VITE_API_URL in frontend/.env
# Should be http://localhost:5000/api
# Restart frontend development server
# Check that backend is running
```

### Issue: npm install Fails
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Windows (use del instead of rm)
del node_modules package-lock.json
```

## Build for Production

### Frontend Build
```bash
cd frontend
npm run build
```

Output directory: `frontend/dist`

### Deploy Frontend (using Vercel)
```bash
# Install vercel CLI
npm install -g vercel

# Deploy from frontend directory
vercel
```

### Deploy Backend (using Render or Heroku)
1. Push code to GitHub
2. Connect repository to Render/Heroku
3. Set environment variables
4. Deploy

## Security Checklist

Before going to production:
- [ ] Add user authentication
- [ ] Implement password hashing
- [ ] Add request validation
- [ ] Implement rate limiting
- [ ] Use HTTPS
- [ ] Add CSRF protection
- [ ] Sanitize user input
- [ ] Add security headers
- [ ] Use environment variables for secrets
- [ ] Add API documentation
- [ ] Implement logging
- [ ] Add error monitoring

## Performance Tips

1. **Frontend**
   - Use React.lazy for code splitting
   - Optimize images
   - Cache API responses
   - Minimize bundle size

2. **Backend**
   - Add database indexing
   - Use pagination for large datasets
   - Add caching (Redis)
   - Monitor API performance

3. **Database**
   - Create indexes on frequently queried fields
   - Use database monitoring
   - Regular backups

## Additional Resources

- React Docs: https://react.dev
- Vite Docs: https://vitejs.dev
- Express Docs: https://expressjs.com
- MongoDB Docs: https://docs.mongodb.com
- Mongoose Docs: https://mongoosejs.com
- Framer Motion: https://www.framer.com/motion/

## Getting Help

1. Check README.md for overview
2. Review error messages in console
3. Check browser console (F12)
4. Review server console output
5. Check MongoDB connection
6. Verify environment variables
7. Check API endpoints with curl

## Next Steps

After setup:
1. Explore the codebase
2. Modify styling to match your brand
3. Add more features (user auth, ratings, etc.)
4. Deploy to production
5. Monitor and optimize

Enjoy building! 🚀
