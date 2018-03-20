# hapi-context-credentials

hapi.js plugin - Include `request.auth.credentials2` in default view context, if user is authenticated.

##Notes
This plugin only supports Hapi version 17 and above. 
If you are using hapijs prior to version 17, please install `request.auth.credential`

##Install

`npm install --save hapi-context-credentials2`

##Background

For pretty much any website that has a login feature, parts of the page will be rendered conditionally based on the current user's state. Perhaps it will display their username in the header and show a logout button for logged-in users.

I usually build my sites out at first without any auth and then add auth at a later stage. If I'm using a common layout, I would later need to add something like the following to the handler of every route.

```js
handler:  function (request, h) => {
    ...
    return h.view('index', {
        credentials: request.auth.credentials
    });
}
```
  
And in my template I might have something like:

    {{#if credentials.firstName}}
        <h1>Welcome back {{credentials.firstName}}!</h1>
    {{else}}
        <h1>Welcome guest!</h1>
    {{/if}}

This module saves the work by ensuring `request.auth.credentials2` is included in every view context on your server, so you don't need to manually include it in your handlers.

##Usage

Just register like any Hapi plugin:

```js
await server.register(require('hapi-context-credentials2'));
```
    
You can then output `credentials` in your views. 

