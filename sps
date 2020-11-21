server{
    listen 80 default_server;
    listen [::] default_server;
    root /var/www/SPS;
    index index.html;
    server_name sps;
    location / {
        try_files $uri $uri/ =404;
    }
}