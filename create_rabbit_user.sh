# Generate the password hash
hashed_password=$(rabbitmqctl eval 'io:format("~s~n", [rabbit_auth_backend_internal:hash_password(<<"Zijela2023">>)]).')

sudo rabbitmqctl add_user Zijela $hashed_password
sudo rabbitmqctl set_user_tags Zijela administrator
sudo rabbitmqctl set_permissions -p / Zijela ".*" ".*" ".*"