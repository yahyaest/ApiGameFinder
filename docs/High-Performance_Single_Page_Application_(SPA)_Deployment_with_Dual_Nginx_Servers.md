# High-Performance Single Page Application (SPA) Deployment with Dual Nginx Servers
This document outlines a high-performance deployment architecture for a Single Page Application (SPA) built with React on a Virtual Private Server (VPS). It leverages Docker containers for both Nginx servers, offering improved scalability, security, and streamlined deployment.

![alt text](High-Performance_Single_Page_Application_(SPA)_Deployment_with_Dual_Nginx_Servers.png)


## Components
### React App (Front-End):

This is the user interface portion of the application, likely built using the React JavaScript library.
The built React application files are placed on the VPS.
Nginx Servers:

### Nginx 1 Container (Web Server):
- This container serves static content (HTML, CSS, JavaScript) directly to the user's browser.
- It resides within the VPS and mounts the volume containing the built React application files.

### Nginx 2 Container (Reverse Proxy):
- This container acts as the main entry point for user requests.
- It receives user requests but doesn't directly serve content.
- It acts as a reverse proxy, forwarding requests to the appropriate server (Nginx 1 container in this case).
- This configuration offers benefits like load balancing and security.

### VPS Server:

This virtual private server hosts Docker and runs both Nginx containers along with volumes for the React application files.

## Workflow
- User makes a request through the domain name or IP address of the application.
- The request reaches Nginx 2 (Reverse Proxy) on the VPS.
- Nginx 2, based on its configuration, forwards the request to Nginx 1 (Web Server) within the VPS.
- Nginx 1 identifies the requested static content (HTML, CSS, JavaScript) and serves it directly to the user's browser.
- The user's browser renders the React application based on the received files.
  
## Benefits
- **Separation of Concerns:** This approach separates the front-end application (React) from the web server configuration (Nginx).
- **Scalability:** If needed, you can add another Nginx 1 server to handle increased traffic and distribute the load.
- **Security:** The reverse proxy (Nginx 2) can offer additional security features like hiding the actual server hosting the React application.
- **Reduced Docker Image Size:** Serving the built React app directly from Nginx reduces the size of your Docker image compared to using a Node.js image. This can significantly improve deployment times and optimize resource usage, especially for deployments on platforms with limited storage or bandwidth.

## Implementation
- 1- Build the React app with '**_npm run build_**'
- 2- **Dockerfile :** here insted of mounting the build/ to /usr/share/nginx/html/ will copy it so the built image will have the build files 

```yml
FROM nginx:1.24.0-alpine
COPY build/ /usr/share/nginx/html/
EXPOSE 8080
```
- 3- docker-compose file
```yml
version: '3'
services:
  react-app-nginx:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: react-app-nginx
    ports:
      - "8080:80"
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf
```
- 4- **Nginx as webserver conf file :** 
  
for this config the react app is serving with sub-domain /react-app.

Run app in browser at http://localhost:8080/react-app
  
```nginx
server {
 listen       80;
 listen  [::]:80;
 server_name  localhost;
 root   /usr/share/nginx/html;

 #access_log  /var/log/nginx/host.access.log  main;

 location / {
  absolute_redirect off;
  return 301 /react-app/;
}

 location /react-app/ {
  alias /usr/share/nginx/html/;
  try_files $uri $uri/ /react-app/index.html;
}

error_page  404              /404.html;

error_page   500 502 503 504  /50x.html;
location = /50x.html {
 root   /usr/share/nginx/html;
}

}
```

- 5- **Nginx as reverse proxy**
```nginx
server {
    server_name your_domain.com www.your_domain.com;

    listen 443 ssl;
    ssl_certificate /path/to/ssl_certificate;
    ssl_certificate_key /path/to/ssl_certificate_key;;


    location /react-app/ { 
        proxy_pass             http://vps_ip_address:8080;
        proxy_read_timeout     60;
        proxy_connect_timeout  60;
        proxy_redirect         off;

        # Allow the use of websockets
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    
}
```