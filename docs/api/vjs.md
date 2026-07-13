
### `tevanox.com/docs/api/vjs.md`

```markdown
# 🎤 VJs API

## Get All VJs

### Endpoint

GET /vjs



### Headers
Authorization: Bearer <your_token>


### Query Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| language | string | Filter by language (luganda, swahili) |
| is_active | boolean | Filter by active status |

### Response
```json
{
  "success": true,
  "data": [
    {
      "id": "vj_123",
      "name": "VJ Junior",
      "code": "VJ_JUNIOR",
      "language": "luganda",
      "description": "VJ Junior translates action and comedy movies",
      "is_active": true,
      "is_deletable": true,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
Create VJ
Endpoint

POST /vjs
Headers
text
Authorization: Bearer <your_token>
Request Body
json
{
  "name": "VJ Junior",
  "code": "VJ_JUNIOR",
  "language": "luganda",
  "description": "VJ Junior translates action and comedy movies"
}
Response
json
{
  "success": true,
  "data": {
    "id": "vj_123",
    "name": "VJ Junior",
    "code": "VJ_JUNIOR"
  },
  "message": "VJ created successfully"
}
Update VJ
Endpoint

PUT /vjs/{vj_id}
Headers

Authorization: Bearer <your_token>
Request Body
json
{
  "name": "VJ Junior (Updated)",
  "description": "VJ Junior translates action, comedy, and drama movies"
}
Response
json
{
  "success": true,
  "message": "VJ updated successfully"
}
Delete VJ
Endpoint
text
DELETE /vjs/{vj_id}
Headers

Authorization: Bearer <your_token>
Response
json
{
  "success": true,
  "message": "VJ deleted successfully"
}