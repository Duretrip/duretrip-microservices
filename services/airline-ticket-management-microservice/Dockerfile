# Stage 2: Create a minimal production image
FROM node:alpine AS final

# Set working directory
RUN mkdir /apps
RUN mkdir /apps/dist
RUN mkdir /apps/node_modules

# Copy built files from the previous stage
COPY --from=dure-trips-kafka-microservices_builder /app/apps/airline-ticket-management-microservice /apps
COPY --from=dure-trips-kafka-microservices_builder /app/dist/apps/airline-ticket-management-microservice/main.js /apps/dist
# COPY --from=dure-trips-kafka-microservices_builder /app/.env /apps/.env
COPY --from=dure-trips-kafka-microservices_builder /app/node_modules /apps/node_modules


WORKDIR /apps
RUN pwd && ls


EXPOSE 9092
# Specify the command to run your application
CMD ["node", "/apps/dist/main.js"]