


# # enable buildx
# docker run --privileged --rm tonistiigi/binfmt --install all
# # login and build
# docker login -u lzz registry.gitlab.com < ~/.ssh/docker-gitlab  --password-stdin
# docker buildx build --platform linux/arm64,linux/amd64 -t registry.gitlab.com/hzsq/project-nest . --build-arg build_mode=prod --push
# # docker push registry.gitlab.com/hzsq/project-nest


reg=r.respok.com/huc/project-nest:latest
docker buildx build --platform linux/amd64,linux/arm64 -t ${reg} . --build-arg build_mode=prod --push