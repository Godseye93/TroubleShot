package com.orientalSalad.troubleShot.actions;

import com.intellij.openapi.actionSystem.AnAction;
import com.intellij.openapi.actionSystem.AnActionEvent;
import com.intellij.openapi.ui.Messages;

public class MenuAction extends AnAction {

    @Override
    public void actionPerformed(AnActionEvent e) {
        String menu = Messages.showInputDialog("점심 메뉴로 무엇을 먹을까요?", "점심 메뉴 입력", Messages.getQuestionIcon());
        Messages.showMessageDialog(menu, "입력", null);
    }
}
