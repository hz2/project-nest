FROM node:alpine as builder

ENV NODE_ENV build

WORKDIR /node

COPY . /node

# RUN npm config set registry https://registry.npmmirror.com

RUN npm ci \
    && npm run build \
    && npm prune --production \
    && mkdir -p /app \
    && cp ./package*.json /app/ \
    && cp ./ormconfig.prod.json /app/ormconfig.json \
    && cp ./node_modules/ /app/node_modules/ -R \
    && cp ./dist/ /app/dist/ -R

FROM node:alpine

ENV NODE_ENV production

WORKDIR /app

COPY --from=builder /app/ /app/

CMD ["node", "dist/main"]