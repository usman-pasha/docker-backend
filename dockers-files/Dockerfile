FROM node:alpine
# Metadata as defined in the Open Container Initiative (OCI) label schema
LABEL org.opencontainers.image.title="Testing Demo" 
LABEL org.opencontainers.image.description="Description of your app" 
LABEL org.opencontainers.image.version="1.0"
LABEL org.opencontainers.image.authors="Testing authors"
LABEL org.opencontainers.image.vendor="ASZ Technologies" 
LABEL org.opencontainers.image.licenses="MIT"

# Install nano
# RUN apt-get update && apt-get install -y nano

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Use entrypoint to specify the default command
ENTRYPOINT ["npm", "run", "dev"]

