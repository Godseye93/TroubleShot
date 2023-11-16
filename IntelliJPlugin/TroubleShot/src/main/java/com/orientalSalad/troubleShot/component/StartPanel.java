package com.orientalSalad.troubleShot.component;

import com.intellij.openapi.components.ServiceManager;
import com.intellij.openapi.editor.Editor;
import com.intellij.openapi.ui.SimpleToolWindowPanel;
import com.orientalSalad.troubleShot.util.LoginManager;
import com.orientalSalad.troubleShot.util.SpringLogWatcher;
import com.orientalSalad.troubleShot.util.FileUtil;
import com.orientalSalad.troubleShot.util.TroubleAutomation;

public class StartPanel extends SimpleToolWindowPanel {
    public static FileUtil fileUtil;
    public static TroubleAutomation troubleAutomation;
    private volatile boolean stopThread = true;

    public StartPanel(Editor editor) {

        super(true, true);
        System.out.println("Main Panel 시작");

        fileUtil = new FileUtil();

        // spring.log 변경 감지용 쓰레드
        SpringLogWatcher springLogWatcher = new SpringLogWatcher();
        Thread thread = new Thread(() -> {
            try {
                while (!stopThread) {  // 쓰레드가 실행되는 동안 플래그 값을 주기적으로 확인
                    springLogWatcher.watch();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
        thread.start();
        System.out.println("thread start");

        // 자동 로그인 돼있는 경우
//        if (PropertiesComponent.getInstance().isValueSet("loginInfo")) {
//            System.out.println("login version");
//            LoginVersionMain loginVersionMain = new LoginVersionMain();
//            setContent(loginVersionMain.getPanel());
//        }
//
//        // 자동 로그인 안돼있는 경우
//        else {
            System.out.println("logout version");
            setContent(MainPanel.getNewInstance().getPanel());
//        }
    }

    public void stopThread() {  // 쓰레드를 중단시키는 메소드
        stopThread = true;
    }
}
