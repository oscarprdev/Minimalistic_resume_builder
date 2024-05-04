.PHONY: Resume builder app

generate:
	@echo Generating types
	cd api_spec && make generate-backend && make generate-frontend

run:
	@echo Run application
	pnpm run dev