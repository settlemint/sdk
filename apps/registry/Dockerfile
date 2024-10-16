# BUILD DEPENDENCIES
FROM cgr.dev/chainguard/node-lts:latest-dev AS build-deps

COPY --from=oven/bun:1.1.30-alpine --chmod=0777 /usr/local/bin/bun /bin/bun
ENV BUN_RUNTIME_TRANSPILER_CACHE_PATH=0
ENV BUN_INSTALL_BIN=/bin

COPY --chmod=0777 package.json .
RUN bun install

# BUILD
FROM build-deps AS build

ENV SKIP_TYPE_CHECKING=yes

COPY --chmod=0777 . .
RUN bun run build

# TILT
FROM cgr.dev/chainguard/node-lts:latest-dev AS tilt

COPY --from=oven/bun:1.1.30-alpine --chmod=0777 /usr/local/bin/bun /bin/bun
ENV BUN_RUNTIME_TRANSPILER_CACHE_PATH=0
ENV BUN_INSTALL_BIN=/usr/local/bin
ENV NEXT_TELEMETRY_DISABLED=1

USER root

RUN mkdir -p /.cache && \
  chmod -R 777 /.cache && \
  mkdir -p /app && \
  chmod -R 777 /app

COPY --from=build-deps --chmod=0777  /app /app
COPY --chmod=0777 . /app

# RUN
FROM cgr.dev/chainguard/node-lts:latest AS prod

LABEL org.opencontainers.image.source="https://github.com/settlemint/btp"

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=build --chmod=0777  /app/public public
COPY --from=build --chmod=0777  /app/.next/standalone ./
COPY --from=build --chmod=0777  /app/.next/static ./.next/static

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["server.js"]
