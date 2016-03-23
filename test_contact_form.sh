#!/bin/bash
# Ensures that the contact form works. Provide it the url of the
# contact form, or the server itself, and we'll test the contact form
# works.
set -euf -o pipefail
URL=${1:-}

if [[ -z "$URL" ]]; then
    >&2 echo "usage: $0 URL"
    exit 1
fi

if [[ "$URL" != *"contact"* ]]; then
    # Assuming bare URL (eg: localhost:8000) was passed
    URL="$URL/scb/contact"
fi

curl -v -X POST -d "name=Justin\
&email=abrahms@mit.edu\
&report=This is a test for errors\'
&note=This is my note" "$URL"
