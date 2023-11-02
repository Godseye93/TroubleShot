import * as vscode from "vscode";
import { format } from "timeago.js";

export class Trouble extends vscode.TreeItem {
  constructor(
    public readonly title: string,
    private createTime: Date,
    private isSolved: boolean,
    private creator: string,
    public content: string,
    readonly id: string
  ) {
    super(title);
    this.tooltip = `${this.title}, ${format(this.createTime)} (${this.createTime})`;
    this.description = format(this.createTime);
    this.command = {
      command: "view.trouble",
      title: "View trouble shooting",
      arguments: [this.id],
    };
  }
}

export abstract class MyTroubleListProvider implements vscode.TreeDataProvider<Trouble> {
  private _onDidChangeTreeData: vscode.EventEmitter<Trouble | undefined | null | void> =
    new vscode.EventEmitter<Trouble | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<Trouble | undefined | null | void> =
    this._onDidChangeTreeData.event;

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: Trouble): vscode.TreeItem {
    return element;
  }

  abstract getChildren(): Thenable<Trouble[]>;
}
