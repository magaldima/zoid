# Same Origin Iframe

This example demonstrates a problem with rendering a Zoid component inside a same-origin iframe on Safari.

## Start server

```bash
# launches a server on port 1337
npm run demo
```

## Open the demo

Navigate to the [demo](http://localhost:1337/demo/basic/iframe/index.htm).

Each side of the screen will display the same component.
The left side same origin iframe content was injected via `srcdoc`.
The right side same origin iframe content was injected via `contentDocument`.

On Safari v17

- the component will render inside the iframe on the left
- the component will not render inside the iframe on the right

On Chrome

- the component will render inside the iframe on the left
- the component will render inside the iframe on the right
