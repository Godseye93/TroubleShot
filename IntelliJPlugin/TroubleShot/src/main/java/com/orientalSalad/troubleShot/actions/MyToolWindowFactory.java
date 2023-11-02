package com.orientalSalad.troubleShot.actions;

import com.intellij.openapi.project.Project;
import com.intellij.openapi.wm.ToolWindow;
import com.intellij.openapi.wm.ToolWindowFactory;
import com.intellij.ui.content.Content;
import com.intellij.ui.content.ContentFactory;
import com.orientalSalad.troubleShot.forms.MyCustomPanel;

public class MyToolWindowFactory implements ToolWindowFactory {
    @Override
    public void createToolWindowContent(Project project, ToolWindow toolWindow) {
        // 사용자 정의 패널을 툴 윈도우에 추가하는 코드
        MyCustomPanel customPanel = new MyCustomPanel(null);
        ContentFactory contentFactory = ContentFactory.SERVICE.getInstance();
        Content content = contentFactory.createContent(customPanel, "", false);
        toolWindow.getContentManager().addContent(content);
    }
}
