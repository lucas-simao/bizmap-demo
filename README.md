# bizmap-demo

A tiny **fictitious** shop API (TypeScript + Express + Postgres) used to demo the
[BizMap](https://github.com/lucas-simao/bizmap) pull-request impact comment.

- `src/server.ts` – HTTP routes (`/customers`, `/inventory`, `/orders`)
- `src/orders.ts`, `src/inventory.ts`, `src/customers.ts` – data access via `pg`
- `db/schema.sql` – `customers`, `inventory`, `orders`

## What this repo shows

On every pull request, the workflow in
[`.github/workflows/bizmap-impact.yml`](.github/workflows/bizmap-impact.yml) runs the
BizMap Action. It maps the changed functions to the routes that reach them and the
tables/columns they read or write, then posts **one** comment (updated on each push)
with a Mermaid diagram.

```yaml
permissions:
  contents: read
  pull-requests: write
steps:
  - uses: actions/checkout@v4
  - uses: lucas-simao/bizmap@<ref>
    with:
      path: .
```

## Try it locally

```bash
pip install git+https://github.com/lucas-simao/bizmap
bizmap scan . --mermaid
bizmap why orders.status
```

Nothing here is real data or a real product.
