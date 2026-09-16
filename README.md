# WebYacu

## Production deployment

The site is served by Nginx in Docker and is reachable to the shared Caddy instance through the external `caddy_network` Docker network.

On the VPS, create the network once if it does not already exist:

```sh
docker network create caddy_network
```

The Caddy container must also be connected to `caddy_network` so it can resolve `frontend_girawebsite`.

Build and start the site from this directory:

```sh
docker compose up -d --build
```

Add this site block to the Caddyfile used by the VPS Caddy container:

```caddyfile
www.webyacu.com, webyacu.com {
	reverse_proxy frontend_girawebsite:80
}
```

Reload Caddy after applying the configuration. Caddy obtains and renews the HTTPS certificates for both hostnames; ensure their DNS records point to the VPS.

To deploy an update:

```sh
docker compose up -d --build
```
