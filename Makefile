install:
	npm link
	npm ci --legacy-peer-deps

run:
	node gendiff-start.js

test:
	npx jest

lint:
	npx eslint .

test-coverage:
	npx jest --coverage --coverageProvider=v8

publish:
	npm publish --dry-run

