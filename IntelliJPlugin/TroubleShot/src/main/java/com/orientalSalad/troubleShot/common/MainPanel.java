package com.orientalSalad.troubleShot.common;

import com.intellij.ide.util.PropertiesComponent;
import com.intellij.openapi.editor.Editor;
import com.intellij.openapi.ui.SimpleToolWindowPanel;
import com.orientalSalad.troubleShot.loginVersion.LoginVersionMain;
import com.orientalSalad.troubleShot.logoutVersion.FileUtil;
import com.orientalSalad.troubleShot.logoutVersion.LogoutVersionMain;
import com.orientalSalad.troubleShot.common.*;

public class MainPanel extends SimpleToolWindowPanel {
    public static FileUtil fileUtil;
    public static TroubleAutomation troubleAutomation;

    public MainPanel(Editor editor) {

        super(true, true);
        System.out.println("windowTool 시작");

        fileUtil = new FileUtil();


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
