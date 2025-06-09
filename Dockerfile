FROM php:8.1-apache

# Puppeteer & Chromium deps
RUN apt-get update && apt-get install -y \
    ca-certificates fonts-liberation libappindicator3-1 \
    libasound2 libatk-bridge2.0-0 libcups2 libdbus-1-3 \
    libgdk-pixbuf2.0-0 libnspr4 libnss3 libx11-xcb1 \
    libxcomposite1 libxdamage1 libxrandr2 xdg-utils \
    wget unzip gnupg curl gnupg2 build-essential

# Node.js & Puppeteer install
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm && \
    npm install puppeteer

RUN a2enmod rewrite

COPY . /var/www/html/
WORKDIR /var/www/html
