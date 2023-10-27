import * as vscode from "vscode";
import { TroubleShotPanel } from "./panels/TroubleShotPanel";
import { getLoginStatus } from "./utilities/getLoginStatus";
import { NodeDependenciesProvider } from "./TreeDataProvider/NodeDependenciesProvider";
import { getRootPath } from "./utilities/getRootPath";

export async function activate(context: vscode.ExtensionContext) {
  const isLogin = await getLoginStatus(context);
  vscode.commands.executeCommand("setContext", "isLogin", isLogin);

  context.subscriptions.push(
    vscode.commands.registerCommand("create.trouble.shooting", () => {
      TroubleShotPanel.render(context.extensionUri);
    })
  );

  const rootPath = getRootPath();
  const nodeDependenciesProvider = new NodeDependenciesProvider(rootPath);
  vscode.window.registerTreeDataProvider("node-dependencies", nodeDependenciesProvider);

  vscode.commands.registerCommand("node.dependencies.refreshEntry", () =>
    nodeDependenciesProvider.refresh()
  );
}
