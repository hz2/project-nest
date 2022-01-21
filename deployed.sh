
docker login -u lzz registry.gitlab.com < ~/.ssh/docker-gitlab  --password-stdin
docker buildx build --platform linux/arm64,linux/amd64 -t registry.gitlab.com/hzsq/project-nest . --build-arg build_mode=dev --push
# docker push registry.gitlab.com/hzsq/project-nest