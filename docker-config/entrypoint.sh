#!/bin/bash





# Update nginx to match worker_processes to no. of cpu's
procs=$(cat /proc/cpuinfo |grep processor | wc -l)
sed -i -e "s/worker_processes  1/worker_processes $procs/" /etc/nginx/nginx.conf






# Always chown webroot for better mounting
mkdir -p /usr/share/nginx/html
chown -Rf nginx.nginx /usr/share/nginx/html

# Create Nginx pid
mkdir -p /run/nginx

nginx -t

# ls -al /etc/nginx/conf.d/
# nginx -T


# nginx -s status

/usr/bin/supervisord -n -c /etc/supervisord.conf