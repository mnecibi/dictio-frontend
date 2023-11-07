FROM node:latest AS builder

WORKDIR /build
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest

WORKDIR /usr/share/nginx/html

COPY --from=builder /build/index.html /usr/share/nginx/html/
COPY --from=builder /build/style.css /usr/share/nginx/html/
COPY --from=builder /build/index.js /usr/share/nginx/html/
