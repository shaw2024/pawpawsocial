#!/bin/bash

# Navigate to the server directory and start the server
cd src/server
npm run start &

# Navigate to the client directory and start the client
cd ../client
npm run start

# Wait for both processes to finish
wait