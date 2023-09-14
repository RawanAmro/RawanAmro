SHELL := /bin/bash
GIT_SHA = $(shell git describe --tags --always)
GIT_BRANCH = $(shell git symbolic-ref --short -q HEAD)
BRANCH_VALID := $(shell [[ $(shell git symbolic-ref --short -q HEAD) =~ ^((release|feature|support|hotfix|bugfix)\/([a-zA-Z0-9][ A-Za-z0.9_.-]*)|(develop|staging|master))$$ ]] && echo matched)
TAG ?= v0.0.1
TAG_ESC := $(subst /,-,$(TAG))
TAG_ESC := $(subst \,-,$(TAG_ESC))

STRAPI_IMAGE_NAME = strapi_api
STRAPI_REPO_URL = strapi_api/$(STRAPI_IMAGE_NAME)
STRAPI_DOCKER_IMAGE = $(STRAPI_REPO_URL):$(TAG_ESC)

all: image

help:
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

image: ## Build docker images
	docker build -t current -t $(STRAPI_IMAGE_NAME)  -t $(STRAPI_DOCKER_IMAGE)  -t $(STRAPI_REPO_URL):latest .

push:
	docker push $(STRAPI_REPO_URL):latest

dev-run: ## Run app locally in background
	docker-compose -f docker-compose.yml up

dev-run-d: ## Run app locally in background
	docker-compose -f docker-compose.yml up -d

dev-logs: ## Logging
	docker-compose -f docker-compose.yml logs -f --tail=100

dev-down: ## Stops containers and removes containers, networks, volumes, and images created by 'up'
	docker-compose -f docker-compose.yml down

clean: dev-down services-down ## Stops and removes services, containers, and mounted database data
	rm -rf ./devops/compose/strapi_api-data

dev-ssh: ## Launch a Bash terminal within a strapi_api container
	docker-compose -f docker-compose.yml exec strapi_api bash

migrations: ## Creates Migrations
	docker-compose -f docker-compose.yml run strapi_api makemigrations

dev-migrate: ## Do migrations
	docker-compose -f docker-compose.yml run strapi_api migrate

dev-attach: ## Allows you to view container 'strapi_api' ongoing output or to control it interactively, as though the commands were running directly in your terminal.
	docker attach strapi_api
