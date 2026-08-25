FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
WORKDIR /app
EXPOSE 80
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /app
STOPSIGNAL SIGINT
CMD ["nginx", "-g", "daemon off;"]
