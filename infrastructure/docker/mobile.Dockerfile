# ============================================================================ #
#                   TEVANOXMOVIE MOBILE DOCKERFILE                            #
# ============================================================================ #

# This Dockerfile is for building the mobile app in a CI/CD pipeline

FROM node:18-alpine as builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build Android APK
RUN npx react-native build-android --mode=release

# Build iOS IPA (requires macOS)
# RUN npx react-native build-ios --mode=Release

# Production stage for serving APK
FROM nginx:alpine

# Copy APK to serve
COPY --from=builder /app/android/app/build/outputs/apk/release/app-release.apk /usr/share/nginx/html/tevanoxmovie.apk

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:8080 || exit 1

CMD ["nginx", "-g", "daemon off;"]