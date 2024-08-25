# Base stage
FROM node:20-alpine AS base
WORKDIR /app
RUN apk update && apk add --no-cache zip

# Dependencies stage
FROM base AS dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Build stage
FROM base AS build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM base AS production
ENV NODE_ENV=production
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package*.json ./

# Optional: copy other necessary files
# COPY .env.production ./.env

EXPOSE 3000
CMD ["node", "dist/main"]
