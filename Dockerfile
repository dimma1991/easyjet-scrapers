FROM php:8.1-apache

# 🧱 Update & Puppeteer dependencies
RUN apt-get update && apt-get install -y \
    curl wget gnupg unzip ca-certificates \
    fonts-liberation libappindicator3-1 \
    libasound2 libatk-bridge2.0-0 libcups2 libdbus-1-3 \
    libgdk-pixbuf2.0-0 libnspr4 libnss3 libx11-xcb1 \
    libxcomposite1 libxdamage1 libxrandr2 xdg-utils \
    && apt-get clean

# 🧠 Install Node.js 18
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm

# 🧪 Install Puppeteer + Chromium
RUN npm install puppeteer

# ✅ Enable Apache rewrite
RUN a2enmod rewrite

# 📁 Copy project
COPY . /var/www/html/
WORKDIR /var/www/html
