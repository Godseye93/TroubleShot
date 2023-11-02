import "./index.css";
import { vscode } from "./utilities/vscode";
import Trouble from "./Trouble";
import { useEffect, useState } from "react";
import Solution from "./Solution";
import LoginForm from "./LoginForm";

export const TROUBLE_SHOOTING_TYPE = {
  LOADING: -1 as const,
  TROUBLE: 0 as const,
  SOLUTION: 1 as const,
  LOGIN_FORM: 2 as const,
};

type TroubleShootingType = typeof TROUBLE_SHOOTING_TYPE[keyof typeof TROUBLE_SHOOTING_TYPE];

export interface skill {
  [key: string]: string;
}
interface Message {
  command: string;
  sessionId: number;
  troubleShootingType: TroubleShootingType;
  defaultSkills?: skill;
  troubleId?: string;
}

function App() {
  const [sessionId, setSessionId] = useState<number>(-1);
  const [troubleShootingType, setTroubleShootingType] = useState<TroubleShootingType>(
    TROUBLE_SHOOTING_TYPE.LOADING
  );
  const [defaultSkills, setDefaultSkills] = useState<any>();
  const [troubleId, setTroubleId] = useState<string>();

  useEffect(() => {
    window.addEventListener("message", onHandleInitMessage);
    return () => {
      window.removeEventListener("message", onHandleInitMessage);
    };
  }, []);

  useEffect(() => {
    vscode.postMessage({
      command: "getInitialStatus",
    });
  }, []);

  function onHandleInitMessage(event: MessageEvent<Message>) {
    const message = event.data;
    switch (message.command) {
      case "getInitialStatus":
        setTroubleShootingType(message.troubleShootingType);

        if (message.troubleShootingType === TROUBLE_SHOOTING_TYPE.TROUBLE) {
          setDefaultSkills(message.defaultSkills);
          setSessionId(message.sessionId);
        }
        if (message.troubleShootingType === TROUBLE_SHOOTING_TYPE.SOLUTION) {
          setTroubleId(message.troubleId);
          setSessionId(message.sessionId);
        }

        break;
    }
  }

  return (
    <main className="flex items-center justify-center">
      {troubleShootingType === TROUBLE_SHOOTING_TYPE.TROUBLE ? (
        <Trouble sessionId={sessionId} defaultSkills={JSON.stringify(defaultSkills)} />
      ) : troubleShootingType === TROUBLE_SHOOTING_TYPE.SOLUTION ? (
        <Solution sessionId={sessionId} troubleId={troubleId} />
      ) : troubleShootingType === TROUBLE_SHOOTING_TYPE.LOGIN_FORM ? (
        <LoginForm />
      ) : (
        <div>LOADING</div>
      )}
    </main>
  );
}

export default App;
