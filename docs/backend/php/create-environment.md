---
title: 'Создать окружение'
sidebar_position: 3
pagination_next: null
pagination_prev: null
---

## Подготовка окружения для проекта на РНР

Чтобы создать окружение, необходимо 3 файла: Dockerfile, docker-compose.yaml, default.conf.

Dockerfile
```dockerfile
FROM php:8.1-fpm
RUN pecl install apcu apfd xdebug && docker-php-ext-enable xdebug apfd
COPY /xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini
RUN apt-get update && apt-get install -y \
  libicu-dev \
  libzip-dev \
  libfreetype6-dev \
  libjpeg62-turbo-dev \
  libpng-dev \
  libxml2-dev \
  libpng-dev \
  libxslt-dev \
  libpq-dev \
  git \
  unzip
RUN docker-php-ext-install -j$(nproc) iconv intl xml soap opcache pgsql pdo pdo_pgsql zip xsl  
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install -j$(nproc) gd
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer --version
```
docker-compose.yaml
```yaml
version: "3.9"
services:
  php:
    build: .
    restart: on-failure
    volumes:
      - .:/var/www/html
  nginx:
    image: nginx:1.21.0-alpine
    restart: on-failure
    ports:
      - "8080:80"
    volumes:
      - .:/var/www/html
      - ./default.conf:/etc/nginx/conf.d/default.conf:ro
    depends_on:
      - php
```
default.conf
```nginx
server {
  server_name ~.*;
  client_max_body_size 0;
  root /var/www/html;
  location ~ \.(css|js|svg|woff2|woff|map|gif|jpg|png)$ {
    root /var/www/html/public;
  }
  location / {
    try_files $uri /index.php$is_args$args;
  }
  location ~ ^/index\.php(/|$) {
    fastcgi_pass php:9000;
    fastcgi_split_path_info ^(.+\.php)(/.*)$;
    fastcgi_buffers 16 16k;
    fastcgi_buffer_size 32k;
    include fastcgi_params;
    fastcgi_param SCRIPT_FILENAME /var/www/html/public/index.php;
    fastcgi_param DOCUMENT_ROOT $realpath_root;
    internal;
  }
  
  location ~ \.php$ {
    return 404;
  }
  error_log /var/log/nginx/project_error.log;
  access_log /var/log/nginx/project_access.log;
}
```
Размещаем эти файлы в папку проекта и запускаем команду  
`$ docker-compose up -d --build`

Окружение готово!