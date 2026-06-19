# SkillHub - Quick Reference Guide

## 🚀 Start Here (First Time Setup)

### 1. Prerequisites Check
```bash
# Verify Node.js installed
node --version    # Should be v14+

# Verify npm installed
npm --version     # Should be v6+
```

### 2. MongoDB Setup (Choose One)

**Option A: Local MongoDB**
```bash
# Windows
# Download from https://www.mongodb.com/try/download/community
# Install and start MongoDB service

# Mac
brew install mongodb-community
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Recommended)**
```
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update backend/.env:
   MONGODB_URI=<your-connection-string>
```

### 3. Quick Setup Commands

```bash
# Terminal 1: Backend
cd backend
npm install
npm run dev
# Runs on http://localhost:5000

# Terminal 2: Frontend (new terminal)
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

---

## 📂 Project File Locations

### Key Frontend Files
| File | Purpose |
|------|---------|
| `frontend/src/App.jsx` | Main app with routes |
| `frontend/src/pages/Home.jsx` | Home page with hero |
| `frontend/src/api/courseApi.js` | API calls |
| `frontend/src/components/Navbar.jsx` | Navigation bar |
| `frontend/src/index.css` | Global styles |
| `frontend/.env` | API configuration |

### Key Backend Files
| File | Purpose |
|------|---------|
| `backend/server.js` | Express server |
| `backend/routes/courseRoutes.js` | Course endpoints |
| `backend/controllers/courseController.js` | Course logic |
| `backend/models/Course.js` | Database schema |
| `backend/.env` | Server configuration |

---

## 🔌 API Quick Reference

### All Endpoints

```bash
# Health check
GET /api/health

# Courses
GET    /api/courses
POST   /api/courses
GET    /api/courses/:id
PUT    /api/courses/:id
DELETE /api/courses/:id

# Contact
POST   /api/contact
GET    /api/contact
DELETE /api/contact/:id
```

### Quick Test
```bash
# Test connection
curl http://localhost:5000/api/health

# Get all courses
curl http://localhost:5000/api/courses

# Add course
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -d '{"title":"React Course","students":100}'
```

---

## 💾 Database Quick Reference

### MongoDB Collections
```
Database: skillhub
├── courses
│   ├── title (String)
│   ├── students (Number)
│   ├── createdAt
│   └── updatedAt
└── contacts
    ├── name (String)
    ├── email (String)
    ├── message (String)
    ├── createdAt
    └── updatedAt
```

### View Data in MongoDB
```javascript
// Mongo Shell
use skillhub
db.courses.find()
db.contacts.find()
db.courses.deleteMany({})  // Clear all courses
```

---

## 🛠 Common Development Tasks

### Add a New Page

1. Create file: `frontend/src/pages/NewPage.jsx`
2. Add route in `App.jsx`:
```jsx
import NewPage from './pages/NewPage';
// In Routes:
<Route path="/new-page" element={<NewPage />} />
```
3. Add link in Navbar or Sidebar

### Add a New API Endpoint

1. Create controller method in `backend/controllers/`
2. Add route in `backend/routes/`
3. Call from frontend using `axios` in `frontend/src/api/courseApi.js`

### Modify Styling

- Global styles: `frontend/src/index.css`
- Component styles: `frontend/src/styles/ComponentName.css`
- Colors defined in CSS variables (`:root`)

### Enable Dark Mode
- Already built in! Use theme toggle in navbar
- Styles automatically switch
- Persists in localStorage

---

## 📱 Responsive Breakpoints

```css
/* Mobile: < 480px */
/* Tablet: 480px - 768px */
/* Desktop: 768px - 1024px */
/* Large Desktop: > 1024px */
```

Every component has media queries for all sizes.

---

## 🔐 Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/skillhub
NODE_ENV=development
```

---

## 📊 Component Hierarchy

```
App
├── Navbar
├── Router
│   ├── Home
│   │   ├── Hero
│   │   ├── Sidebar
│   │   └── CourseCard (multiple)
│   ├── Courses
│   │   ├── Sidebar
│   │   └── CourseCard (multiple)
│   ├── Contact
│   │   ├── Sidebar
│   │   └── Form
│   └── AddCourse
│       ├── Sidebar
│       └── Form
├── Footer
└── Toast Container
```

---

## 🎨 Styling Convention

### CSS Class Naming
```css
/* Block element */
.component-name {}

/* Component sub-element */
.component-name-subelement {}

/* Modifier/state */
.component-name.active {}
.component-name.error {}

/* Utility classes */
.btn {}
.btn-primary {}
.form-group {}
```

### CSS Variables
```css
:root {
  --primary-color: #6366f1;
  --bg-primary: #ffffff;
  --text-primary: #1f2937;
  --spacing-md: 1rem;
  --radius-md: 0.5rem;
}
```

---

## 🚨 Debugging Tips

### Frontend Debugging
```javascript
// Browser DevTools (F12)
// Check Console tab for errors
// Check Network tab for API calls
// Check Application tab for localStorage

