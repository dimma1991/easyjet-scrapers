FROM php:8.1-apache

# Puppeteer & Node.js
RUN apt-get update && \
    apt-get install -y curl gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm && \
    npm install puppeteer

# Enable Apache rewrite module
RUN a2enmod rewrite

# Copy project files into container
COPY . /var/www/html/

WORKDIR /var/www/html
