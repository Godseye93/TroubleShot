package com.orientalSalad.troubleShot.actions;

import com.intellij.openapi.actionSystem.AnAction;
import com.intellij.openapi.actionSystem.AnActionEvent;
import com.intellij.openapi.editor.impl.EditorComponentImpl;
import com.intellij.openapi.project.Project;
import com.orientalSalad.troubleShot.forms.TroubleShotMain;
import org.jetbrains.annotations.NotNull;

public class ShowEditorAction extends AnAction {

    @Override
    public void actionPerformed(@NotNull AnActionEvent e) {
        Project project = e.getProject();
        if (project != null) {
            TroubleShotMain troubleShotMain = new TroubleShotMain();
//            EditorComponentImpl editorComponent = new EditorComponentImpl(project, troubleShotMain.getPanel());

        }
    }
}
