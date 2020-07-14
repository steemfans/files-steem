FROM alpine:3.9
RUN apk add --no-cache nodejs npm git python make g++
WORKDIR /app
ADD . /app
RUN cd /app && \
  npm install && \
  npm run build

FROM nginx:latest
WORKDIR /app
EXPOSE 80
COPY --from=0 /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /app/dist /app
STOPSIGNAL SIGINT
CMD ["nginx", "-g", "daemon off;"]