import * as vscode from "vscode";
import { TroubleShotPanel } from "./panels/TroubleShotPanel";
import { getLoginStatus } from "./utilities/getLoginStatus";
import { NodeDependenciesProvider } from "./TreeDataProvider/NodeDependenciesProvider";
import { getRootPath } from "./utilities/getRootPath";
import { MyTroubleListProviderWithoutLogin } from "./TreeDataProvider/MyTroubleListProviderWithoutLogin";
import { getWebviewContent } from "./panels/getWebviewContent";
import { Trouble } from "./TreeDataProvider/MyTroubleListProvider";

export const TROUBLE_SHOOTING_TYPE = {
  TROUBLE: 0 as const,
  SOLUTION: 1 as const,
};

export async function activate(context: vscode.ExtensionContext) {
  const isLogin = await getLoginStatus(context);
  vscode.commands.executeCommand("setContext", "isLogin", isLogin);

  // trouble webview panel
  context.subscriptions.push(
    vscode.commands.registerCommand("create.trouble", () => {
      TroubleShotPanel.render(
        context.extensionUri,
        isLogin,
        TROUBLE_SHOOTING_TYPE.TROUBLE,
        context.globalState
      );
    })
  );

  // dependencies tree view
  const rootPath = getRootPath();
  const nodeDependenciesProvider = new NodeDependenciesProvider(rootPath);
  context.subscriptions.push(
    vscode.window.registerTreeDataProvider("node-dependencies", nodeDependenciesProvider)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("node.dependencies.refreshEntry", () =>
      nodeDependenciesProvider.refresh()
    )
  );

  // trouble list without login tree view
  const myTroubleListProviderWithoutLogin = new MyTroubleListProviderWithoutLogin(
    context.globalState
  );

  context.subscriptions.push(
    vscode.window.registerTreeDataProvider(
      "my-trouble-list-without-login",
      myTroubleListProviderWithoutLogin
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("delete.trouble", (trouble) => {
      myTroubleListProviderWithoutLogin.deleteTroubleShooting(trouble);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("refresh.trouble", () => {
      myTroubleListProviderWithoutLogin.refresh();
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("view.trouble", (troubleShootId: string) => {
      const troubleList = context.globalState.get<Trouble[]>("troubleList");
      const trouble = troubleList?.find((troubleShoot) => troubleShoot.id === troubleShootId);
      if (!trouble) return;
      const panel = vscode.window.createWebviewPanel(
        "viewTroubleShooting",
        trouble.title,
        vscode.ViewColumn.One,
        {
          enableScripts: true,
        }
      );
      panel.webview.html = getWebviewContent(trouble.content);
    })
  );
}
