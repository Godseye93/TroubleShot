import * as vscode from "vscode";
import { format } from "timeago.js";

export class Trouble extends vscode.TreeItem {
  constructor(
    public readonly title: string,
    public readonly createTime: Date,
    private readonly creator: string,
    public content: string,
    public readonly id: string,
    public contextValue: string
  ) {
    super(title);
    this.tooltip = `Created at ${this.createTime}`;
    this.description = `${format(this.createTime)}, ${this.contextValue}`;
    this.command = {
      command: "view.trouble",
      title: "View trouble shooting",
      arguments: [this.id],
    };
  }
}

export abstract class MyTroubleListProvider implements vscode.TreeDataProvider<Trouble> {
  constructor(readonly globalState: vscode.Memento) {}

  private _onDidChangeTreeData: vscode.EventEmitter<Trouble | undefined | null | void> =
    new vscode.EventEmitter<Trouble | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<Trouble | undefined | null | void> =
    this._onDidChangeTreeData.event;

  updateDesc(): void {
    const troubleList = this.globalState.get<Trouble[]>("troubleList");
    troubleList?.forEach((trouble) => {
      trouble.description = `${format(trouble.createTime)}, ${trouble.contextValue}`;
    });
    this.globalState.update("troubleList", troubleList);
  }

  refresh(): void {
    this.updateDesc();
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: Trouble): vscode.TreeItem {
    return element;
  }

  abstract getChildren(): Thenable<Trouble[]>;
}
