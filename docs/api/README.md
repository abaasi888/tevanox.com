
---

## 📄 **API DOCS FILES**

### `tevanox.com/docs/api/README.md`

```markdown
# 🔌 API Documentation

## Base URL
https://api.tevanox.com/api/v1


## Authentication

All API requests (except auth endpoints) require a Bearer token:

Authorization: Bearer <your_token>


## Response Format

```json
{
  "success": true,
  "data": { ... },
  "message": "Success message",
  "error": null
}

Error Response

{
  "success": false,
  "data": null,
  "message": null,
  "error": "Error message here"
}

Status Codes

Code	   Description
200	       Success
201        Created
400	       Bad Request
401	       Unauthorized
403	       Forbidden
404	       Not Found
422	       Validation Error
500	       Internal Server Error

Rate Limiting
100 requests per minute per IP

1000 requests per hour per IP

Endpoints
Method	       Endpoint	                                       Description
POST	       /auth/register	                              User registration
POST	       /auth/login	                                 User login
POST	        /auth/logout	                             User logout
GET	            /auth/sessions	                             Get active sessions
GET	             /users/profile	                             Get user profile
GET	             /movies	                                 Get all movies
GET	            /movies/trending	                        Get trending movies
GET	            /series	                                     Get all series
GET	            /music	                                     Get all music
POST	       /subscriptions/activate	                 Activate subscription
GET	           /agents/dashboard	                         Agent dashboard
POST	        /admin/movies	                          Add movie (admin)
GET	            /categories	                              Get all categories
GET	            /genres	                                  Get all genres
POST	       /vjs	                                      Create VJ (admin)
POST	       /musicians	                               Create musician (admin)

Versioning
Current version: v1

Future versions will be available at /api/v2, etc.

