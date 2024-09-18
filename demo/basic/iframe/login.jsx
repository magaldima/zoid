window.MyLoginZoidComponent = zoid.create({
  dimensions: {
    width: "300px",
    height: "150px",
  },

  // The html tag used to render my component

  tag: "my-login-component",

  attributes: {
    iframe: {
      scrolling: "no",
      allow: "clipboard-write",
      sandbox:
        "allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-forms",
    },
  },

  // Define a container template for the component
  containerTemplate({ uid, frame, prerenderFrame, doc, props }) {
    return (
      <div id={uid} class="zoid-container">
        <style>
          {`
            #${uid} {
              display: inline-block;
              min-width: 300px;
              max-width: 100%;
              position: relative;
              transition: all 0.3s ease;
            }

            #${uid} iframe {
              border: none;
              width: 100%;
              height: 100%;
            }
          `}
        </style>

        {frame}
        {prerenderFrame}
      </div>
    );
  },

  // The url that will be loaded in the iframe or popup, when someone includes my component on their page

  //url: new URL("login.htm", window.location.href).href,
  url: "http://localhost:1338/demo/basic/iframe/login.htm",
});
