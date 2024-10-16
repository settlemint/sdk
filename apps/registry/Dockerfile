FROM node:22.9.0-alpine
LABEL org.opencontainers.image.source="https://github.com/settlemint/sdk"

ENV NEXT_TELEMETRY_DISABLED=1

COPY ./public public
COPY ./.next/standalone ./
COPY ./.next/static ./.next/static

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]