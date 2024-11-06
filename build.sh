#!/usr/bin/env bash

rm -rf _site

nix-shell -p bundler --pure --command "
  export JEKYLL_ENV=production
  echo 'Installing bundles'
  bundle install --gemfile=Gemfile --path vendor/cache

  echo 'Building site'
  bundle exec jekyll build
"

nix-shell -p html-minifier --pure --command "
  echo 'Minifying site'
  html-minifier --input-dir _site --output-dir _site --collapse-whitespace --file-ext html
"

nix-shell -p neocities-cli --command "
  echo 'Pushing to Neocities'

  set +x
  export NEOCITIES_API_KEY=$(cat ~/.neocities/blue-pits)
  set -x
  neocities push --prune _site
"
