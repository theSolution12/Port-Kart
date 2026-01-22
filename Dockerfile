FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build


FROM node:20-alpine AS production

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

# Tell Docker what port the app listens on (documentation + tooling)
EXPOSE 3000

# Ensure PORT is defined (optional but good)
ENV PORT=3000

CMD ["npm", "start"]
