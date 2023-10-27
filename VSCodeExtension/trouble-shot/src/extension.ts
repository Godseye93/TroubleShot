import * as vscode from "vscode";
import { TroubleShotPanel } from "./panels/TroubleShotPanel";
import { getLoginStatus } from "./utilities/getLoginStatus";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("check.login", async () => {
      const isLogin = await getLoginStatus(context);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("create.trouble.shooting", () => {
      TroubleShotPanel.render(context.extensionUri);
    })
  );
}
