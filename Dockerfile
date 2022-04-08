FROM node:alpine as builder

ENV NODE_ENV build
RUN apk --no-cache add python3

WORKDIR /node

COPY . /node

RUN npm ci \
    && npm run build \
    && npm prune --production

# Copy the build output to the host

FROM node:alpine

ENV NODE_ENV production

WORKDIR /app

COPY --from=builder /node/*.json /app/
COPY --from=builder /node/node_modules/ /app/node_modules/
COPY --from=builder /node/dist/ /app/dist/

CMD ["node", "dist/main"]
