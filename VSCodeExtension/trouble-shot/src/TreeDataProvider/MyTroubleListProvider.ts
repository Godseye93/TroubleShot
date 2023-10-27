// import * as vscode from "vscode";
// import { Trouble } from "./Trouble";

// export class MyTroubleListProvider implements vscode.TreeDataProvider<Trouble> {
//   constructor(private isLogin: boolean) {}

//   private _onDidChangeTreeData: vscode.EventEmitter<Trouble | undefined | null | void> =
//     new vscode.EventEmitter<Trouble | undefined | null | void>();
//   readonly onDidChangeTreeData: vscode.Event<Trouble | undefined | null | void> =
//     this._onDidChangeTreeData.event;

//   refresh(): void {
//     this._onDidChangeTreeData.fire();
//   }

//   getTreeItem(element: Trouble): vscode.TreeItem {
//     return element;
//   }

//   getChildren(element?: Trouble): Thenable<Trouble[]> {
//     if (!this.isLogin) {
//       vscode.window.showInformationMessage("No dependency in empty workspace");
//       return Promise.resolve([]);
//     }
//   }
// }
