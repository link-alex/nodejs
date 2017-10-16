## Repository for node.js homework

# Demo of HomeWork 3:

```
npm i

node ./utils/streams.js --action=io --file=initial_content.csv  // reads content to stdout

node ./utils/streams.js --action=transform-file --file=initial_content.csv // reads and transforms to json to stdout

node ./utils/streams.js --action=transform-save-file --file=initial_content.csv // reads and transforms to json to file

node ./utils/streams.js --action=transform // reads stdin and transforms to uppercase in stdout

node ./utils/streams.js -a io -f initial_content.csv // still works

node ./utils/streams.js --help // prints help

node ./utils/streams.js -h // prints help

node ./utils/streams.js -h --action=transform // prints help, ignores command

node ./utils/streams.js // warning and help

node ./utils/streams.js --action=bundle-css --path=teststyles  // concats all css file + 1 remote css file into bundle.css

npm run start -- --action=transform-file --file=initial_content.csv // still works but as module

```
