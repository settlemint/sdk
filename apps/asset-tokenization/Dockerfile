# DEPENDENCIES
FROM oven/bun:1.1.26-alpine AS dependencies

RUN apk update && apk add --no-cache python3 make g++ gcc curl
RUN curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | sh

COPY package.json .
RUN bun install

# BUILD
FROM dependencies as build

ENV NEXT_TELEMETRY_DISABLED 1

COPY . .
RUN bun run build

# RUNTIME
FROM oven/bun:1.1.26-alpine
LABEL org.opencontainers.image.source="https://github.com/settlemint/sdk"

ENV NEXT_TELEMETRY_DISABLED 1

COPY --chmod=0777 database database
COPY --from=build --chmod=0777  /home/bun/app/public public
COPY --from=build --chmod=0777  /home/bun/app/.next/standalone ./
COPY --from=build --chmod=0777  /home/bun/app/.next/static ./.next/static

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
RUN echo $PATH
ENV PATH="$PATH:/usr/local/bin"
RUN echo $PATH

COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["server.js"]
