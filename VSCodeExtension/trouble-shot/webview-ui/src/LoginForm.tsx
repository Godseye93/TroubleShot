import { VSCodeButton, VSCodeTextField } from "@vscode/webview-ui-toolkit/react";
import { BiLogIn } from "react-icons/bi";

const LoginForm = () => {
  return (
    <section className="flex flex-col w-2/3 gap-3 ">
      <VSCodeTextField>ID</VSCodeTextField>
      <VSCodeTextField>PASS WORD</VSCodeTextField>
      <VSCodeButton>
        <BiLogIn className="mr-3 " />
        LOGIN
      </VSCodeButton>
    </section>
  );
};
export default LoginForm;
