

FROM node:18-alpine
WORKDIR /reddit-app-1
COPY . .
CMD ["node", "server.prod.js"]
EXPOSE 8080
