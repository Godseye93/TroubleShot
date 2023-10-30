import {
  VSCodeButton,
  VSCodeDropdown,
  VSCodeOption,
  VSCodeRadio,
  VSCodeRadioGroup,
  VSCodeTextArea,
  VSCodeTextField,
} from "@vscode/webview-ui-toolkit/react";

import { VscCopy } from "react-icons/vsc";
import { BiUpload } from "react-icons/bi";
import { useEffect, useState } from "react";

interface Props {
  isLogin: boolean;
}

const Trouble = ({ isLogin }: Props) => {
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

  return (
    <section>
      <VSCodeTextField size={30} value={articleInfo.title} onInput={onChange} name="title">
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

      <VSCodeTextArea value="기본 값" cols={50} rows={10}>
        사용 기술 스택
      </VSCodeTextArea>
      <VSCodeTextArea value="기본 값" cols={150} rows={10} onInput={onChange}>
        문제 코드
      </VSCodeTextArea>
      <VSCodeTextArea value="기본 값" cols={150}>
        콘솔 로그
      </VSCodeTextArea>
      <VSCodeTextArea cols={150} rows={5}>
        상세 설명
      </VSCodeTextArea>
      <div id="btn-group">
        <VSCodeButton>
          <VscCopy className=" mr-3" />
          마크다운 코드 복사
        </VSCodeButton>

        <VSCodeButton>
          <BiUpload className=" mr-3" />
          {isLogin ? "TROUBLE SHOT 게시물 업로드" : "TROUBLE LIST에 추가"}
        </VSCodeButton>
      </div>
    </section>
  );
};
export default Trouble;
