import * as vscode from "vscode";
import { TroubleShotPanel } from "./panels/TroubleShotPanel";
import { getLoginStatus } from "./utilities/getLoginStatus";
import { NodeDependenciesProvider } from "./TreeDataProvider/NodeDependenciesProvider";
import { getRootPath } from "./utilities/getRootPath";

export const TROUBLE_SHOOTING_TYPE = {
  TROUBLE: 0 as const,
  SOLUTION: 1 as const,
};

export async function activate(context: vscode.ExtensionContext) {
  const isLogin = await getLoginStatus(context);
  vscode.commands.executeCommand("setContext", "isLogin", isLogin);

  context.subscriptions.push(
    vscode.commands.registerCommand("create.trouble", () => {
      TroubleShotPanel.render(context.extensionUri, isLogin, TROUBLE_SHOOTING_TYPE.TROUBLE);
    })
  );

  const rootPath = getRootPath();
  const nodeDependenciesProvider = new NodeDependenciesProvider(rootPath);
  vscode.window.registerTreeDataProvider("node-dependencies", nodeDependenciesProvider);

  vscode.commands.registerCommand("node.dependencies.refreshEntry", () =>
    nodeDependenciesProvider.refresh()
  );
}
