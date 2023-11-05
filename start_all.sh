#!/bin/bash

# Run Docker Compose at the project root
# docker-compose up -d
TAG=$(date +'%Y%m%d%H%M%S')

# Build Docker images for each service in the "services" folder
services_directory="./services"
for service_dir in "$services_directory"/*/; do
  if [ -f "$service_dir/Dockerfile" ]; then
    service_name=$(basename "$service_dir")
      echo "Building Docker image for $service_name..."
      docker build -t "$service_name:$TAG" "$service_dir"
      docker tag "$service_name:$TAG" "$service_name:latest"
      echo "Running Docker container for $service_name..."
      docker run -d --name "$service_name" --env-file "$service_dir.env" "$service_name"
  fi
done

