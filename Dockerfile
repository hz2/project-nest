FROM node:alpine as builder

ENV NODE_ENV build

# for debian
# RUN apk --no-cache add python3 make
# for alpine
RUN apk --no-cache add --virtual builds-deps build-base python3

WORKDIR /node

COPY . /node

RUN npm ci \
    && npm rebuild bcrypt --build-from-source \
    && npm run build \
    && npm prune --production

# Copy the build output to the host

FROM node:alpine

ENV NODE_ENV production

WORKDIR /node

COPY --from=builder /node/*.json /node/
COPY --from=builder /node/node_modules/ /node/node_modules/
COPY --from=builder /node/dist/ /node/dist/

CMD ["node", "dist/main"]
