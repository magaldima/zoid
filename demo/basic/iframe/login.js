MyLoginZoidComponent = zoid.create({
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

  props: {
    prefilledEmail: {
      type: "string",
      required: false,
    },

    onLogin: {
      type: "function",
    },
  },

  prerenderTemplate: ({ doc, props }) => {
    const { nonce } = props;
    return pragmatic
      .node(
        "html",
        null,
        pragmatic.node(
          "body",
          null,
          pragmatic.node("div", { class: "spinner-page", nonce: nonce })
        )
      )
      .render(pragmatic.dom({ doc }));
  },

  containerTemplate: ({
    uid,
    tag,
    context,
    focus,
    close,
    doc,
    frame,
    prerenderFrame,
    event,
    props,
  }) => {
    const { nonce } = props;
    const fullScreen = false;
    const hideCloseButton = false;
    const autoResize = true;
    const content = {};

    function closeCheckout(e) {
      e.preventDefault();
      e.stopPropagation();
      close();
    }

    function focusCheckout(e) {
      e.preventDefault();
      e.stopPropagation();

      if (!belter.supportsPopups()) {
        return;
      }

      if (belter.isIos()) {
        window.alert("Please switch tabs to reactivate the login window");
      } else if (belter.isFirefox()) {
        window.alert(
          'Don\'t see the popup window?\n\nSelect "Window" in your toolbar to find "Pay with your DAF via login"'
        );
      } else {
        focus();
      }
    }

    const setupAnimations = (name) => {
      return (el) => {
        const showContainer = () =>
          belter.animate(el, `show-${name}`, belter.noop);
        const hideContainer = () =>
          belter.animate(el, `hide-${name}`, belter.noop);
        event.on(zoid.EVENT.DISPLAY, showContainer);
        event.on(zoid.EVENT.CLOSE, hideContainer);
      };
    };

    const setupAutoResize = (el) => {
      event.on(zoid.EVENT.RESIZE, ({ width: newWidth, height: newHeight }) => {
        if (typeof newWidth === "number") {
          el.style.width = belter.toCSS(newWidth);
        }

        if (typeof newHeight === "number") {
          el.style.height = belter.toCSS(newHeight);
        }
      });
    };

    const outletOnRender = (el) => {
      setupAnimations("component")(el);
      if (autoResize) {
        setupAutoResize(el);
      }
    };

    let outlet;

    if (frame && prerenderFrame) {
      frame.classList.add("component-frame");
      prerenderFrame.classList.add("prerender-frame");

      prerenderFrame.classList.add("visible");
      frame.classList.add("invisible");

      event.on(zoid.EVENT.RENDERED, () => {
        prerenderFrame.classList.remove("visible");
        prerenderFrame.classList.add("invisible");

        frame.classList.remove("invisible");
        frame.classList.add("visible");

        setTimeout(() => {
          belter.destroyElement(prerenderFrame);
        }, 1);
      });

      outlet = pragmatic.node(
        "div",
        {
          class: "outlet",
          onRender: outletOnRender,
        },
        [
          pragmatic.node("node", { el: frame }),
          pragmatic.node("node", { el: prerenderFrame }),
        ]
      );
    }

    return pragmatic
      .node(
        "div",
        {
          id: uid,
          onRender: setupAnimations("container"),
          class: "login-checkout-sandbox",
        },
        [
          pragmatic.node("style", { nonce: nonce }, getSandboxStyle({ uid })),
          pragmatic.node(
            "iframe",
            {
              srcdoc: "",
              // credentialless: true,
              //referrerpolicy: "unsafe-url",
              //csp: "default-src 'nonce-abc123' 'unsafe-inline'",
              title: "login Checkout Overlay",
              name: `__login_checkout_sandbox_${uid}__`,
              scrolling: "no",
              class: `login-checkout-sandbox-iframe${
                fullScreen ? "-full" : ""
              }`,
              // sandbox: "allow-scripts allow-same-origin allow-forms allow-popups",
              // allow: "cross-origin-isolated",
              // frameborder: "0",
            },
            [
              pragmatic.node("html", null, [
                pragmatic.node("body", null, [
                  pragmatic.node(
                    "div",
                    {
                      id: uid,
                      onClick: focusCheckout,
                      class: `login-overlay-context-${context} login-checkout-overlay`,
                    },
                    [
                      !hideCloseButton &&
                        pragmatic.node("a", {
                          href: "#",
                          class: "login-checkout-close",
                          onClick: closeCheckout,
                          "aria-label": "close",
                          role: "button",
                        }),
                      !fullScreen &&
                        pragmatic.node(
                          "div",
                          { class: "login-checkout-modal" },
                          [
                            content.windowMessage &&
                              pragmatic.node(
                                "div",
                                { class: "login-checkout-message" },
                                content.windowMessage
                              ),
                            content.continueMessage &&
                              pragmatic.node(
                                "div",
                                { class: "login-checkout-continue" },
                                [
                                  pragmatic.node(
                                    "a",
                                    { onClick: focus, href: "#" },
                                    content.continueMessage
                                  ),
                                ]
                              ),
                          ]
                        ),
                      pragmatic.node(
                        "div",
                        {
                          class: fullScreen
                            ? "login-checkout-iframe-container-full"
                            : "login-checkout-iframe-container",
                        },
                        [outlet]
                      ),
                      pragmatic.node(
                        "style",
                        { nonce: nonce },
                        getContainerStyle({ uid })
                      ),
                    ]
                  ),
                ]),
              ]),
            ]
          ),
        ]
      )
      .render(pragmatic.dom({ doc }));
  },

  // The url that will be loaded in the iframe or popup, when someone includes my component on their page

  // url: new URL("login.htm", window.location.href).href,
  url: "http://localhost:1337/demo/basic/iframe/login.htm",
});

