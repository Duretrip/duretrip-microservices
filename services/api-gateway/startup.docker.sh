#!/usr/bin/env bash
# set -e
echo "Environment Variables:"
echo "----------------------"

env

RUN chmod +x /opt/startup.docker.sh

# /opt/wait-for-it.sh host.docker.internal:5432
# sleep 30

npm run migration:run
npm run seed:run
npm run start
