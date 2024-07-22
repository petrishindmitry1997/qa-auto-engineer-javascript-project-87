install:
	npm link
	npm ci --legacy-peer-deps

run:
	node gendiff.js

test:
	npx jest

lint:
	npx eslint

test-coverage:
	npx jest --coverage --coverageProvider=v8