function getSandboxStyle(props) {
  const { uid } = props;
  return `
        #${uid}.login-checkout-sandbox {
            display: block;
            position: fixed;
            top: 0;
            left: 0;

            width: 100%;
            height: 100%;
            width: 100vw;
            height: 100vh;
            max-width: 100%;
            max-height: 100%;
            min-width: 100%;
            min-height: 100%;

            z-index: 2147483647;

            animation-duration: 0.3s;
            animation-iteration-count: 1;
            animation-fill-mode: forwards !important;
            opacity: 0;
        }

        #${uid}.login-checkout-sandbox .login-checkout-sandbox-iframe {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        #${uid}.login-checkout-sandbox .login-checkout-sandbox-iframe-full {
            border: 0;
            height: 100%;
            width: 100vw;
        }

        @keyframes show-container {
            from {
                opacity: 0;
            }

            to {
                opacity: 1;
            }
        }

        @keyframes hide-container {
            from {
                opacity: 1;
            }

            50% {
                opacity: 1;
            }

            to {
                opacity: 0;
            }
        }
    `;
}

function getContainerStyle(props) {
  const { uid } = props;
  return `
        #${uid} {
            position: absolute;
            z-index: 2147483647;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            transform: translate3d(0, 0, 0);

            background-color: black;
            background-color: rgba(0, 0, 0, 0.8);
            background: radial-gradient(50% 50%, ellipse closest-corner, rgba(0,0,0,0.6) 1%, rgba(0,0,0,0.8) 100%);

            color: #fff;
        }

        #${uid} a {
            color: #fff;
        }

        #${uid} .login-checkout-close:before,
        #${uid} .login-checkout-close:after {
            background-color: #fff;
        }

        #${uid}.login-overlay-context-${zoid.CONTEXT.POPUP} {
            cursor: pointer;
        }

        #${uid} a {
            text-decoration: none;
        }

        #${uid} .login-checkout-modal {
            font-family: "HelveticaNeue", "HelveticaNeue-Light", "Helvetica Neue Light", helvetica, arial, sans-serif;
            font-size: 14px;
            text-align: center;

            box-sizing: border-box;
            max-width: 350px;
            top: 50%;
            left: 50%;
            position: absolute;
            transform: translateX(-50%) translateY(-50%);
            cursor: pointer;
            text-align: center;
        }

        #${uid}.login-overlay-loading .login-checkout-message, #${uid}.login-overlay-loading .login-checkout-continue {
            display: none;
        }

        #${uid} .login-checkout-modal .login-checkout-logo {
            cursor: pointer;
            margin-bottom: 0px;
            display: inline-block;
        }

        #${uid} .login-checkout-modal .login-checkout-logo img {
            height: 0px;
        }

        #${uid} .login-checkout-modal .login-checkout-logo img.login-checkout-logo-pp {
            margin-right: 0px;
        }

        #${uid} .login-checkout-modal .login-checkout-message {
            font-size: 15px;
            line-height: 1.5;
            padding: 0px 0;
        }

        #${uid}.login-overlay-context-${
    zoid.CONTEXT.IFRAME
  } .login-checkout-message, #${uid}.login-overlay-context-${
    zoid.CONTEXT.IFRAME
  } .login-checkout-continue {
            display: none;
        }

        #${uid} .login-checkout-modal .login-checkout-continue {
            font-size: 15px;
            line-height: 1.35;
            padding: 0px 0;
            font-weight: bold;
        }

        #${uid} .login-checkout-modal .login-checkout-continue a {
            border-bottom: 1px solid white;
        }

        #${uid} .login-checkout-close {
            position: absolute;
            right: 16px;
            top: 16px;
            width: 16px;
            height: 16px;
            opacity: 0.6;
        }

        #${uid}.login-overlay-loading .login-checkout-close {
            display: none;
        }

        #${uid} .login-checkout-close:hover {
            opacity: 1;
        }

        #${uid} .login-checkout-close:before, .login-checkout-close:after {
            position: absolute;
            left: 8px;
            content: ' ';
            height: 16px;
            width: 2px;
        }

        #${uid} .login-checkout-close:before {
            transform: rotate(45deg);
        }

        #${uid} .login-checkout-close:after {
            transform: rotate(-45deg);
        }

        #${uid} .login-checkout-iframe-container {
            display: none;
        }

        #${uid}.login-overlay-context-${
    zoid.CONTEXT.IFRAME
  } .login-checkout-iframe-container,
        #${uid}.login-overlay-context-${
    zoid.CONTEXT.IFRAME
  } .login-checkout-iframe-container > .${"outlet"},
        #${uid}.login-overlay-context-${
    zoid.CONTEXT.IFRAME
  } .login-checkout-iframe-container > .${"outlet"} > iframe {
            max-height: 95vh;
            max-width: 95vw;
        }

        #${uid}.login-overlay-context-${
    zoid.CONTEXT.IFRAME
  } .login-checkout-iframe-container-full,
        #${uid}.login-overlay-context-${
    zoid.CONTEXT.IFRAME
  } .login-checkout-iframe-container-full > .${"outlet"},
        #${uid}.login-overlay-context-${
    zoid.CONTEXT.IFRAME
  } .login-checkout-iframe-container-full > .${"outlet"} > iframe {
            height: 100vh;
            max-width: 100vw;
            width: 100vw;
        }

        @media screen and (max-width: 390px) {
            #${uid}.login-overlay-context-${
    zoid.CONTEXT.IFRAME
  } .login-checkout-iframe-container,
            #${uid}.login-overlay-context-${
    zoid.CONTEXT.IFRAME
  } .login-checkout-iframe-container > .${"outlet"},
            #${uid}.login-overlay-context-${
    zoid.CONTEXT.IFRAME
  } .login-checkout-iframe-container > .${"outlet"} > iframe {
                max-height: 90vh;
            }
            #${uid}.login-overlay-context-${
    zoid.CONTEXT.IFRAME
  } .login-checkout-iframe-container-full,
            #${uid}.login-overlay-context-${
    zoid.CONTEXT.IFRAME
  } .login-checkout-iframe-container-full > .${"outlet"},
            #${uid}.login-overlay-context-${
    zoid.CONTEXT.IFRAME
  } .login-checkout-iframe-container-full > .${"outlet"} > iframe {
                height: 100vh;
            }
        }

        #${uid}.login-overlay-context-${
    zoid.CONTEXT.IFRAME
  } .login-checkout-iframe-container {

            display: block;

            position: absolute;

            top: 50%;
            left: 50%;

            min-width: 390px;

            transform: translate(-50%, -50%);
            transform: translate3d(-50%, -50%, 0);

            border-radius: 10px;
            overflow: hidden;
        }

        #${uid}.login-overlay-context-${zoid.CONTEXT.IFRAME} .${"outlet"} {

            position: relative;

            transition: all 0.3s ease;
            animation-duration: 0.3s;
            animation-fill-mode: forwards !important;

            min-width: 390px;
            max-width: 390px;
            width: 390px;
            height: 535px;

            background-color: white;

            overflow: auto;

            opacity: 0;
            transform: scale3d(.3, .3, .3);

            -webkit-overflow-scrolling: touch;
        }

        #${uid}.login-overlay-context-${
    zoid.CONTEXT.IFRAME
  } .${"outlet"} > iframe {
            position: absolute;
            top: 0;
            left: 0;
            transition: opacity .4s ease-in-out;
        }

        #${uid}.login-overlay-context-${
    zoid.CONTEXT.IFRAME
  } .${"outlet"} > iframe.${"component-frame"} {
            z-index: 100;
        }

        #${uid}.login-overlay-context-${
    zoid.CONTEXT.IFRAME
  } .${"outlet"} > iframe.${"prerender-frame"} {
            z-index: 200;
        }

        #${uid}.login-overlay-context-${
    zoid.CONTEXT.IFRAME
  } .${"outlet"} > iframe.${"visible"} {
            opacity: 1;
            z-index: 200;
        }

        #${uid}.login-overlay-context-${
    zoid.CONTEXT.IFRAME
  } .${"outlet"} > iframe.${"invisible"} {
            opacity: 0;
            z-index: 100;
        }

        @media screen and (max-width: 390px) {

            #${uid}.login-overlay-context-${
    zoid.CONTEXT.IFRAME
  } .login-checkout-iframe-container,
            #${uid}.login-overlay-context-${zoid.CONTEXT.IFRAME} .${"outlet"} {
                min-width: 100%;
                max-width: 100%;
            }
        }

        #${uid}.login-overlay-context-${
    zoid.CONTEXT.IFRAME
  } .${"outlet"} iframe {
            width: 1px;
            min-width: 100%;
            height: 100%;
        }

        @keyframes show-component {
            from {
                opacity: 0;
                transform: scale3d(.3, .3, .3);
            }

            to {
                opacity: 1;
                transform: scale3d(1, 1, 1);
            }
        }

        @keyframes hide-component {
            from {
                opacity: 1;
                transform: scale3d(1, 1, 1);
            }

            to {
                opacity: 0;
                transform: scale3d(.3, .3, .3);
            }
        }
    `;
}
