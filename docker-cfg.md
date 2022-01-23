docker run --name some-nest -it -p 8880:80 -d registry.gitlab.com/hzsq/project-nest



update

```
docker system prune -f
reg=registry.gitlab.com/hzsq/project-nest
docker rm -f some-nest
docker pull ${reg}
docker run --name some-nest --network="host" -d ${reg}

```

