FROM php:7.4-apache
RUN apt-get update && apt-get install -y --no-install-recommends \
    unixodbc \
    tdsodbc \
    gnupg2 \
    unixodbc-dev 
      
RUN pecl install -f sqlsrv \
    && docker-php-ext-enable sqlsrv \
    && docker-php-ext-install mysqli \
    && docker-php-ext-enable mysqli
RUN curl -s https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
    && bash -c "curl -s https://packages.microsoft.com/config/ubuntu/18.04/prod.list > /etc/apt/sources.list.d/mssql-release.list"\
    && apt-get -y update 
RUN ACCEPT_EULA=Y apt -y install msodbcsql17 && apt-get clean && rm -rf /var/lib/apt/lists/*
COPY php /var/www/
RUN rm -rf /etc/apache2/sites-enabled/*
COPY *.conf /etc/apache2/sites-enabled