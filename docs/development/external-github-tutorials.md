# External GitHub Tutorial Loading

## Problem

BrickCode is statically hosted using GitHub Pages. The PXT tutorial loader requests external GitHub tutorial data from a URL such as:

`/ghtutorial/OWNER/REPOSITORY/TUTORIAL`

Because GitHub Pages does not implement that API endpoint, the request returns HTTP 404.

## Interim solution

BrickCode includes a small compatibility script, `static-files/ghtutorial-redirect.js`, which redirects GET requests for the local `/ghtutorial/` endpoint to Microsoft's hosted tutorial API:

`https://cdn.makecode.com/api/ghtutorial/`

The service returns JSON containing GitHub tutorial Markdown and project information.

All other editor requests remain unchanged. The existing PXT interactive tutorial engine handles tutorial display and navigation.

## External dependency

This implementation requires Microsoft's tutorial API to remain operational and compatible with PXT.

It is an interim solution, not a guarantee of long-term service availability.

## Testing

Test a built-in tutorial, several public GitHub tutorials, ordinary project creation, and GitHub integration. Confirm that external tutorial requests return HTTP 200 from the CDN.

Perform tests in a fresh browser session to avoid confusing cached tutorial content with updated source files.

## Long-term direction

Replace the hosted tutorial API with a browser-side provider that retrieves public GitHub repository files and constructs MakeCode-compatible tutorial data.

The desired architecture is:

BrickCode → Browser-side tutorial provider → GitHub repository

The interactive tutorial engine should not require changes.

## Scope and limitations

The compatibility script redirects XMLHttpRequest-based GitHub tutorial requests. It does not replace other MakeCode cloud APIs and is not a general-purpose proxy.

If the PXT framework changes how it requests tutorials, this compatibility layer may need updating.

A native provider implementation within PXT would be preferable for long-term maintenance.