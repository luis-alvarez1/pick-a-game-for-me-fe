FROM node:22.14-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

RUN	yarn build --mode production

FROM nginx:alpine

# Copy the built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy and setup nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Verify the content and permissions
RUN ls -la /usr/share/nginx/html && \
    ls -la /usr/share/nginx/html/assets && \
    chmod -R 755 /usr/share/nginx/html

# Create a script to replace the backend URL
RUN echo '#!/bin/sh' > /docker-entrypoint.sh && \
    echo 'sed -i "s|http://backend:3000|$VITE_BACKEND_URL|g" /etc/nginx/conf.d/default.conf' >> /docker-entrypoint.sh && \
    echo 'exec nginx -g "daemon off;"' >> /docker-entrypoint.sh && \
    chmod +x /docker-entrypoint.sh

EXPOSE 3001

ENTRYPOINT ["/docker-entrypoint.sh"] 