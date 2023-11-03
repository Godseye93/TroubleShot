import * as vscode from "vscode";
import { TroubleShotPanel } from "./panels/TroubleShotPanel";
import { getSessionId } from "./utilities/getSessionId";
import { NodeDependenciesProvider } from "./TreeDataProvider/NodeDependenciesProvider";
import { getRootPath } from "./utilities/getRootPath";
import { MyTroubleListProviderWithoutLogin } from "./TreeDataProvider/MyTroubleListProviderWithoutLogin";
import { getMarkdownView } from "./panels/getMarkdownView";
import { Trouble } from "./TreeDataProvider/MyTroubleListProvider";
import { spawn } from "child_process";

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

  context.subscriptions.push(
    vscode.workspace.onDidSaveTextDocument((document) => {
      const buildProcess = spawn("npm", ["run", "build", "--", "--logLevel", "error"], {
        cwd: rootPath,
        shell: true,
      });

      buildProcess.on("error", (err) => {
        console.error("Failed to start subprocess.", err);
      });

      let buildErrors = "";
      let allOutput = "";

      buildProcess.stderr.on("data", (data) => {
        buildErrors += data.toString();
      });

      buildProcess.stdout.on("data", (data) => {
        allOutput += data.toString();
      });

      buildProcess.on("close", (code) => {
        if (code !== 0) {
          console.error(`Build failed with code ${code} and errors:\n${buildErrors}`);
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
