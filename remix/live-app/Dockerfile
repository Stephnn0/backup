FROM node:18-alpine AS builder

EXPOSE 3000

WORKDIR /app
COPY . .


RUN npm install
# Remove CLI packages since we don't need them in production by default.
# Remove this line if you want to run CLI commands in your container.
RUN npm remove @shopify/app @shopify/cli
RUN npm run build
ENV NODE_ENV=production
# Unnecessary prune
RUN npm prune --production

# Second stage: create the final image
FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app .

EXPOSE 3000
CMD ["npm", "run", "docker-start"]

