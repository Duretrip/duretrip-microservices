#!/bin/bash

# Start the first Redis instance
redis-server /etc/redis/auth_redis.conf &

# Wait for the first instance to start
sleep 5

# Start the second Redis instance
redis-server /etc/redis/jet_redis.conf

# Keep the script running to keep Docker container running
tail -f /dev/null
