#!/bin/bash

cd "$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

npm install babel-preset-es2015 --save-dev
npm install browserify babelify
npm install babel-polyfill
npm install babel-plugin-proxy --save-dev
npm i --save-dev babel-loader babel-preset-react react react-dom -S
npm install marked --save
npm install ajax

echo '{ "presets": ["es2015", "react"] }' > .babelrc

echo ' ./node_modules/browserify/bin/cmd.js app.js  -t babelify --outfile bundle.js' > compile.sh
echo 'node bundle.js' > run.sh

echo 'node_modules/' > .gitignore

chmod +x *.sh

touch app.js
