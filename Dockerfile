FROM node:22 AS builder

WORKDIR /app

COPY . ./

RUN npm install

RUN npm run build

FROM node:22

WORKDIR /app

COPY --from=builder /app/package*.json ./

COPY --from=builder /app/dist ./dist

RUN npm install --omit=dev

EXPOSE 8080

CMD ["node", "dist/main"]
