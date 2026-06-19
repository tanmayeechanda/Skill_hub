# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Health Check

### Check Server Status
- **Endpoint:** `GET /api/health`
- **Description:** Verify server is running
- **Response:**
```json
{
  "success": true,
  "message": "Server is running"
}
```

## Courses API

### Get All Courses
- **Endpoint:** `GET /api/courses`
- **Method:** GET
- **Description:** Retrieve all courses from database
- **Response Example:**
```json
{
  "success": true,
  "message": "Courses fetched successfully",
  "count": 2,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "title": "Advanced React Hooks",
      "students": 350,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### Add New Course
- **Endpoint:** `POST /api/courses`
- **Method:** POST
- **Content-Type:** `application/json`
- **Request Body:**
```json
{
  "title": "Advanced React Hooks",
  "students": 350
}
```
- **Response (Success):**
```json
{
  "success": true,
  "message": "Course added successfully",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "title": "Advanced React Hooks",
    "students": 350,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```
- **Validation Rules:**
  - Title: required, 3-100 characters
  - Students: required, non-negative number
- **Error Response:**
```json
{
  "success": false,
  "message": "Please provide all required fields (title, students)"
}
```

### Get Course by ID
- **Endpoint:** `GET /api/courses/:id`
- **Method:** GET
- **Path Parameters:**
  - `id` (string): Course ID from MongoDB
- **Response (Success):**
```json
{
  "success": true,
  "message": "Course fetched successfully",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "title": "Advanced React Hooks",
    "students": 350,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```
- **Error Response:**
```json
{
  "success": false,
  "message": "Course not found"
}
```

### Update Course
- **Endpoint:** `PUT /api/courses/:id`
- **Method:** PUT
- **Content-Type:** `application/json`
- **Path Parameters:**
  - `id` (string): Course ID from MongoDB
- **Request Body:**
```json
{
  "title": "Updated Course Title",
  "students": 500
}
```
- **Response (Success):**
```json
{
  "success": true,
  "message": "Course updated successfully",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "title": "Updated Course Title",
    "students": 500,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:35:00.000Z"
  }
}
```

### Delete Course
- **Endpoint:** `DELETE /api/courses/:id`
- **Method:** DELETE
- **Path Parameters:**
  - `id` (string): Course ID from MongoDB
- **Response (Success):**
```json
{
  "success": true,
  "message": "Course deleted successfully",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "title": "Advanced React Hooks",
    "students": 350,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:35:00.000Z"
  }
}
```

## Contact API

### Send Contact Message
- **Endpoint:** `POST /api/contact`
- **Method:** POST
- **Content-Type:** `application/json`
- **Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "This is a great platform for learning!"
}
```
- **Response (Success):**
```json
{
  "success": true,
  "message": "Message saved successfully. We will contact you soon!",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "This is a great platform for learning!",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```
- **Validation Rules:**
  - Name: required, 2-50 characters
  - Email: required, valid email format
  - Message: required, 5-1000 characters
- **Error Response:**
```json
{
  "success": false,
  "message": "Validation error: Name must be at least 2 characters long"
}
```

### Get All Messages
- **Endpoint:** `GET /api/contact`
- **Method:** GET
- **Description:** Retrieve all contact messages (admin only in production)
- **Response Example:**
```json
{
  "success": true,
  "message": "Messages fetched successfully",
  "count": 5,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "name": "John Doe",
      "email": "john@example.com",
      "message": "Great platform!",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### Delete Message
- **Endpoint:** `DELETE /api/contact/:id`
- **Method:** DELETE
- **Path Parameters:**
  - `id` (string): Message ID from MongoDB
- **Response (Success):**
```json
{
  "success": true,
  "message": "Message deleted successfully",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Great platform!",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

## Error Codes

| Code | Message | Solution |
|------|---------|----------|
| 400 | Bad Request | Check request format and required fields |
| 404 | Not Found | Verify the resource ID exists |
| 500 | Server Error | Check server console for details |
| 201 | Created | Success - resource created |
| 200 | OK | Success - request completed |

## Common Patterns

### Request with cURL
```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Web Development Basics",
    "students": 150
  }'
```

### Request with JavaScript/Axios
```javascript
import axios from 'axios';

const addCourse = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/courses', {
      title: 'Advanced JavaScript',
      students: 200
    });
    console.log(response.data);
  } catch (error) {
    console.error(error.response.data);
  }
};
```

### Request with Fetch API
```javascript
const addCourse = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: 'Advanced JavaScript',
        students: 200
      })
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
```

## Rate Limiting

Currently no rate limiting is implemented. For production, implement:
- Express rate limit middleware
- Redis for tracking requests
- Different limits for different endpoints

## Authentication (Future)

For production, add:
- JWT authentication
- User registration/login
- Protected routes
- Role-based access control
- Refresh token mechanism

## CORS Configuration

Currently enabled for all origins. For production:
```javascript
const corsOptions = {
  origin: 'https://yourdomain.com',
  optionsSuccessStatus: 200
};
```

## Testing with Postman

1. Import API collection
2. Set base URL: `http://localhost:5000/api`
3. Create requests for each endpoint
4. Save collection for team sharing
5. Set up environment variables

## Pagination (Future Feature)

Suggested implementation:
```bash
GET /api/courses?page=1&limit=10
GET /api/contact?page=1&limit=20
```

Response structure:
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "itemsPerPage": 10
  }
}
```

## Search & Filter (Future Feature)

Suggested implementation:
```bash
GET /api/courses?search=React
GET /api/courses?sort=popular
GET /api/courses?filter=trending
```

## API Versioning (Future)

Suggested approach:
```bash
/api/v1/courses
/api/v2/courses
```

This allows maintaining multiple API versions for backward compatibility.
