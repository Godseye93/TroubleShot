import * as vscode from "vscode";

export class Trouble extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    private createTime: string,
    private timeAgo: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(label, collapsibleState);
    this.tooltip = `${this.label}, ${this.timeAgo} (${this.createTime})`;
    this.description = this.timeAgo;
  }
}
