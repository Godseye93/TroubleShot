package com.orientalSalad.troubleShot.endpoint;

import com.intellij.openapi.project.Project;
import com.intellij.openapi.wm.ToolWindow;
import com.intellij.openapi.wm.ToolWindowFactory;
import com.intellij.ui.content.Content;
import com.intellij.ui.content.ContentFactory;
import com.orientalSalad.troubleShot.component.MainPanel;

public class TroubleShotToolWindow implements ToolWindowFactory {
    public static Project project;
    public static ToolWindow toolWindow;
    public static MainPanel mainPanel;

    @Override
    public void createToolWindowContent(Project project, ToolWindow toolWindow) {
        this.project = project;
        this.toolWindow = toolWindow;
        // 사용자 정의 패널을 툴 윈도우에 추가하는 코드
        try {
            mainPanel = new MainPanel(null);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        ContentFactory contentFactory = ContentFactory.SERVICE.getInstance();
        Content content = contentFactory.createContent(mainPanel, "", false);
        toolWindow.getContentManager().addContent(content);
    }



}
