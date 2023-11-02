package com.orientalSalad.troubleShot.forms;

import com.intellij.openapi.editor.Editor;
import com.intellij.openapi.editor.impl.EditorImpl;
import com.intellij.openapi.ui.SimpleToolWindowPanel;
import com.intellij.openapi.wm.ToolWindowManager;

import javax.swing.*;

public class MyCustomPanel extends SimpleToolWindowPanel {
    public MyCustomPanel(Editor editor) {
        super(true, true);
        TroubleShotMain troubleShotMain = new TroubleShotMain();
        setContent(troubleShotMain.getPanel()); // 여기에 원하는 UI 구성 요소를 추가하세요.
    }

    public void updateEditor(Editor editor) {
        // 패널 내용을 업데이트하는 메서드
        // 필요한 경우 사용자 정의 동작을 구현하세요.
    }
}
