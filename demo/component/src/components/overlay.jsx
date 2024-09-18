/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/no-unknown-property */
/** @jsx node */
/* eslint max-lines: off, react/jsx-max-depth: off */

import {
  isIos,
  isFirefox,
  animate,
  noop,
  destroyElement,
  uniqueID,
  supportsPopups,
  toCSS,
} from "@krakenjs/belter";
import { EVENT } from "@krakenjs/zoid/dist/zoid";
import { node } from "@krakenjs/jsx-pragmatic/src";

import { getContainerStyle, getSandboxStyle, CLASS } from "./style";

export function Overlay({
  context,
  close,
  focus,
  event,
  frame,
  prerenderFrame,
  content = {},
  autoResize,
  hideCloseButton,
  nonce,
  fullScreen = false,
}) {
  const uid = `login-overlay-${uniqueID()}`;

  function closeCheckout(e) {
    e.preventDefault();
    e.stopPropagation();
    close();
  }

  function focusCheckout(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!supportsPopups()) {
      return;
    }

    if (isIos()) {
      // eslint-disable-next-line no-alert
      window.alert("Please switch tabs to reactivate the login window");
    } else if (isFirefox()) {
      // eslint-disable-next-line no-alert
      window.alert(
        'Don\'t see the popup window?\n\nSelect "Window" in your toolbar to find "Pay with your DAF via login"'
      );
    } else {
      focus();
    }
  }

  const setupAnimations = (name) => {
    return (el) => {
      const showContainer = () => animate(el, `show-${name}`, noop);
      const hideContainer = () => animate(el, `hide-${name}`, noop);
      event.on(EVENT.DISPLAY, showContainer);
      event.on(EVENT.CLOSE, hideContainer);
    };
  };

  const setupAutoResize = (el) => {
    event.on(EVENT.RESIZE, ({ width: newWidth, height: newHeight }) => {
      if (typeof newWidth === "number") {
        el.style.width = toCSS(newWidth);
      }

      if (typeof newHeight === "number") {
        el.style.height = toCSS(newHeight);
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
    frame.classList.add(CLASS.COMPONENT_FRAME);
    prerenderFrame.classList.add(CLASS.PRERENDER_FRAME);

    prerenderFrame.classList.add(CLASS.VISIBLE);
    frame.classList.add(CLASS.INVISIBLE);

    event.on(EVENT.RENDERED, () => {
      prerenderFrame.classList.remove(CLASS.VISIBLE);
      prerenderFrame.classList.add(CLASS.INVISIBLE);

      frame.classList.remove(CLASS.INVISIBLE);
      frame.classList.add(CLASS.VISIBLE);

      setTimeout(() => {
        destroyElement(prerenderFrame);
      }, 1);
    });

    outlet = (
      // @ts-ignore
      <div class={CLASS.OUTLET} onRender={outletOnRender}>
        <node el={frame} />
        <node el={prerenderFrame} />
      </div>
    );
  }

  return (
    // @ts-ignore
    <div
      id={uid}
      onRender={setupAnimations("container")}
      class="login-checkout-sandbox"
    >
      <style nonce={nonce}>{getSandboxStyle({ uid })}</style>
      <iframe
        title="login Checkout Overlay"
        name={`__login_checkout_sandbox_${uid}__`}
        scrolling="no"
        class={`login-checkout-sandbox-iframe${fullScreen ? "-full" : ""}`}
        allow="clipboard-write"
      >
        <html>
          <body>
            <div
              id={uid}
              onClick={focusCheckout}
              class={`login-overlay-context-${context} login-checkout-overlay`}
            >
              {!hideCloseButton && (
                <a
                  href="#"
                  class="login-checkout-close"
                  onClick={closeCheckout}
                  aria-label="close"
                  role="button"
                />
              )}
              {!fullScreen && (
                <div class="login-checkout-modal">
                  {content.windowMessage && (
                    <div class="login-checkout-message">
                      {content.windowMessage}
                    </div>
                  )}
                  {content.continueMessage && (
                    <div class="login-checkout-continue">
                      <a onClick={focus} href="#">
                        {content.continueMessage}
                      </a>
                    </div>
                  )}
                </div>
              )}
              <div
                class={
                  fullScreen
                    ? "login-checkout-iframe-container-full"
                    : "login-checkout-iframe-container"
                }
              >
                {outlet}
              </div>

              <style nonce={nonce}>{getContainerStyle({ uid })}</style>
            </div>
          </body>
        </html>
      </iframe>
    </div>
  );
}
