FROM node:latest AS builder

WORKDIR /build
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest

WORKDIR /usr/share/nginx/html

COPY --from=builder /build/dist /usr/share/nginx/html/
