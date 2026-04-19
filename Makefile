.PHONY: bootstrap up down logs composer npm-build

bootstrap:
	sh scripts/bootstrap-env-docker.sh

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
