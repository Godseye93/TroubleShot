import {
  VSCodeTextField,
  VSCodeRadioGroup,
  VSCodeRadio,
  VSCodeTextArea,
  VSCodeButton,
  VSCodeOption,
  VSCodeDropdown,
} from "@vscode/webview-ui-toolkit/react";
import { VscCopy } from "react-icons/vsc";
import { BiUpload } from "react-icons/bi";
import { useState } from "react";
const Trouble = () => {
  const [isTeamOpen, setIsTeamOpen] = useState(false);

  return (
    <section>
      <VSCodeTextField size={30}>제목</VSCodeTextField>

      <VSCodeRadioGroup>
        <label slot="label">공개 범위</label>
        <VSCodeRadio>비공개</VSCodeRadio>
        <VSCodeRadio>전체 공개</VSCodeRadio>
        <VSCodeRadio checked={isTeamOpen}>팀 공개</VSCodeRadio>
        <VSCodeDropdown disabled={false}>
          <VSCodeOption>Option Label #1</VSCodeOption>
          <VSCodeOption>Option Label #2</VSCodeOption>
          <VSCodeOption>Option Label #3</VSCodeOption>
        </VSCodeDropdown>
      </VSCodeRadioGroup>

      <VSCodeTextArea value="기본 값" cols={50} rows={10}>
        사용 기술 스택
      </VSCodeTextArea>
      <VSCodeTextArea value="기본 값" cols={150} rows={10}>
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
          <VscCopy
            style={{
              marginRight: "5px",
            }}
          />
          마크다운 코드 복사
        </VSCodeButton>
        <VSCodeButton>
          <BiUpload
            style={{
              marginRight: "5px",
            }}
          />
          TROUBLE SHOT 게시물 업로드
        </VSCodeButton>
      </div>
    </section>
  );
};
export default Trouble;
