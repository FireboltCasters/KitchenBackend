# KitchenBackend

## Setup
- Have Docker installed and running
- Have Server-Toplevel-Proxy running
- run docker-compose up
- open http://127.0.0.1/myapp/api to check everything is working

## Configure SSO

- open docker-compose.yaml
- use Directus docks for adding new SSO https://docs.directus.io/configuration/config-options/#sso-oauth2-and-openid

### Apple SSO
Since the SSO for Apple is a bit more to do, read the file: "SSO_APPLE.md"

### Troubleshooting

## Login - Unkown Exception
Is the Database file /database/data.db given all peermission (read/write)?
- If not use ```chmod 777 /database/data.db```
