# ==============================
#           FRONTEND
# ==============================
FROM node:20 as builder-frontend

# Set working directory
WORKDIR /app

# Copy project folder
COPY frontend /app

# Build Angular project
RUN npm i && npm run build

# ==============================
#           BACKEND
# ==============================
FROM node:20 as builder-backend

# Set working directory
WORKDIR /app

# Copy project folder
COPY backend /app

# Build backend project
RUN npm i && npm run build

# ==============================
#         FINAL IMAGE
# ==============================
FROM node:20

RUN apt-get update && apt-get install -y supervisor nginx
RUN mkdir -p /var/log/supervisor
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Copy projects
COPY --from=builder-frontend /app/dist/projet-angular/browser/ /var/www/html
COPY --from=builder-backend /app/build /app/backend

# Set working directory
WORKDIR /app/backend
# Install dependencies
RUN corepack enable && npm install --prod --frozen-lockfile


# Copy nginx configuration
COPY docker/nginx.conf /etc/nginx/nginx.conf

ENV NODE_ENV production
ENV HOST 0.0.0.0
ENV PORT 3333

EXPOSE 80

CMD ["/usr/bin/supervisord"]