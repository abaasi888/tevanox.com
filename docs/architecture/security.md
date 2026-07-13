
### `tevanox.com/docs/architecture/security.md`

```markdown
# 🔐 Security Architecture

## Authentication

### JWT Tokens

```json
{
  "alg": "HS256",
  "typ": "JWT"
}

Session Management
Single-device login enforcement

Session expiration (30 days)

Session termination on logout

Device tracking

Password Security
Hashed using bcrypt

Minimum 6 characters

Password reset via email

Rate limiting on login attempts

Authorization
User Roles
Role	Permissions
User	View content, subscribe, download
Agent	Referral system, earnings dashboard
Admin	Full system control, content management
VJ	None (just metadata)
Role-Based Access Control


def require_admin(current_user):
    if not current_user.get("is_admin", False):
        raise HTTPException(status_code=403)
    return current_user

def require_agent(current_user):
    if not current_user.get("is_agent", False):
        raise HTTPException(status_code=403)
    return current_user
API Security
CORS Configuration


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://tevanox.com",
        "https://admin.tevanox.com",
        "https://api.tevanox.com",
        "https://agent.tevanox.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
Rate Limiting

# 100 requests per minute per IP
rate_limit = {
    "window": 60,
    "max_requests": 100
}
Request Validation
Input sanitization

SQL injection prevention

XSS protection

CSRF protection

Data Security
Encryption
Passwords: bcrypt hashing

API Keys: AES-256 encryption

Data in transit: TLS 1.3

Storage Security
MinIO with access keys

Presigned URLs for downloads

File integrity checks

Privacy
User data protection

GDPR compliance

Data retention policies

Security Headers
nginx
add_header X-Content-Type-Options "nosniff";
add_header X-Frame-Options "SAMEORIGIN";
add_header X-XSS-Protection "1; mode=block";
add_header Referrer-Policy "strict-origin-when-cross-origin";
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
Monitoring & Logging
Security event logging

Failed login attempts

API access logs

Suspicious activity alerts