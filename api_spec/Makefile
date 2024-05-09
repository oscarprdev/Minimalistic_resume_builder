.PHONY: Resume builder api_spec

serve:
	@echo Serving Api spec
	make compile && \
	npx @redocly/cli build-docs compiled.yaml && open redoc-static.html

generate-backend:
	make compile && \
	npx openapi-typescript-codegen \
	--input ./compiled.yaml --output ../backend/src/features/core/domain/types --exportCore false --exportServices false \

generate-frontend: 
	make compile && \
	npx openapi-typescript-codegen \
	--input ./compiled.yaml --output ../frontend/src/types --exportCore false --exportServices false

compile:
	multi-file-swagger -o yaml index.yaml > compiled_tmp1.yaml && \
	multi-file-swagger -o yaml compiled_tmp1.yaml > compiled_tmp2.yaml && \
	multi-file-swagger -o yaml compiled_tmp2.yaml > compiled_tmp3.yaml && \
	multi-file-swagger -o yaml compiled_tmp3.yaml > compiled.yaml && \
	rm compiled_tmp1.yaml compiled_tmp2.yaml compiled_tmp3.yaml && \
	make format

generate:
	make generate-backend && make generate-frontend

format:
	sed -i -E 's/\$ref: components\/\([^ ]*\)\.yaml/\$ref: \#\/components\/\1/; s/_index#//; s#\/\/#\/#; s/\$ref: \(.*\)/$ref: "\1"/' compiled.yaml