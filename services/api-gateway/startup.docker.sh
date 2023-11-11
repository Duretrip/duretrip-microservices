#!/usr/bin/env bash
set -e

# /opt/wait-for-it.sh host.docker.internal:5432
sleep 30

npm run start:prod
npm run migration:run
npm run seed:run
