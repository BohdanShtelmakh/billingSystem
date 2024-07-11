FROM nginx:alpine

RUN apk update && apk add --update --no-cache \
  nginx-mod-http-image-filter \
  libgd \
  sudo \
  bash

RUN echo -e "load_module /etc/nginx/modules/ngx_http_image_filter_module.so;\n$(cat /etc/nginx/nginx.conf)" > /etc/nginx/nginx.conf

ADD ./nginx/default.conf /etc/nginx/conf.d/default.conf
