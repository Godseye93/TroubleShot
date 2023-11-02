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
import { skill } from "./App";

interface Props {
  isLogin: boolean;
  defaultSkills: skill;
}

const Trouble = ({ isLogin, defaultSkills }: Props) => {
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const [articleInfo, setArticleInfo] = useState({
    title: "",
    skill: "",
    code: "",
    console: "",
    description: "",
  });

  function onChange(e: any) {
    const { name, value } = e.target;
    setArticleInfo({
      ...articleInfo,
      [name]: value,
    });
  }

  function checkValid() {
    const { title } = articleInfo;
    if (title.trim().length < 2 || title.trim().length > 20) {
      vscode.postMessage({
        command: "inValidTitle",
      });
      return false;
    }
    return true;
  }

  function onCreateMarkdown() {
    const { title, skill, code, console, description } = articleInfo;

    let markdownText = `# ${title}\n\n`;
    markdownText += `## 사용 기술 및 의존성\n\`${skill}\`\n\n`;
    markdownText += `## 문제 코드\n\`\`\`\n${code}\n\`\`\`\n\n`;
    markdownText += `## 콘솔 로그\n\`${console}\`\n\n`;
    markdownText += `## 상세 설명\n${description}\n\n`;

    return markdownText;
  }

  async function onCopyMarkdown() {
    if (!checkValid()) return;
    try {
      await navigator.clipboard.writeText(onCreateMarkdown());
      vscode.postMessage({
        command: "successCopyMarkdown",
      });
    } catch (error) {
      vscode.postMessage({
        command: "failCopyMarkdown",
      });
    }
  }

  function onAddTrouble() {
    vscode.postMessage({
      command: "addTrouble",
      articleInfo: {
        title: articleInfo.title,
        createTime: new Date(),
        isSolved: false,
        creator: "my",
        content: onCreateMarkdown(),
      },
    });
  }

  useEffect(() => {
    setArticleInfo({
      ...articleInfo,
      skill: JSON.stringify(defaultSkills),
    });
  }, [defaultSkills]);

  const { title, skill, code, console, description } = articleInfo;

  return (
    <section className="flex flex-col gap-1 ">
      <VSCodeTextField value={title} onInput={onChange} name="title" className="w-2/3 ">
        제목
      </VSCodeTextField>
      {isLogin && (
        <VSCodeRadioGroup>
          <VSCodeRadio slot="label">공개 범위</VSCodeRadio>
          <VSCodeRadio>비공개</VSCodeRadio>
          <VSCodeRadio>전체 공개</VSCodeRadio>
          <VSCodeRadio checked={isTeamOpen}>팀 공개</VSCodeRadio>
          <VSCodeDropdown disabled={isTeamOpen}>
            <VSCodeOption>Option Label #1</VSCodeOption>
            <VSCodeOption>Option Label #2</VSCodeOption>
            <VSCodeOption>Option Label #3</VSCodeOption>
          </VSCodeDropdown>
        </VSCodeRadioGroup>
      )}

      <VSCodeTextArea value={skill} name="skill">
        사용 기술 스택
      </VSCodeTextArea>
      <VSCodeTextArea value={code} onInput={onChange} name="code">
        문제 코드
      </VSCodeTextArea>
      <VSCodeTextArea value={console} name="console">
        콘솔 로그
      </VSCodeTextArea>
      <VSCodeTextArea value={description} name="description">
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
