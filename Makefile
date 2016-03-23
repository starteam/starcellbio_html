yapf:
	yapf --recursive --in-place --verify --exclude "*urls*" --exclude "*migrations*" --exclude "*node_modules*" . --exclude "*.git*"

jsfmt:
	find . -type f -name '*.js' -\! -name '*soy*' -\! -wholename '*node_modules*' -\! -wholename '*/js/*' -\! -wholename '*/swipe/*'  -exec node_modules/.bin/jsfmt -w {} \;
