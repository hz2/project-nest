FROM node:alpine as builder

ENV NODE_ENV build

RUN apk --no-cache add curl

WORKDIR /node

COPY . /node

# RUN npm config set registry https://registry.npmmirror.com

RUN ls -al /node/src/lab/entities | grep phone

RUN npm ci \
    && npm run build \
    && npm prune --production \
    && mkdir -p /app \
    && cp ./package*.json /app/ \
    && cp ./ormconfig.prod.json /app/ormconfig.json \
    && cp ./node_modules/ /app/node_modules/ -R \
    && cp ./dist/ /app/dist/ -R \
    && cp ./src/lab/entities/phone.db /app/dist/lab/entities/phone.db -rf
#    && curl https://raw.githubusercontent.com/hz2/project-nest/master/src/lab/entities/phone.db -o /app/dist/lab/entities/phone.db


FROM node:alpine

ENV NODE_ENV production

WORKDIR /app

COPY --from=builder /app/ /app/

RUN ls -al /app/dist/lab/entities | grep phone

CMD ["node", "dist/main"]
