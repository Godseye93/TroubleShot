package com.orientalSalad.troubleShot.endpoint;

import com.intellij.openapi.actionSystem.AnAction;
import com.intellij.openapi.actionSystem.AnActionEvent;
import com.intellij.openapi.actionSystem.DefaultActionGroup;
import com.intellij.openapi.project.Project;
import com.intellij.openapi.wm.ToolWindow;
import com.intellij.openapi.wm.ToolWindowFactory;
import com.intellij.ui.content.Content;
import com.intellij.ui.content.ContentFactory;
import com.orientalSalad.troubleShot.component.StartPanel;
import org.jetbrains.annotations.NotNull;

public class TroubleShotToolWindow implements ToolWindowFactory {
    public static Project project;
    public static ToolWindow toolWindow;
    public static StartPanel startPanel;

    @Override
    public void createToolWindowContent(Project project, ToolWindow toolWindow) {
        this.project = project;
        this.toolWindow = toolWindow;

        // 처음 toolWindow를 생성할 때 mainPanel 추가
        addMainPanelToToolWindow();

        // 새로고침 버튼 추가
        DefaultActionGroup actionGroup = new DefaultActionGroup("", false);
        toolWindow.setAdditionalGearActions(actionGroup);
        actionGroup.add(new AnAction("TroubleShot Refresh") {
            @Override
            public void actionPerformed(@NotNull AnActionEvent e) {
                // 새로고침 버튼을 눌렀을 때 mainPanel 다시 추가
                addMainPanelToToolWindow();
            }
        });
    }

    public static void addMainPanelToToolWindow() {
        try {
            if (startPanel != null) {
                System.out.println("thread stop");
                startPanel.stopThread();
            }
            startPanel = new StartPanel(null);
            ContentFactory contentFactory = ContentFactory.SERVICE.getInstance();
            Content newContent = contentFactory.createContent(startPanel, "", false);

            toolWindow.getContentManager().removeAllContents(true);  // 기존에 있던 Content를 모두 제거

            toolWindow.getContentManager().addContent(newContent);   // 새로운 Content 추가

        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }
}
