import * as vscode from "vscode";
import { TroubleShotPanel } from "./panels/TroubleShotPanel";
import { getSessionId } from "./utilities/getSessionId";
import { NodeDependenciesProvider } from "./TreeDataProvider/NodeDependenciesProvider";
import { getRootPath } from "./utilities/getRootPath";
import { MyTroubleListProviderWithoutLogin } from "./TreeDataProvider/MyTroubleListProviderWithoutLogin";
import { getMarkdownView } from "./panels/getMarkdownView";
import { Trouble } from "./TreeDataProvider/MyTroubleListProvider";
import { exec } from "child_process";
import { parsingErrMsg } from "./utilities/parsingErrMsg";
import { ErrHistoryProvider, Err } from "./TreeDataProvider/ErrHistoryProvider";
import { v4 as uuidv4 } from "uuid";

export const TROUBLE_SHOOTING_TYPE = {
  TROUBLE: 0 as const,
  SOLUTION: 1 as const,
  LOGIN_FORM: 2 as const,
};

export async function activate(context: vscode.ExtensionContext) {
  const rootPath = getRootPath();
  const sessionId = await getSessionId(context);
  const isLogin = sessionId !== -1;
  vscode.commands.executeCommand("setContext", "isLogin", isLogin);

  const errHistoryProvider = new ErrHistoryProvider(context.globalState);
  context.subscriptions.push(
    vscode.window.registerTreeDataProvider("error-history", errHistoryProvider)
  );

  context.subscriptions.push(
    vscode.workspace.onDidSaveTextDocument((document) => {
      exec("npm run build", { cwd: rootPath }, (error, stdout, stderr) => {
        if (error) {
          const errMsg = parsingErrMsg(stdout);
          const err = new Err(errMsg.title, new Date(), errMsg.errMsg, uuidv4());
          errHistoryProvider.addErr(err);
        }
      });
    })
  );

  // trouble webview panel
  context.subscriptions.push(
    vscode.commands.registerCommand("create.trouble", () => {
      TroubleShotPanel.render(
        context.extensionUri,
        sessionId,
        TROUBLE_SHOOTING_TYPE.TROUBLE,
        context.globalState
      );
    })
  );

  // trouble webview panel
  context.subscriptions.push(
    vscode.commands.registerCommand("solve.trouble", (trouble) => {
      TroubleShotPanel.render(
        context.extensionUri,
        sessionId,
        TROUBLE_SHOOTING_TYPE.SOLUTION,
        context.globalState,
        trouble.id
      );
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("copy.markdown", (trouble) => {
      try {
        vscode.env.clipboard.writeText(trouble.content);
        vscode.window.showInformationMessage("Copied to clipboard!");
      } catch (error) {
        vscode.window.showErrorMessage("Failed to copy to clipboard!");
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("login.trouble.shot", () => {
      TroubleShotPanel.render(
        context.extensionUri,
        sessionId,
        TROUBLE_SHOOTING_TYPE.LOGIN_FORM,
        context.globalState
      );
    })
  );

  // dependencies tree view
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
      panel.webview.html = getMarkdownView(trouble.content, context.extensionUri);
    })
  );
}
