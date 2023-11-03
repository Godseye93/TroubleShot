package com.orientalSalad.troubleShot.actions;

import com.intellij.openapi.actionSystem.AnAction;
import com.intellij.openapi.actionSystem.AnActionEvent;
import com.orientalSalad.troubleShot.forms.Trouble;
import com.orientalSalad.troubleShot.forms.TroubleShotMain;
import org.jetbrains.annotations.NotNull;

import javax.swing.*;

public class TroubleShotAction extends AnAction {

    public static JFrame frame;
    private TroubleShotMain troubleShotMain;

    public static JFrame getFrame() {
        if (frame == null) {
            // 인스턴스가 없는 경우에만 생성
            frame = new JFrame("Trouble Shot");
        }
        return frame;
    }



    @Override
    public void actionPerformed(@NotNull AnActionEvent event) {
        System.out.println("Action 시작");
//        Editor editor = CommonDataKeys.EDITOR.getData(event.getDataContext());
//        if ( editor == null ) {
//            return;
//        }
//
//        String text = editor.getSelectionModel().getSelectedText();
//        if (text == null || text.equals(""))  {
//            return;
//        }

        // 이미 창이 떠있으면 종료
        if (frame != null) {
            return;
        }

        // 1. 새로운 JFrame 객체 생성
        frame = getFrame();

        // 2. Swing UI 디자이너에서 디자인한 UI 컴포넌트를 추가
//        JPanel panel = new TroubleShotMain(); // MyUIPanel은 Swing UI 디자이너로 생성한 JPanel 클래스
//        frame.getContentPane().add(panel);
//
//      3. 창을 보이게 함
//        Trouble trouble = new Trouble();
//        frame.getContentPane().add(trouble.getPanel());

        troubleShotMain = TroubleShotMain.getInstance();
        frame.getContentPane().add(troubleShotMain.getPanel());
        frame.pack(); // 컨테이너의 크기를 조정
        frame.setVisible(true);
        System.out.println("Action 끝");
    }
}
