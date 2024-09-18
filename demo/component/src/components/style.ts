import { CONTEXT } from "@krakenjs/zoid/dist/zoid";

export const CLASS = {
  OUTLET: "outlet",
  VISIBLE: "visible",
  INVISIBLE: "invisible",
  COMPONENT_FRAME: "component-frame",
  PRERENDER_FRAME: "prerender-frame",
};

export function getSandboxStyle(props: { uid: string }): string {
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

export function getContainerStyle(props: { uid: string }): string {
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

        #${uid}.login-overlay-context-${CONTEXT.POPUP} {
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

        #${uid}.login-overlay-context-${CONTEXT.IFRAME} .login-checkout-message, #${uid}.login-overlay-context-${CONTEXT.IFRAME} .login-checkout-continue {
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

        #${uid}.login-overlay-context-${CONTEXT.IFRAME} .login-checkout-iframe-container,
        #${uid}.login-overlay-context-${CONTEXT.IFRAME} .login-checkout-iframe-container > .${CLASS.OUTLET},
        #${uid}.login-overlay-context-${CONTEXT.IFRAME} .login-checkout-iframe-container > .${CLASS.OUTLET} > iframe {
            max-height: 95vh;
            max-width: 95vw;
        }

        #${uid}.login-overlay-context-${CONTEXT.IFRAME} .login-checkout-iframe-container-full,
        #${uid}.login-overlay-context-${CONTEXT.IFRAME} .login-checkout-iframe-container-full > .${CLASS.OUTLET},
        #${uid}.login-overlay-context-${CONTEXT.IFRAME} .login-checkout-iframe-container-full > .${CLASS.OUTLET} > iframe {
            height: 100vh;
            max-width: 100vw;
            width: 100vw;
        }

        @media screen and (max-width: 390px) {
            #${uid}.login-overlay-context-${CONTEXT.IFRAME} .login-checkout-iframe-container,
            #${uid}.login-overlay-context-${CONTEXT.IFRAME} .login-checkout-iframe-container > .${CLASS.OUTLET},
            #${uid}.login-overlay-context-${CONTEXT.IFRAME} .login-checkout-iframe-container > .${CLASS.OUTLET} > iframe {
                max-height: 90vh;
            }
            #${uid}.login-overlay-context-${CONTEXT.IFRAME} .login-checkout-iframe-container-full,
            #${uid}.login-overlay-context-${CONTEXT.IFRAME} .login-checkout-iframe-container-full > .${CLASS.OUTLET},
            #${uid}.login-overlay-context-${CONTEXT.IFRAME} .login-checkout-iframe-container-full > .${CLASS.OUTLET} > iframe {
                height: 100vh;
            }
        }

        #${uid}.login-overlay-context-${CONTEXT.IFRAME} .login-checkout-iframe-container {

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

        #${uid}.login-overlay-context-${CONTEXT.IFRAME} .${CLASS.OUTLET} {

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

        #${uid}.login-overlay-context-${CONTEXT.IFRAME} .${CLASS.OUTLET} > iframe {
            position: absolute;
            top: 0;
            left: 0;
            transition: opacity .4s ease-in-out;
        }

        #${uid}.login-overlay-context-${CONTEXT.IFRAME} .${CLASS.OUTLET} > iframe.${CLASS.COMPONENT_FRAME} {
            z-index: 100;
        }

        #${uid}.login-overlay-context-${CONTEXT.IFRAME} .${CLASS.OUTLET} > iframe.${CLASS.PRERENDER_FRAME} {
            z-index: 200;
        }

        #${uid}.login-overlay-context-${CONTEXT.IFRAME} .${CLASS.OUTLET} > iframe.${CLASS.VISIBLE} {
            opacity: 1;
            z-index: 200;
        }

        #${uid}.login-overlay-context-${CONTEXT.IFRAME} .${CLASS.OUTLET} > iframe.${CLASS.INVISIBLE} {
            opacity: 0;
            z-index: 100;
        }

        @media screen and (max-width: 390px) {

            #${uid}.login-overlay-context-${CONTEXT.IFRAME} .login-checkout-iframe-container,
            #${uid}.login-overlay-context-${CONTEXT.IFRAME} .${CLASS.OUTLET} {
                min-width: 100%;
                max-width: 100%;
            }
        }

        #${uid}.login-overlay-context-${CONTEXT.IFRAME} .${CLASS.OUTLET} iframe {
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
