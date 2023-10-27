import { VSCodePanels, VSCodePanelTab, VSCodePanelView } from "@vscode/webview-ui-toolkit/react";
import "./App.css";
import Solution from "./Solution";
import Trouble from "./Trouble";

function App() {
  return (
    <main>
      <VSCodePanels>
        <VSCodePanelTab id="trouble">TROUBLE</VSCodePanelTab>
        <VSCodePanelTab id="solution">SOLUTION</VSCodePanelTab>
        <VSCodePanelView id="trouble">
          <Trouble />
        </VSCodePanelView>
        <VSCodePanelView id="solution">
          <Solution />
        </VSCodePanelView>
      </VSCodePanels>
    </main>
  );
}

export default App;
