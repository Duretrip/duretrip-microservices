#!/bin/bash

# Function to check if RabbitMQ Management API is accessible
# check_rabbitmq_api() {
#   local url="http://localhost:15672"
#   local max_attempts=30  # Adjust the number of attempts as needed
#   local attempt=0

#   while [ "$attempt" -lt "$max_attempts" ]; do
#     if curl --silent --head --fail "$url" > /dev/null; then
#       echo "RabbitMQ Management API is accessible."
#       return 0  # Success
#     fi
#     echo "Waiting for RabbitMQ to start (attempt $attempt)..."
#     attempt=$((attempt + 1))
#     sleep 5  # Adjust the sleep duration as needed
#   done

#   echo "RabbitMQ did not start in a reasonable time."
#   return 1  # Failure
# }

# # Wait for RabbitMQ to start
# check_rabbitmq_api || exit 1


# Start RabbitMQ
rabbitmq-server -detached

# # Wait for RabbitMQ to fully start (you may need to adjust the sleep time)
sleep 30

# # Generate the password hash
# hashed_password=$(rabbitmqctl eval 'io:format("~s~n", [rabbit_auth_backend_internal:hash_password(<<"Zijela2023">>)]).')

rabbitmqctl add_user Zijela Zijela2023
rabbitmqctl set_user_tags Zijela administrator
rabbitmqctl set_permissions -p / Zijela ".*" ".*" ".*"
rabbitmqadmin declare queue name=auth-queue durable=true
rabbitmqadmin declare queue name=jet-queue durable=true
rabbitmqadmin declare queue name=hotel-queue durable=true
rabbitmqadmin declare queue name=api-gateway-queue durable=true
rabbitmqadmin declare queue name=email-queue durable=true
rabbitmqadmin declare queue name=integration-queue durable=true

# Output a message indicating the setup is complete
echo "RabbitMQ setup is complete."

# Keep the script running to keep the container alive
tail -f /dev/null
