FROM node:18 as react-build
WORKDIR /app
COPY ./DishMasters_Frontend/package*.json ./
RUN npm install
COPY ./DishMasters_Frontend ./
RUN NODE_ENV=development npm i

FROM php:8.2-fpm as laravel
WORKDIR /var/www/html

# Install PHP dependencies
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-install pdo_mysql zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy Laravel files
COPY . .

# Copy React build files to Laravel's public directory
COPY --from=react-build DishMasters_Frontend/dist ./public/react

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expose port 9000 for PHP-FPM
EXPOSE 9000

CMD ["php-fpm"]
