#!/bin/bash

IMAGE_NAME="neurify"
DOCKER_USERNAME="damianpumar"

pnpm version patch --no-git-tag-version

VERSION=$(node -p "require('./package.json').version")

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}Building version: ${VERSION}${NC}"

# Build locally
echo -e "${BLUE}Building application locally...${NC}"
pnpm build

if [ $? -ne 0 ]; then
    echo "Local build failed!"
    exit 1
fi

docker login

# Build Docker
echo -e "${BLUE}Building Docker image for linux/amd64...${NC}"
docker buildx build --platform linux/amd64 -t $IMAGE_NAME .

if [ $? -ne 0 ]; then
    echo "Docker build failed!"
    exit 1
fi

# Tag
echo -e "${BLUE}Tagging images...${NC}"
docker tag $IMAGE_NAME $DOCKER_USERNAME/$IMAGE_NAME:latest
docker tag $IMAGE_NAME $DOCKER_USERNAME/$IMAGE_NAME:$VERSION

# Push
echo -e "${BLUE}Pushing to Docker Hub...${NC}"
docker push $DOCKER_USERNAME/$IMAGE_NAME:latest
docker push $DOCKER_USERNAME/$IMAGE_NAME:$VERSION

echo -e "${GREEN}✓ Done! Image published to Docker Hub${NC}"
echo -e "${GREEN}  - latest: $DOCKER_USERNAME/$IMAGE_NAME:latest${NC}"
echo -e "${GREEN}  - v$VERSION: $DOCKER_USERNAME/$IMAGE_NAME:$VERSION${NC}"
