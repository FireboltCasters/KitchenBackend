# KitchenBackend

## Setup
- Have Docker installed and running
- Install and configure a proxy to route requests your docker-instance (for example with https://github.com/FireboltCasters/Server-Toplevel-Proxy)
- run docker-compose up
- open http://127.0.0.1/myapp/api to check everything is working

## Configure

- open .env file
- open docker-compose.yaml
- use Directus docks for adding new SSO https://docs.directus.io/configuration/config-options/#sso-oauth2-and-openid

## Start
- start and stop with ```docker-compose up``` and ```docker-compose down```

### Apple SSO
Since the SSO for Apple is a bit more to do, read the file: "SSO_APPLE.md"

## Troubleshooting

### Login - Unkown Exception
Is the Database file /database/data.db given all peermission (read/write)?
- If not use ```chmod 777 /database/data.db```
