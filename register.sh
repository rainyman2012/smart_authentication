#!/bin/bash

echo "${1}"
#curl -d "{\"username\":\"${1}\", \"password\":\"1234\"}" -H "Content-Type: application/json" -X POST http://localhost:8000/auth/register
curl -d "{\"username\":\"${1}\", \"email\":\"\", \"password\":\"1234\"}" -H "Content-Type: application/json" -X POST http://localhost:8000/auth/register
