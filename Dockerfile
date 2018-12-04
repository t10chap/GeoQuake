FROM httpd
COPY . /usr/local/apache2/htdocs/

# Listen on port 8080
RUN sed -i -e 's/Listen 80/Listen 8080/' /usr/local/apache2/conf/httpd.conf

EXPOSE 8080