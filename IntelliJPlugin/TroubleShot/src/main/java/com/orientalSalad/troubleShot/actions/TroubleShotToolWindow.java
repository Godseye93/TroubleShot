package com.orientalSalad.troubleShot.actions;

import com.intellij.openapi.project.Project;
import com.intellij.openapi.wm.ToolWindow;
import com.intellij.openapi.wm.ToolWindowFactory;
import com.intellij.ui.content.Content;
import com.intellij.ui.content.ContentFactory;
import com.orientalSalad.troubleShot.forms.TroubleShotMain;
import org.jetbrains.annotations.NotNull;

import javax.swing.*;

public class TroubleShotToolWindow implements ToolWindowFactory {
    @Override
    public void createToolWindowContent(@NotNull Project project, @NotNull ToolWindow toolWindow) {
        // Create and add content to the tool window
//        TroubleShotToolWindow panel = new TroubleShotToolWindow();
//        ContentFactory contentFactory = ContentFactory.SERVICE.getInstance();
//        JFrame frame = new JFrame("Trouble Shot");
//        TroubleShotMain troubleShotMain = new TroubleShotMain();
//        frame.getContentPane().add(troubleShotMain.getPanel());
//        Content content = contentFactory.createContent(frame, "", false);
//        toolWindow.getContentManager().addContent(content);
    }
}