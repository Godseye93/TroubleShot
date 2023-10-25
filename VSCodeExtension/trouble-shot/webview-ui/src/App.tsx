import { vscode } from "./utilities/vscode";
import * as Vscc from "@vscode/webview-ui-toolkit/react";
import "./App.css";

function App() {
  function handleHowdyClick() {
    vscode.postMessage({
      command: "hello",
      text: "Hey there partner! 🤠",
    });
  }

  return (
    <main>
      <section>
        <h1>제목</h1>
        <Vscc.VSCodeTextField />
      </section>
      <Vscc.VSCodeTextArea />
      <Vscc.VSCodeButton onClick={handleHowdyClick}>Copy Mark Down Source</Vscc.VSCodeButton>

      <h1>Hello World!</h1>
      <h1>Hello World!</h1>
    </main>
  );
}

export default App;
