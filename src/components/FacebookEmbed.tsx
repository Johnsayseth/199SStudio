"use client";

import { useEffect } from "react";

type FacebookEmbedProps = {
  href: string;
  width?: number | string;
  showText?: boolean;
};

declare global {
  interface Window {
    FB?: any;
    fbAsyncInit?: () => void;
  }
}

export default function FacebookEmbed({
  href,
  width = 500,
  showText = true,
}: FacebookEmbedProps) {
  useEffect(() => {
    // Ensure fb-root exists
    if (!document.getElementById("fb-root")) {
      const fbRoot = document.createElement("div");
      fbRoot.id = "fb-root";
      document.body.prepend(fbRoot);
    }

    const initFacebookSdk = () => {
      if (window.FB) {
        try {
          window.FB.XFBML.parse();
        } catch (_) {}
        return;
      }

      window.fbAsyncInit = function () {
        try {
          window.FB?.init({
            xfbml: true,
            version: "v18.0",
          });
          window.FB?.XFBML.parse();
        } catch (_) {}
      };

      // Inject SDK script if not present
      if (!document.getElementById("facebook-jssdk")) {
        const js = document.createElement("script");
        js.id = "facebook-jssdk";
        js.async = true;
        js.defer = true;
        js.crossOrigin = "anonymous";
        js.src =
          "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v18.0";
        document.body.appendChild(js);
      } else {
        // If script exists but FB not ready yet, try parse later
        setTimeout(() => {
          try {
            window.FB?.XFBML.parse();
          } catch (_) {}
        }, 500);
      }
    };

    initFacebookSdk();
  }, []);

  return (
    <div
      className="fb-embed-wrapper"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div
        className="fb-post"
        data-href={href}
        data-width={String(width)}
        data-show-text={showText ? "true" : "false"}
      ></div>
    </div>
  );
}
