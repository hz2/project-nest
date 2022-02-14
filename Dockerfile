FROM node:alpine as builder

ENV NODE_ENV build

WORKDIR /node

COPY . /node

# RUN npm config set registry https://registry.npmmirror.com

RUN npm ci \
    && npm run build \
    && npm prune --production

# ---

FROM node:alpine

ENV NODE_ENV production

WORKDIR /node

# copy prod ormconfig
COPY --from=builder /node/package*.json /node/
# COPY --from=builder /node/ormconfig.prod.json /node/ormconfig.json
COPY --from=builder /node/node_modules/ /node/node_modules/
COPY --from=builder /node/dist/ /node/dist/

CMD ["node", "dist/main"]