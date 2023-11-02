import * as marked from "marked";

export function getWebviewContent(markdownContent: string): string {
  const htmlString = marked.parse(markdownContent);

  return /*html*/ `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>

    <div id="content">${htmlString}</div>

    </body>
    </html>
  `;
}
