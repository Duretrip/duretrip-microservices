#!/bin/bash

# Start RabbitMQ
rabbitmq-server -detached

# # Wait for RabbitMQ to fully start (you may need to adjust the sleep time)
sleep 30

rabbitmqctl add_user Zijela Zijela2023
rabbitmqctl set_user_tags Zijela administrator
rabbitmqctl set_permissions -p / Zijela ".*" ".*" ".*"
rabbitmqadmin declare queue name=auth-queue durable=true
rabbitmqadmin declare queue name=jet-queue durable=true
rabbitmqadmin declare queue name=hotel-queue durable=true
rabbitmqadmin declare queue name=api-gateway-queue durable=true

# Output a message indicating the setup is complete
echo "RabbitMQ setup is complete."

# Keep the script running to keep the container alive
tail -f /dev/null
