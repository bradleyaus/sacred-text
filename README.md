# Sacret Text

## Features

- Ability to view recipes
- Ability to edit recipes

TODO:

- Add notes editing and creating
- Add metadata editing and creating
- Add ingredients page to edit and create
- Ability to generate PDF/print (removing the page header etc)
- Dropdown list for ingredients (and matching on)
- Show breadcrumbs in header

## Setup

```bash
pnpm
pnpm dx
```

### Requirements

- Node >= 16.8
- Postgres

## Development

### Start project

```bash
pnpm
pnpm dx
```

### Commands

```bash
pnpm build      # runs `prisma generate` + `prisma migrate` + `next build`
pnpm db-reset   # resets local db
pnpm dev        # starts next.js
pnpm dx         # starts postgres db + runs migrations + seeds + starts next.js
pnpm test-dev   # runs e2e tests on dev
pnpm test-start # runs e2e tests on `next start` - build required before
pnpm test:unit  # runs normal Vitest unit tests
pnpm test:e2e   # runs e2e tests
```

## Deployment

### Using [Render](https://render.com/)

The project contains a [`render.yaml`](./render.yaml) [_"Blueprint"_](https://render.com/docs/blueprint-spec) which makes the project easily deployable on [Render](https://render.com/).

Go to [dashboard.render.com/blueprints](https://dashboard.render.com/blueprints) and connect to this Blueprint and see how the app and database automatically gets deployed.