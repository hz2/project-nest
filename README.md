
[![docker package](https://github.com/hz2/project-nest/actions/workflows/action-docker.yml/badge.svg)](https://github.com/hz2/project-nest/actions/workflows/action-docker.yml)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/hz2/project-nest) 
![GitHub last commit](https://img.shields.io/github/last-commit/hz2/project-nest) 

## About

a pim system;

- Frontend: [https://github.com/hz2/project-pim](https://github.com/hz2/project-pim)

> next.js / react + mui + typescript

- Backend: [https://github.com/hz2/project-nest](https://github.com/hz2/project-nest)

> nest.js + typeorm + mysql + graphql

## Flow chart

```mermaid
flowchart LR;
    A[github push] --> B[github action] --> C[run docker]
    click B href "https://github.com/hz2/project-nest/pkgs/container/project-nest" _blank
```

[Docker package](https://github.com/hz2/project-nest/pkgs/container/project-nest)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
