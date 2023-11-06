import {
  VSCodeTextField,
  VSCodeRadioGroup,
  VSCodeRadio,
  VSCodeTextArea,
  VSCodeButton,
  VSCodeDropdown,
  VSCodeOption,
} from "@vscode/webview-ui-toolkit/react";
import { VscCopy } from "react-icons/vsc";
import { BiUpload } from "react-icons/bi";
import { useEffect, useState } from "react";
import { vscode } from "./utilities/vscode";

interface Props {
  sessionId: number;
  defaultSkills: string;
  errMsg?: string;
  defaultCode?: string;
}

const Trouble = ({ sessionId, defaultSkills, errMsg, defaultCode }: Props) => {
  const [articleInfo, setArticleInfo] = useState({
    title: "",
    skill: "",
    code: "",
    errorMsg: "",
    description: "",
  });

  function onChange(e: any) {
    const { name, value } = e.target;
    setArticleInfo((prev) => ({ ...prev, [name]: value }));
  }

  function checkValid() {
    const { title } = articleInfo;
    if (title.trim().length < 2 || title.trim().length > 20) {
      vscode.postMessage({
        command: "showMessage",
        type: "error",
        content: "Title is too short or too long!",
      });
      return false;
    }
    return true;
  }

  function onCreateMarkdown() {
    const { title, skill, code, errorMsg, description } = articleInfo;

    let markdownText = `# ${title}\n\n`;
    markdownText += `## TROUBLE\n\n`;
    markdownText += `---------------------------------------\n\n`;
    markdownText += `### 사용 기술 및 의존성\n\`${skill}\`\n\n`;
    markdownText += `### 문제 코드\n\`\`\`\n${code}\n\`\`\`\n\n`;
    markdownText += `### 콘솔 로그\n\`${errorMsg}\`\n\n`;
    markdownText += `### 문제 설명\n${description}\n\n`;

    return markdownText;
  }

  async function onCopyMarkdown() {
    if (!checkValid()) return;
    try {
      await navigator.clipboard.writeText(onCreateMarkdown());
      vscode.postMessage({
        command: "showMessage",
        type: "info",
        content: "Copied to clipboard!",
      });
    } catch (error) {
      vscode.postMessage({
        command: "showMessage",
        type: "error",
        content: "Failed to copy to clipboard!",
      });
    }
  }

  function onAddTrouble() {
    vscode.postMessage({
      command: "addTrouble",
      articleInfo: {
        title: articleInfo.title,
        createTime: new Date(),
        content: onCreateMarkdown(),
      },
    });
  }

  useEffect(() => {
    setArticleInfo((prev) => ({ ...prev, skill: defaultSkills }));
  }, [defaultSkills]);

  useEffect(() => {
    if (errMsg) {
      setArticleInfo((prev) => ({ ...prev, errorMsg: errMsg.replace(/\n/g, " ") }));
      console.log("errMsg", errMsg);
      console.log("errorMsg", errMsg.replace(/\n/g, " "));
    }
  }, [errMsg]);

  useEffect(() => {
    if (defaultCode) {
      setArticleInfo((prev) => ({ ...prev, code: defaultCode }));
    }
  }, [defaultCode]);

  const { title, skill, code, errorMsg, description } = articleInfo;
  const isLogin = sessionId !== -1;

  return (
    <section className="flex flex-col w-2/3 gap-1 ">
      <VSCodeTextField value={title} onInput={onChange} name="title" className="w-2/3 ">
        제목
      </VSCodeTextField>
      {isLogin && (
        <VSCodeRadioGroup>
          <label slot="label">공개 범위</label>
          <VSCodeRadio>비공개</VSCodeRadio>
          <VSCodeRadio>전체 공개</VSCodeRadio>
        </VSCodeRadioGroup>
      )}

      <VSCodeTextArea value={skill} name="skill" onInput={onChange} rows={4}>
        사용 기술 스택
      </VSCodeTextArea>
      <VSCodeTextArea value={code} onInput={onChange} name="code" rows={7}>
        문제 코드
      </VSCodeTextArea>
      <VSCodeTextArea value={errorMsg} name="errorMsg" onInput={onChange} rows={1}>
        콘솔 로그
      </VSCodeTextArea>
      <VSCodeTextArea value={description} name="description" onInput={onChange}>
        상세 설명
      </VSCodeTextArea>
      <div className="flex items-center justify-center gap-5 mt-5">
        <div onClick={onCopyMarkdown}>
          <VSCodeButton>
            <VscCopy className="mr-3 " />
            마크다운 코드 복사
          </VSCodeButton>
        </div>

        {isLogin ? (
          <VSCodeButton>
            <BiUpload className="mr-3 " />
            TROUBLE SHOT 게시물 업로드
          </VSCodeButton>
        ) : (
          <div onClick={onAddTrouble}>
            <VSCodeButton>
              <BiUpload className="mr-3 " />
              TROUBLE LIST에 추가
            </VSCodeButton>
          </div>
        )}
      </div>
    </section>
  );
};
export default Trouble;
