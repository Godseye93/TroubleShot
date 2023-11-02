import * as marked from "marked";
import * as vscode from "vscode";
import { getNonce } from "../utilities/getNonce";

export function getMarkdownView(markdownContent: string, extensionUri: vscode.Uri): string {
  const htmlString = marked.parse(markdownContent);
  const nonce = getNonce();

  return /*html*/ `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
					<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'nonce-${nonce}';">
          <title>Hello World!</title>
        </head>
        <body>
        <div id="content">${htmlString}</div>
        </body>
      </html>
    `;
}
