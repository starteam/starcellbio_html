yapf:
	yapf --recursive --in-place --verify --exclude "*urls*" --exclude "*migrations*" --exclude "*node_modules*" . --exclude "*.git*"
