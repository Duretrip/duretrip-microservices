#!/bin/bash

# Function to check if RabbitMQ Management API is accessible
check_rabbitmq_api() {
  local url="http://localhost:15672"
  local max_attempts=30  # Adjust the number of attempts as needed
  local attempt=0

  while [ "$attempt" -lt "$max_attempts" ]; do
    if curl --silent --head --fail "$url" > /dev/null; then
      echo "RabbitMQ Management API is accessible."
      return 0  # Success
    fi
    echo "Waiting for RabbitMQ to start (attempt $attempt)..."
    attempt=$((attempt + 1))
    sleep 5  # Adjust the sleep duration as needed
  done

  echo "RabbitMQ did not start in a reasonable time."
  return 1  # Failure
}

# Wait for RabbitMQ to start
check_rabbitmq_api || exit 1

# Generate the password hash
hashed_password=$(rabbitmqctl eval 'io:format("~s~n", [rabbit_auth_backend_internal:hash_password(<<"Zijela2023">>)]).')

sudo rabbitmqctl add_user Zijela $hashed_password
sudo rabbitmqctl set_user_tags Zijela administrator
sudo rabbitmqctl set_permissions -p / Zijela ".*" ".*" ".*"
