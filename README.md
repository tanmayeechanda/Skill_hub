# SkillHub Learning Platform

A complete, production-ready MERN stack learning platform with React + Vite frontend and Node.js + Express + MongoDB backend.

## Project Structure

```
skillhub-project/
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── courseApi.js
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── CourseCard.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Courses.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── AddCourse.jsx
│   │   ├── styles/
│   │   │   ├── Navbar.css
│   │   │   ├── Sidebar.css
│   │   │   ├── Hero.css
│   │   │   ├── CourseCard.css
│   │   │   ├── Footer.css
│   │   │   ├── Home.css
│   │   │   ├── Courses.css
│   │   │   ├── Contact.css
│   │   │   └── AddCourse.css
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .env.example
│
└── backend/
    ├── config/
    │   └── db.js
    ├── controllers/
    │   ├── courseController.js
    │   └── contactController.js
    ├── models/
    │   ├── Course.js
    │   └── Contact.js
    ├── routes/
    │   ├── courseRoutes.js
    │   └── contactRoutes.js
    ├── server.js
    ├── package.json
    └── .env
```

## Tech Stack

### Frontend
- React 19 with Vite
- React Router DOM for navigation
- Axios for API calls
- React Toastify for notifications
- React Icons for UI icons
- Framer Motion for animations
- Context API for theme management
- Fully responsive CSS

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- CORS for cross-origin requests
- Dotenv for environment variables

## Features

### Frontend Features
- ✅ Modern, responsive design
- ✅ Dark mode toggle
- ✅ Search functionality
- ✅ Sort courses (by recent, popular, alphabetical)
- ✅ Add new courses with validation
- ✅ Contact form with validation
- ✅ Loading, error, and empty states
- ✅ Smooth animations with Framer Motion
- ✅ Toast notifications
- ✅ Mobile-first responsive design

### Backend Features
- ✅ RESTful API endpoints
- ✅ MongoDB integration
- ✅ Input validation and error handling
- ✅ CORS enabled
- ✅ Environment-based configuration
- ✅ Proper HTTP status codes

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/skillhub
NODE_ENV=development
```

4. Start MongoDB server (if local):
```bash
mongod
```

5. Start backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` if needed:
```
VITE_API_URL=http://localhost:5000/api
```

5. Start development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## API Endpoints

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Add new course
- `GET /api/courses/:id` - Get course by ID
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Contact
- `POST /api/contact` - Send contact message
- `GET /api/contact` - Get all messages
- `DELETE /api/contact/:id` - Delete message

## Testing API Endpoints

### Using cURL

Get all courses:
```bash
curl http://localhost:5000/api/courses
```

Add a course:
```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -d '{"title": "Advanced React", "students": 250}'
```

Send contact message:
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "message": "Great platform!"}'
```

### Using Postman
1. Import the API endpoints
2. Set request type (GET/POST/etc)
3. Add request body for POST/PUT requests
4. Send request

## Database Schemas

### Course Schema
```javascript
{
  title: String (required, 3-100 characters),
  students: Number (required, >= 0),
  createdAt: Date,
  updatedAt: Date
}
```

### Contact Schema
```javascript
{
  name: String (required, 2-50 characters),
  email: String (required, valid email),
  message: String (required, 5-1000 characters),
  createdAt: Date,
  updatedAt: Date
}
```

## Key Features Explained

### Dark Mode
- Toggle button in navbar
- Persists in localStorage
- Smooth transitions
- Entire app theme changes

### Search & Filter
- Real-time search on home page
- Sort by recent, popular, alphabetical
- Case-insensitive search

### Validation
- Frontend validation with error messages
- Backend validation with detailed responses
- Email validation
- Numeric validation for student count

### Error Handling
- Toast notifications for success/error
- Loading states
- Error states with retry button
- Empty states with helpful messages

### Responsive Design
- Mobile first approach
- Breakpoints: 480px, 768px, 1024px
- Hamburger menu on mobile
- Flexible grid layouts

## Production Build

### Frontend
```bash
cd frontend
npm run build
```

Builds to `frontend/dist` directory

### Running Production Build
```bash
npm run preview
```

## Performance Optimizations

- Code splitting with React lazy loading
- Optimized images and assets
- CSS minification
- Terser for JS minification
- Efficient re-renders with React hooks
- Memoization where needed

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is licensed under the ISC License.

## Support

For issues and questions, please create an issue on GitHub.

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify database name matches

### API Connection Error (Frontend)
- Ensure backend is running on correct port
- Check VITE_API_URL in .env
- Verify CORS is enabled on backend

### Port Already in Use
- Change port in server.js or vite.config.js
- Or kill process using the port

### npm install Issues
- Delete node_modules and package-lock.json
- Run npm install again
- Clear npm cache: `npm cache clean --force`

## Security Notes

- Add authentication for production
- Use environment variables for sensitive data
- Implement rate limiting
- Add input sanitization
- Use HTTPS in production
- Add security headers

## Future Enhancements

- User authentication and authorization
- Course ratings and reviews
- Email notifications
- Payment integration
- Admin dashboard
- Course categories and filtering
- User profiles
- Course progress tracking
