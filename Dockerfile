FROM --platform=$TARGETPLATFORM alpine
ARG build_mode=dev
# RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories
RUN apk update && apk add --no-cache nginx nodejs npm supervisor && rm -rf /var/cache/apk/* 

# ENV NODE_ENV=production
ENV HOST 0.0.0.0

RUN mkdir -p /app
COPY ./ /app
WORKDIR /app

RUN rm -rf /etc/nginx/nginx.conf
ADD ./docker-config/nginx-${build_mode}.conf /etc/nginx/nginx.conf
ADD ./docker-config/supervisord.conf /etc/supervisord.conf
ADD ./docker-config/entrypoint.sh /entrypoint.sh

RUN sed -i s/'npm run start'/'npm run start:'${build_mode}/g /etc/supervisord.conf && \
sed -i 's/\r//g' /etc/supervisord.conf && \
sed -i 's/\r//g' /entrypoint.sh && \
echo "#!/bin/sh\nexit 0" > /usr/sbin/policy-rc.d && \
# npm install -q && \
npm install &>/dev/null && \
npm run build && \
npm cache verify && \
chmod +x /entrypoint.sh

# RUN cat /etc/nginx/nginx.conf
# RUN cat /etc/supervisord.conf

EXPOSE 80

ENTRYPOINT ["sh", "/entrypoint.sh"]