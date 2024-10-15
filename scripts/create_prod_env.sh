#!/bin/bash

# Specify the content to be written to the .env file
ENV_CONTENT="# PROD\nNEXT_PUBLIC_SANITY_PROJECT_ID=lxeru4rg\nNEXT_PUBLIC_SANITY_DATASET=production\nICC_DB_URL=mongodb+srv://icc-admin:phkQrV7FCuQjNFb5@rca-icc.hvzfa7i.mongodb.net/fantasy_prod?retryWrites=true&w=majority
\nICC_BOT_URL=http://rcaproj.com:3020\nNEXT_PUBLIC_BASE_URL=http://rcaproj.com:4141"

# Check if .env file exists
if [ -f .env ]; then
    # If the file exists, override its contents
    echo -e "$ENV_CONTENT" > .env
    echo "Existing .env file updated."
else
    # If the file doesn't exist, create it and write the content
    echo -e "$ENV_CONTENT" > .env
    echo ".env file created."
fi