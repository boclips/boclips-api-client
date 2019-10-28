#!/usr/bin/env bash

set -e

app=source
(
cd ${app}

npm ci
npm run compile
npm run test
)
