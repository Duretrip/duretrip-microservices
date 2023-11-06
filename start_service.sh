#!/bin/bash

# Check if the service name argument is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <service_name>"
  exit 1
fi

# Service name from the argument
service_name="$1"
service_directory="./services/$service_name"

# Check if the service directory exists
if [ -d "$service_directory" ]; then
  # Run docker-compose from the service directory
  (cd "$service_directory" && docker-compose up -d)
  echo "Started Docker container for $service_name"
else
  echo "Service directory '$service_name' does not exist"
fi