// Add debug logs in components:
console.log('data:', data);

// Use React DevTools extension
// Use Network tab to inspect requests
```

### Backend Debugging
```bash
# Check server console output
# Add console.log statements
# Use MongoDB Compass to view database
# Test endpoints with curl

# Enable detailed logging:
console.log('Request received:', req.body);
```

### Common Issues Quick Fixes
```bash
# Port in use
# Solution: Change port in .env and restart

# API not found
# Solution: Check URL in VITE_API_URL

# MongoDB won't connect
# Solution: Start MongoDB service

# Styles not loading
# Solution: Hard refresh (Ctrl+Shift+R)

# Node modules issue
# Solution: rm -rf node_modules && npm install
```

---

## 📈 Performance Tips

### Frontend
- Use React DevTools Profiler
- Check Lighthouse score
- Minimize bundle size
- Use images optimally
- Cache API responses (if needed)

### Backend
- Monitor query performance
- Use database indexes
- Add pagination for large datasets
- Cache frequently accessed data
- Monitor server memory

---

## 📚 Quick Documentation Links

| Topic | Link |
|-------|------|
| React Docs | https://react.dev |
| Vite Docs | https://vitejs.dev |
| Express Docs | https://expressjs.com |
| MongoDB | https://docs.mongodb.com |
| Mongoose | https://mongoosejs.com |
| React Router | https://reactrouter.com |
| Axios | https://axios-http.com |

---

## 🔄 Workflow Example

### Adding a New Feature

1. **Plan**: Decide what you want to add
2. **Backend**: 
   - Create model if needed
   - Create controller method
   - Create route
   - Test with curl
3. **Frontend**:
   - Add API call in courseApi.js
   - Create/modify component
   - Add styling
   - Test in browser
4. **Test**:
   - Test all scenarios
   - Test mobile view
   - Test error cases
5. **Deploy**:
   - Build frontend: `npm run build`
   - Push to production

---

## ✨ Code Quality Checklist

Before committing:
- [ ] No console.log statements left
- [ ] No TODO comments
- [ ] Functions are named clearly
- [ ] Variables have meaningful names
- [ ] Code is properly indented
- [ ] No unused imports
- [ ] Error handling is present
- [ ] Responsive design works
- [ ] Dark mode works
- [ ] Forms have validation

---

## 🚀 Deployment Checklist

### Before Production
- [ ] Update MongoDB to production URI
- [ ] Set NODE_ENV=production
- [ ] Remove debug logs
- [ ] Test all features
- [ ] Run lighthouse check
- [ ] Test on multiple devices
- [ ] Test on multiple browsers
- [ ] Set up error logging
- [ ] Configure CORS properly
- [ ] Review security settings

### Deploy Commands
```bash
# Backend deployment
cd backend
npm run build  # If applicable
# Push to hosting (Render, Heroku, etc)

# Frontend deployment
cd frontend
npm run build
# Deploy dist/ folder to (Vercel, Netlify, etc)
```

---

## 📞 Quick Help

### Need to...

**... add a new route?**
→ Create route file, add controller, import in server.js

**... change colors?**
→ Edit `:root` variables in `frontend/src/index.css`

**... modify form validation?**
→ Edit validation logic in page component

**... add notifications?**
→ Use `toast.success()`, `toast.error()` from react-toastify

**... debug API calls?**
→ Check Network tab in browser DevTools

**... test endpoints?**
→ Use curl, Postman, or API testing tools

**... scale the project?**
→ Add authentication, pagination, caching, monitoring

---

## 💡 Pro Tips

1. **Version Control**: Use git
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Environment Variables**: Never commit .env
   - Already in .gitignore
   - Use .env.example for reference

3. **Database Backup**: Regular backups
   - Use MongoDB Atlas backups
   - Or export data regularly

4. **Monitoring**: Track errors
   - Use Sentry for error tracking
   - Monitor API performance
   - Track user interactions

5. **Security**: Implement in production
   - Add JWT authentication
   - Validate all inputs
   - Use HTTPS
   - Implement rate limiting

---

## 🎯 Next Level Learning

- [ ] Add user authentication
- [ ] Implement course ratings
- [ ] Add payment processing
- [ ] Create admin dashboard
- [ ] Add course categories
- [ ] Implement search filters
- [ ] Add user profiles
- [ ] Track course progress
- [ ] Add email notifications
- [ ] Implement social features

---

## 📞 Getting Help

1. Check documentation files in project
2. Review code comments
3. Check browser console for errors
4. Check server console for logs
5. Test with curl commands
6. Use browser DevTools
7. Review MongoDB data
8. Check Stack Overflow
9. Review library documentation

---

## Last Updated: January 2024

For latest updates, refer to:
- README.md - Main overview
- SETUP_GUIDE.md - Detailed setup
- API_DOCUMENTATION.md - API reference
- PROJECT_SUMMARY.md - Complete summary

Happy Coding! 🚀
