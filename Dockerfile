FROM php:8.1-apache

RUN apt-get update && \
    apt-get install -y curl gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    npm install puppeteer

RUN a2enmod rewrite

COPY . /var/www/html/
WORKDIR /var/www/html
