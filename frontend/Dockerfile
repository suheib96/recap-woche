# STAGE 1
FROM node AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build
EXPOSE 5173

# STAGE 2
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

