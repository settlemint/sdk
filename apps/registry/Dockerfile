# BUILD DEPENDENCIES
FROM oven/bun:1.1.31-alpine AS build

RUN mkdir -p /app
WORKDIR /app

COPY package.json .
RUN set -e; \
  for i in 1 2 3; do \
    bun install --force --no-cache && break || \
    if [ $i -lt 3 ]; then \
      echo "bun install failed, retrying in 10 seconds..." && \
      sleep 10; \
    else \
      echo "bun install failed after 3 attempts" && exit 1; \
    fi \
  done

COPY --chmod=0777 . .
RUN bun run registry:build

# RUN
FROM node:22.10.0-alpine3.20 AS prod

LABEL org.opencontainers.image.source="https://github.com/settlemint/btp"

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=build --chmod=0777  /app/public public
COPY --from=build --chmod=0777  /app/.next/standalone ./
COPY --from=build --chmod=0777  /app/.next/static ./.next/static

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["server.js"]
