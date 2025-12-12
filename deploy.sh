#!/bin/bash

IMAGE_NAME="neurify"
DOCKER_USERNAME="damianpumar"

pnpm version patch --no-git-tag-version

VERSION=$(node -p "require('./package.json').version")

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}Building version: ${VERSION}${NC}"

# Build locally
echo -e "${BLUE}Building application locally...${NC}"
pnpm build

if [ $? -ne 0 ]; then
    echo -e "${RED}Local build failed!${NC}"
    exit 1
fi

docker login

# Build and Push Docker image directly
echo -e "${BLUE}Building and pushing Docker image for linux/amd64...${NC}"
docker buildx build \
  --platform linux/amd64 \
  --no-cache \
  -t $DOCKER_USERNAME/$IMAGE_NAME:latest \
  -t $DOCKER_USERNAME/$IMAGE_NAME:$VERSION \
  --push \
  .

if [ $? -ne 0 ]; then
    echo -e "${RED}Docker build/push failed!${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Done! Image published to Docker Hub${NC}"
echo -e "${GREEN}  - latest: $DOCKER_USERNAME/$IMAGE_NAME:latest${NC}"
echo -e "${GREEN}  - v$VERSION: $DOCKER_USERNAME/$IMAGE_NAME:$VERSION${NC}"
