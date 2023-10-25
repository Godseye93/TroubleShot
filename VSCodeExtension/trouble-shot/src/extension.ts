import { commands, ExtensionContext } from "vscode";
import { TroubleShotPanel } from "./panels/TroubleShotPanel";

export function activate(context: ExtensionContext) {
  context.subscriptions.push(
    commands.registerCommand("create.trouble.shooting", () => {
      TroubleShotPanel.render(context.extensionUri);
    })
  );
}
