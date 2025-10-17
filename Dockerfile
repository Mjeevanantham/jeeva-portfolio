# syntax=docker/dockerfile:1.7
# --- Base builder image ---
FROM node:22-alpine AS base
ENV CI=true
WORKDIR /app

# --- Dependencies layer ---
FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --fund=false

# --- Build layer ---
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Next.js standalone output for smaller runtime images
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# --- Production runtime ---
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NEXT_TELEMETRY_DISABLED=1

# Use non-root user for security
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Copy standalone build output
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
