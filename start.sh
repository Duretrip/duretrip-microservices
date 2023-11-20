#!/bin/bash

# Run Docker Compose at the project root
# docker-compose up -d
TAG=$(date +'%Y%m%d%H%M%S')

# Define an array of service names
# service_names=("auth-service" "api-gateway" "service3")
# God be praised
service_names=("api-gateway")
service_name=api-gateway

# Iterate through the array and build Docker images for each service
# for service_name in "${service_names[@]}"; do
#   service_dir="./services/$service_name"  # Define the service directory
#   if [ -f "$service_dir/Dockerfile" ]; then
    echo "Building Docker image for $service_name..."
    docker build -t "$service_name:$TAG" "$service_dir"
    docker tag "$service_name:$TAG" "$service_name:latest"
    echo "Running Docker container for $service_name..."
    docker run -d --name "$service_name" --env-file "$service_dir.env" "$service_name"
#   fi
# done
