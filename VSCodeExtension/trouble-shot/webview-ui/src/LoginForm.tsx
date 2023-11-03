import { VSCodeButton, VSCodeTextField } from "@vscode/webview-ui-toolkit/react";
import { BiLogIn } from "react-icons/bi";
import { useState } from "react";

const LoginForm = () => {
  const [loginForm, setLoginForm] = useState({
    id: "",
    password: "",
  });
  function onChange(e: any) {
    setLoginForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  function onLogin() {
    console.log(loginForm);
  }
  return (
    <section className="flex flex-col w-2/3 gap-3 ">
      <VSCodeTextField value={loginForm.id} name="id" onInput={onChange}>
        ID
      </VSCodeTextField>
      <VSCodeTextField
        value={loginForm.password}
        name="password"
        onInput={onChange}
        type="password">
        PASS WORD
      </VSCodeTextField>
      <div onClick={onLogin}>
        <VSCodeButton>
          <BiLogIn className="mr-3 " />
          LOGIN
        </VSCodeButton>
      </div>
    </section>
  );
};
export default LoginForm;
