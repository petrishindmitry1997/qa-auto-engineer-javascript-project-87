### Hexlet tests and linter status:
[![Actions Status](https://github.com/petrishindmitry1997/qa-auto-engineer-javascript-project-87/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/petrishindmitry1997/qa-auto-engineer-javascript-project-87/actions)

### Code Climate badge maintainability: 
[![Maintainability](https://api.codeclimate.com/v1/badges/284108ed6a7c3f2a44e4/maintainability)](https://codeclimate.com/github/petrishindmitry1997/qa-auto-engineer-javascript-project-87/maintainability)

### Code Climate test coverage: 
[![Test Coverage](https://api.codeclimate.com/v1/badges/284108ed6a7c3f2a44e4/test_coverage)](https://codeclimate.com/github/petrishindmitry1997/qa-auto-engineer-javascript-project-87/test_coverage)

## Setup

```sh
make install
```


## Interface

```
gendiff -h
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format <type>  output format
  -h, --help           display help for command
```


```
  gendiff filepath1.json filepath2.json

{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```


```
gendiff filepath1.yml filepath2.yml

{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```


```
gendiff --format plain filepath1.json filepath2.json

Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true
```


```
gendiff --format json filepath1.json filepath2.json

# здесь вывод в формате json
# он тут не приводится чтобы не раскрывать внутренние детали реализации
```

