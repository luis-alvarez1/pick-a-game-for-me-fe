FROM node:22.14-alpine AS builder

WORKDIR /app

# Only copy package files first to leverage Docker cache
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies with production flag and clean cache
RUN yarn install --frozen-lockfile --production=false && \
    yarn cache clean

# Copy source files
COPY . .

ARG VITE_BACKEND_URL="/api"
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

# Build with production mode and clean up
RUN yarn build --mode production && \
    rm -rf node_modules

FROM nginx:alpine

# Copy only the built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy and setup nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Verify the content and permissions
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 3001

CMD ["nginx", "-g", "daemon off;"] 