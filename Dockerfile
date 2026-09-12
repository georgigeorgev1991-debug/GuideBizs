FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000
ARG NEXT_PUBLIC_BE_SITE_URL=
ARG NEXT_PUBLIC_PLAUSIBLE_DOMAIN=
ARG NEXT_PUBLIC_REGISTRATION_NUMBER=niet-gepubliceerd
ARG NEXT_PUBLIC_SITE_ADDRESS=niet-gepubliceerd
ARG RESEND_API_KEY=build-placeholder-docker
ARG CONTACT_TO_EMAIL=hallo@bergpad.nl

ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_BE_SITE_URL=$NEXT_PUBLIC_BE_SITE_URL
ENV NEXT_PUBLIC_PLAUSIBLE_DOMAIN=$NEXT_PUBLIC_PLAUSIBLE_DOMAIN
ENV NEXT_PUBLIC_REGISTRATION_NUMBER=$NEXT_PUBLIC_REGISTRATION_NUMBER
ENV NEXT_PUBLIC_SITE_ADDRESS=$NEXT_PUBLIC_SITE_ADDRESS
ENV RESEND_API_KEY=$RESEND_API_KEY
ENV CONTACT_TO_EMAIL=$CONTACT_TO_EMAIL
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

FROM node:20-alpine AS runner
RUN apk add --no-cache wget
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/assets/fonts ./assets/fonts

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/ >/dev/null || exit 1

CMD ["node", "server.js"]
