/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/react-in-jsx-scope */
/** @jsx node */

import { create, CONTEXT } from "@krakenjs/zoid/dist/zoid";
import { node, dom } from "@krakenjs/jsx-pragmatic/src";
import { Overlay } from "../components/overlay";
import { SpinnerPage } from "../components/spinner";

const MyLoginZoidComponent = create({
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

  // The url that will be loaded in the iframe or popup, when someone includes my component on their page
  url: "http://localhost:1337/demo/basic/iframe/login.htm",

  prerenderTemplate: ({ doc, props }: any) => {
    const { nonce } = props;
    // @ts-ignore
    return (<SpinnerPage nonce={nonce} />).render(dom({ doc }));
  },

  containerTemplate: ({
    context,
    close,
    focus,
    doc,
    event,
    frame,
    prerenderFrame,
    props,
  }: any) => {
    const { nonce } = props;
    const content = {
      windowMessage:
        "Don't see the secure login window? We'll help you re-open it.",
      continueMessage: "Click to continue",
    };
    return (
      (
        // @ts-ignore
        <Overlay
          context={context}
          close={close}
          focus={focus}
          event={event}
          frame={frame}
          prerenderFrame={prerenderFrame}
          content={content}
          autoResize={true}
          nonce={nonce}
          fullScreen={false}
          hideCloseButton={true}
        />
      )
        // @ts-ignore
        .render(dom({ doc }))
    );
  },
});

export default MyLoginZoidComponent;
