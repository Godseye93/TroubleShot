import { MyTroubleListProvider, Trouble } from "./MyTroubleListProvider";
import * as vscode from "vscode";

export class MyTroubleListProviderWithoutLogin extends MyTroubleListProvider {
  constructor(private readonly globalState: vscode.Memento) {
    super();
  }

  async getChildren(): Promise<Trouble[]> {
    const troubleListData = this.globalState.get<Trouble[]>("troubleList");

    return troubleListData || [];
  }

  async deleteTroubleShooting(trouble: Trouble) {
    try {
      const troubleList = this.globalState.get<Trouble[]>("troubleList") || [];
      const newTroubleList = troubleList.filter((item) => item.id !== trouble.id);
      await this.globalState.update("troubleList", newTroubleList);
      this.refresh();
      vscode.window.showInformationMessage("Deleted trouble shooting!");
    } catch (error) {
      vscode.window.showErrorMessage("Failed to delete trouble shooting!");
    }
  }
}
