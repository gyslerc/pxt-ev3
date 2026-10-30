
(() => {
  const oldPrefix = "/pxt-ev3/ghtutorial/";
  const newPrefix =
    "https://cdn.makecode.com/api/ghtutorial/";

  function redirect(url) {
    const parsed = new URL(url, location.href);

    if (
      parsed.origin !== location.origin ||
      !parsed.pathname.startsWith(oldPrefix)
    ) {
      return null;
    }

    return newPrefix +
      parsed.pathname.slice(oldPrefix.length) +
      parsed.search;
  }

  // Handle requests made using fetch().
  const originalFetch = window.fetch;

  window.fetch = function(input, init) {
    const url = typeof input === "string"
      ? input
      : input?.url;

    const replacement = url && redirect(url);

    if (replacement) {
      console.log("Tutorial fetch redirected:", replacement);

      const updatedInput = input instanceof Request
        ? new Request(replacement, input)
        : replacement;

      return originalFetch.call(this, updatedInput, init);
    }

    return originalFetch.call(this, input, init);
  };

  // Also handle requests made using XMLHttpRequest.
  const originalOpen = XMLHttpRequest.prototype.open;

  XMLHttpRequest.prototype.open = function(
    method, url, ...rest
  ) {
    const replacement =
      String(method).toUpperCase() === "GET"
        ? redirect(url)
        : null;

    if (replacement) {
      console.log("Tutorial XHR redirected:", replacement);
    }

    return originalOpen.call(
      this, method, replacement || url, ...rest
    );
  };

  console.log("Tutorial redirect installed");
})();
