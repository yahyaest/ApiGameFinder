# Deploy React app to VPS with NGINX

## NGINX Configuration : 
Under '**_/etc/nginx/conf.d/server.conf_**' add react app location : 
```
location /game-app/ {
   proxy_pass             http://127.0.0.1:3002;
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
```
In this demo we are using '**/game-app/**' as subdomain


## React app configuration : 
- In package.json : 
<br>

Add app subdomain to homepage key .

```
"homepage": "/game-app"
```
- In .env file : 
<br>


```
REACT_APP_ENV=PROD
REACT_APP_DOMAIN=/game-app
# NOTE: THIS IS DANGEROUS!
# It exposes your machine to attacks from the websites you visit.
# But for now it's the only solution to avoid "Invalid Host Header" error
DANGEROUSLY_DISABLE_HOST_CHECK=true
```

- In App.js/ts :
<br> 

```
  import { BrowserRouter as Router } from "react-router-dom";
  const environment = process.env.REACT_APP_ENV;
  const domain = process.env.REACT_APP_DOMAIN 
      <Router basename={environment === "PROD" ? domain : ""}>
            <div className="App">
               <Navbar />
               <Switch>
                   ...
               /Switch>
           </div>
      </Router>
```

- img tag : 
<br>
Add '_**environment === "PROD" ? `${domain}/**_' to img tag 'src' totoggle between development and production mode.

```
  <img className="navLogo" src={environment === "PROD" ? `${domain}/images/E3_Logo.png` : "/images/E3_Logo.png"}  alt="E3-Logo" />
```

- General use case : 
<br>

```
const environment = process.env.REACT_APP_ENV;
const domain = process.env.REACT_APP_DOMAIN 
environment === "PROD" ? window.location.replace(`${domain}/enable-cors`) : window.location.replace("/enable-cors");
```