#!/bin/bash
SITE="blue-pits"
bundle config jobs 4
bundle install
JEKYLL_ENV=production bundle exec jekyll build
set +x
export NEOCITIES_API_KEY=$(cat ~/.neocities/$SITE)
set -x
neocities push --prune _site

