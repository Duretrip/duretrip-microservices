#!/usr/bin/env bash
set -e

# /opt/wait-for-it.sh postgres:5432
sleep 30

npm run seed:run
npm run start:prod
npm run migration:run
