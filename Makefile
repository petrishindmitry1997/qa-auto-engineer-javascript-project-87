install:
	npm link

run:
	node gendiff.js
	
test:
	npx jest

lint:
	npx eslint .
