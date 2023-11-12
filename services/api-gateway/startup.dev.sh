#!/usr/bin/env bash
# set -e
RUN chmod +x /opt/startup.docker.sh

# /opt/wait-for-it.sh postgres:5432
sleep 30

npm run migration:run
npm run seed:run
npm run start
