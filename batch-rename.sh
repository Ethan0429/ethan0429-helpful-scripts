#!/usr/bin/env sh

# remove a substring from every file name in a directory
for f in *$1*;
do
    mv -v -- "$f" "${f//$1/}"
done