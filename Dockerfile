# Stage 1: Build Frontend
FROM node:20-alpine as frontend-build
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend ./
# Ensure .env.production is used or set env var during build
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# Stage 2: Setup Backend & Runtime
FROM node:20-alpine
WORKDIR /app
COPY backend/package.json backend/package-lock.json ./
RUN npm ci --production
COPY backend ./

# Copy frontend build to backend public directory
COPY --from=frontend-build /app/frontend/dist ./public

# Expose port (Cloud Run sets PORT env var)
ENV PORT=8080
EXPOSE 8080

CMD ["node", "server.js"]
