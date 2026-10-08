# Batch Export Console

A small app to configure export settings, add items as rows, and track each row's progress.

## Run locally

Backend:

    cd BE
    npm install
    node index.js

Frontend:

    cd FE
    npm install
    npm run dev


## Status

Working:
- Express backend: config, create batch, batch status, per-row retry (in-memory)

In progress:
- Schema-driven settings form and row repeater
- Validation, polling, live table, retry UI, themes, deployment

## Decisions

- Row status is computed from timestamps on each request, so there are no timers or background jobs.
- Form fields render from the schema through a type map, so a new field needs no React change.
- State lives in one top-level component, and rows use stable ids so reordering is safe.

## With more time

I would build the whole flow thinly first (form, submit, polling, table) and then polish each part.