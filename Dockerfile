# syntax=docker/dockerfile:1

FROM node:alpine3.24 AS base
RUN npm install -g pnpm@10.30.3
WORKDIR /app

FROM base AS deps
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile

FROM deps AS build
COPY . .
RUN pnpm lint && pnpm build

FROM base AS dev
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 5001
CMD ["pnpm", "dev", "--host", "0.0.0.0"]

# FROM base AS prod
# COPY --from=deps /app/node_modules ./node_modules
# COPY --from=build /app/dist ./dist
# COPY package.json vite.config.ts index.html ./
# EXPOSE 4173
# CMD ["pnpm", "preview", "--host", "0.0.0.0"]

FROM nginx:1.29.5-alpine AS prod
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
