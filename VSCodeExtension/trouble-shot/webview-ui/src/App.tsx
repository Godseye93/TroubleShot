import "./index.css";
import { vscode } from "./utilities/vscode";
import Trouble from "./Trouble";
import { useEffect, useState } from "react";

export const TROUBLE_SHOOTING_TYPE = {
  TROUBLE: 0 as const,
  SOLUTION: 1 as const,
};
type TroubleShootingType = typeof TROUBLE_SHOOTING_TYPE[keyof typeof TROUBLE_SHOOTING_TYPE];

export interface skill {
  [key: string]: string;
}
interface Message {
  command: string;
  isLogin: boolean;
  troubleShootingType: TroubleShootingType;
  defaultSkills: skill;
}

function App() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [troubleShootingType, setTroubleShootingType] = useState<TroubleShootingType>(
    TROUBLE_SHOOTING_TYPE.TROUBLE
  );
  const [defaultSkills, setDefaultSkills] = useState<any>({});
  useEffect(() => {
    window.addEventListener("message", onHandleMessage);
    return () => {
      window.removeEventListener("message", onHandleMessage);
    };
  }, []);

  useEffect(() => {
    vscode.postMessage({
      command: "getStatus",
    });
  }, []);

  function onHandleMessage(event: MessageEvent<Message>) {
    const message = event.data;
    switch (message.command) {
      case "getStatus":
        setIsLogin(message.isLogin);
        setTroubleShootingType(message.troubleShootingType);
        setDefaultSkills(message.defaultSkills);
        break;
      default:
        break;
    }
  }

  return (
    <main>
      {troubleShootingType === TROUBLE_SHOOTING_TYPE.TROUBLE ? (
        <Trouble isLogin={isLogin} defaultSkills={defaultSkills} />
      ) : troubleShootingType === TROUBLE_SHOOTING_TYPE.SOLUTION ? (
        <div>SOLUTION</div>
      ) : (
        <div>ERROR</div>
      )}
    </main>
  );
}

export default App;
