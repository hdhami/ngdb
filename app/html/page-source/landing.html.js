/**
 * Html
 * This Html.js file acts as a template that we insert all our generated
 * application code into before sending it to the client as regular HTML.
 * Note we're returning a template string from this function.
 */
const Html = () => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>${'landing'}</title>
    </head>
    <body style="margin:0">
        <div id="root">
            <div>landing</div>
        </div>
    </body>
  </html>
`;

export default Html;
