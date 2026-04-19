.PHONY: bootstrap up down logs composer npm-build

# Клонирование env-docker (логика в Makefile — без отдельного .sh, чтобы не ловить BOM/тире в скриптах).
ENV_DOCKER_REPO ?= https://github.com/bitrix-tools/env-docker.git
ENV_DOCKER_REF ?=

bootstrap:
	@if [ -f docker/env-docker/docker-compose.yml ]; then \
		echo "env-docker уже на месте: docker/env-docker"; \
	elif [ -e docker/env-docker ]; then \
		echo "Каталог docker/env-docker неполный (нет docker-compose.yml) — удаляю и клонирую заново..."; \
		rm -rf docker/env-docker; \
	fi; \
	if [ ! -f docker/env-docker/docker-compose.yml ]; then \
		if [ -n "$(ENV_DOCKER_REF)" ]; then \
			git clone --depth 1 --branch "$(ENV_DOCKER_REF)" "$(ENV_DOCKER_REPO)" docker/env-docker; \
		else \
			git clone --depth 1 "$(ENV_DOCKER_REPO)" docker/env-docker; \
		fi; \
		echo "Готово. Настройте docker/env-docker/.env (docs/02-docker.md)"; \
	fi

up: bootstrap
	docker compose up -d

down:
	docker compose down

logs:
	docker compose logs -f nginx php

composer:
	docker compose exec php composer install -d /opt/www/local/php_interface/legacy

npm-build:
	cd frontend && npm ci && npm run build
