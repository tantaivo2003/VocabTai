# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Serve stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
