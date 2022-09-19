#!/usr/bin/env sh

for f in prac*; do mv "$f" "${f#$1}"; done