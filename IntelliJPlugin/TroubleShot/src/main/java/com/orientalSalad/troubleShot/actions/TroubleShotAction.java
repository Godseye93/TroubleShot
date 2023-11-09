//package com.orientalSalad.troubleShot.actions;
//
//import com.intellij.ide.util.PropertiesComponent;
//import com.intellij.openapi.actionSystem.AnAction;
//import com.intellij.openapi.actionSystem.AnActionEvent;
//import com.intellij.openapi.project.Project;
//import com.orientalSalad.troubleShot.loginVersion.LoginVersionMain;
//import com.orientalSalad.troubleShot.logoutVersion.LogoutVersionMain;
//import org.jetbrains.annotations.NotNull;
//
//import javax.swing.*;
//
//public class TroubleShotAction extends AnAction {
//
//    public static JFrame frame;
//    public static Project project;
//
//    public static JFrame getFrame() {
//        if (frame == null) {
//            // 인스턴스가 없는 경우에만 생성
//            frame = new JFrame("Trouble Shot");
//        }
//        return frame;
//    }
//
//
//
//    @Override
//    public void actionPerformed(@NotNull AnActionEvent event) {
//        System.out.println("Action 시작");
////        Editor editor = CommonDataKeys.EDITOR.getData(event.getDataContext());
////        if ( editor == null ) {
////            return;
////        }
////
////        String text = editor.getSelectionModel().getSelectedText();
////        if (text == null || text.equals(""))  {
////            return;
////        }
//
//        // 이미 창이 떠있으면
//        if (frame != null) {
//            frame.setVisible(true);
//            return;
//        }
//
//        // 새로운 JFrame 객체 생성
//        frame = getFrame();
//        project = event.getProject();
//
//        // 자동 로그인 돼있는 경우
//        if (PropertiesComponent.getInstance().isValueSet("loginInfo")) {
//            System.out.println("login version");
//            frame.getContentPane().add(LoginVersionMain.getInstance().getPanel());
//        }
//        // 자동 로그인 안돼있는 경우
//        else {
//            System.out.println("logout version");
//            frame.getContentPane().add(LogoutVersionMain.getInstance().getPanel());
//        }
//
//        frame.pack(); // 컨테이너의 크기를 조정
//        frame.setVisible(true);
//
//        System.out.println("Action 끝");
//    }
//}
