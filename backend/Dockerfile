
FROM php:8.4-fpm-alpine

# Install runtime dependencies and build dependencies
RUN apk add --no-cache \
    libpq \
    libzip \
    oniguruma

# Install build dependencies in a virtual package for cleanup
RUN apk add --no-cache --virtual .build-deps $PHPIZE_DEPS \
    autoconf \
    make \
    g++ \
    musl-dev \
    postgresql-dev \
    libzip-dev \
    libpng-dev \
    oniguruma-dev \
  && docker-php-ext-install pdo_pgsql pgsql zip \
  && apk del .build-deps

# Install composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy composer files and install dependencies
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist --no-scripts

# Copy application code
COPY . .

RUN composer run-script post-autoload-dump

# Ensure permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 9000

CMD ["php-fpm"]
