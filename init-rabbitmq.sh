#!/bin/bash
echo '.........it is aout to go down o'

# Wait for RabbitMQ to start
sleep 60

rabbitmqctl add_user Zijela Zijela2023
rabbitmqctl set_user_tags Zijela administrator
rabbitmqctl set_permissions -p / Zijela ".*" ".*" ".*"
