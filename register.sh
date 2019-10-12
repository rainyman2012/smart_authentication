#!/bin/bash

echo "${1} and ${2}"
curl -d "{\"username\":\"${1}\", \"email\":\"ehsan@ehsan.com\", \"password\":\"${2}\"}" -H "Content-Type: application/json" -X POST http://localhost:8000/auth/register
