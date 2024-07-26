install:
	npm link
	npm ci --legacy-peer-deps

run:
	node bin/gendiff.js

test:
	npx jest

lint:
	npx eslint .

test-coverage:
	npx jest --coverage --coverageProvider=v8

publish:
	npm publish --dry-run

setup:
	./gradlew wrapper --gradle-version 8.5

clean:
	./gradlew clean

build:
	./gradlew clean build

install:
	./gradlew clean install

run-dist:
	./build/install/java-package/bin/java-package

run:
	./gradlew run

test:
	./gradlew test

report:
	./gradlew jacocoTestReport

lint:
	./gradlew checkstyleMain

check-deps:
	./gradlew dependencyUpdates -Drevision=release


build-run: build run

.PHONY: build

