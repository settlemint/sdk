# BUILD DEPENDENCIES
FROM oven/bun:1.1.38-alpine AS deps

RUN mkdir -p /app
WORKDIR /app

COPY package.json .
RUN bun install

FROM deps AS build

COPY --chmod=0777 . .
RUN bun run build

# RUN
FROM node:22.12.0-alpine3.20 AS prod

LABEL org.opencontainers.image.source="https://github.com/settlemint/btp"

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=build --chmod=0777  /app/public public
COPY --from=build --chmod=0777  /app/.next/standalone ./
COPY --from=build --chmod=0777  /app/.next/static ./.next/static

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["server.js"]
