#!/bin/bash

LIB_NAME=static-typescript-translate
ng build $LIB_NAME
rsync -Par --exclude=.git/ --delete dist/$LIB_NAME/ ../$LIB_NAME/
cd ../$LIB_NAME
git add -A
git commit
git push
git rev-parse HEAD
