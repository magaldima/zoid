# Same Origin Iframe

This example demonstrates a problem with rendering a Zoid component inside a same-origin iframe on Safari.

## Setup the component

```bash
cd demo/component
npm install
npm run build
```

## Start two servers on different ports

```bash
# launches a server on port 1337
npm run demo
# launches a server on port 1338
npm run demo_2
```

## Open the demo

Navigate to the [demo](http://localhost:1337/demo/basic/iframe/index.htm).

On Safari v17, the component will not render inside the iframe.
On Chrome, the component will render inside the iframe.
