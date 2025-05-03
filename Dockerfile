FROM oven/bun:1-alpine AS frontend-builder
WORKDIR /app
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile
COPY . .
ENV NODE_ENV=production
RUN bun run build

FROM golang:1.24-alpine AS backend-builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY server.go .
RUN go build -ldflags="-w -s" -o /server server.go

FROM alpine:latest AS final
WORKDIR /app
COPY --from=backend-builder /server /app/server
COPY --from=frontend-builder /app/dist ./dist
ENV PORT=3000
EXPOSE $PORT
CMD ["/app/server"]