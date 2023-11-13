package com.orientalSalad.troubleShot.component;

import com.intellij.ide.util.PropertiesComponent;
import com.intellij.openapi.editor.Editor;
import com.intellij.openapi.ui.SimpleToolWindowPanel;
import com.orientalSalad.troubleShot.component.loginVersion.LoginVersionMain;
import com.orientalSalad.troubleShot.component.logoutVersion.LogoutVersionMain;
import com.orientalSalad.troubleShot.endpoint.SpringLogWatcher;
import com.orientalSalad.troubleShot.util.FileUtil;
import com.orientalSalad.troubleShot.util.TroubleAutomation;

public class MainPanel extends SimpleToolWindowPanel {
    public static FileUtil fileUtil;
    public static TroubleAutomation troubleAutomation;

    public MainPanel(Editor editor) {

        super(true, true);
        System.out.println("windowTool 시작");

        fileUtil = new FileUtil();
        SpringLogWatcher springLogWatcher = new SpringLogWatcher();
        new Thread(() -> {
            try {
                springLogWatcher.watch();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }).start();

        // 자동 로그인 돼있는 경우
        if (PropertiesComponent.getInstance().isValueSet("loginInfo")) {
            System.out.println("login version");
            setContent(LoginVersionMain.getInstance().getPanel());
        }

        // 자동 로그인 안돼있는 경우
        else {
            System.out.println("logout version");
            setContent(LogoutVersionMain.getInstance().getPanel());
        }
    }
}
