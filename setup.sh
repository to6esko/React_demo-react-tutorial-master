#!/bin/bash

cd "$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

npm install

echo '{ "presets": ["es2015", "react"] }' > .babelrc

echo ' ./node_modules/browserify/bin/cmd.js app.js  -t babelify --outfile bundle.js' > compile.sh
echo 'node bundle.js' > run.sh

echo 'node_modules/' > .gitignore

chmod +x *.sh

touch app.js
