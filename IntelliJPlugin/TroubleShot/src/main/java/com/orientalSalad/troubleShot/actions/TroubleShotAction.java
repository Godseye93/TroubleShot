package com.orientalSalad.troubleShot.actions;

import com.intellij.openapi.actionSystem.AnAction;
import com.intellij.openapi.actionSystem.AnActionEvent;
import com.intellij.openapi.actionSystem.CommonDataKeys;
import com.intellij.openapi.editor.Editor;
import org.jetbrains.annotations.NotNull;

import javax.swing.*;

public class TroubleShotAction extends AnAction {
    @Override
    public void actionPerformed(@NotNull AnActionEvent event) {
        System.out.println("머야머야머야");
//        Editor editor = CommonDataKeys.EDITOR.getData(event.getDataContext());
//        if ( editor == null ) {
//            return;
//        }
//
//        String text = editor.getSelectionModel().getSelectedText();
//        if (text == null || text.equals(""))  {
//            return;
//        }

        // 1. 새로운 JFrame 객체 생성
        JFrame frame = new JFrame("Trouble Shot");

        // 2. Swing UI 디자이너에서 디자인한 UI 컴포넌트를 추가
//        JPanel panel = new TroubleShotMain(); // MyUIPanel은 Swing UI 디자이너로 생성한 JPanel 클래스
//        frame.getContentPane().add(panel);
//
//        // 3. 창을 보이게 함
        frame.pack();
        frame.setVisible(true);
        System.out.println("되나?");
    }
}
