
docker login -u lzz registry.gitlab.com < ~/.ssh/docker-gitlab  --password-stdin
docker build -t registry.gitlab.com/hzsq/project-nest . --build-arg build_mode=dev
docker push registry.gitlab.com/hzsq/project-nest