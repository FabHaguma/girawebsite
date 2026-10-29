# WebYacu

## Local development

Run `npm install` once, then `npm run dev` and open the local URL printed by Vite.
The React entry point is `src/main.jsx`; Vite serves assets from `public/`.
Run `npm run build` for the production bundle in `dist/`, and `npm run preview`
to inspect that bundle locally. No local Docker installation is needed.

The landing page includes interactive, clearly labelled service examples. The full
template studio is available at `#/templates/showcase/fixit-pro`. Project cards
load the existing public PocketBase website list; enquiries open WhatsApp with a
prepared message for the visitor to send. Illustrative photos in `public/images/`
are sourced from Unsplash and are bundled locally.

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
