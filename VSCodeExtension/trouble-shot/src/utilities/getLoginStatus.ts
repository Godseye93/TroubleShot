import * as vscode from "vscode";

export async function getLoginStatus(context: vscode.ExtensionContext): Promise<boolean> {
  const isLogin = context.globalState.get<boolean>("isLogin", false);
  return isLogin;
}
