FROM node:alpine as builder

ENV NODE_ENV build

WORKDIR /node

COPY . /node

# RUN npm config set registry https://registry.npmmirror.com

RUN npm ci \
    && npm run build \
    && npm prune --production

RUN mkdir -p /app
# copy prod ormconfig
COPY ./package*.json /app/
COPY ./ormconfig.prod.json /app/ormconfig.json
COPY ./node_modules/ /app/node_modules/
COPY ./dist/ /app/dist/
# ---

FROM node:alpine

ENV NODE_ENV production

WORKDIR /app

COPY --from=builder /app/ /app/

CMD ["node", "dist/main"]