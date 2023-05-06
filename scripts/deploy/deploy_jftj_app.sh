#!/bin/bash
# ©2023 JFTF
# JFTF-App production RA deployment script
# Prerequisites
# Ubuntu 22.04+
# Version 1.0
# Usage
# ./deploy_jftf_app.sh

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "npm not found. Installing npm..."
    # Install npm
    sudo apt-get update
    sudo apt-get install -y npm
fi

# Install yarn using npm
if ! command -v yarn &> /dev/null
then
    echo "yarn not found. Installing yarn..."
    # Install yarn using npm
    npm install --global yarn
fi

# Change to jftf_app directory
cd ../../jftf_app/ || exit 1

# Install yarn dependencies
yarn install

# Build the project
yarn run build

# Check if the build succeeded
if [ $? -eq 0 ]; then
    echo "Build successful. Starting the app..."

    # Start the app
    yarn run preview
else
    echo "Build failed. Exiting..."
fi
