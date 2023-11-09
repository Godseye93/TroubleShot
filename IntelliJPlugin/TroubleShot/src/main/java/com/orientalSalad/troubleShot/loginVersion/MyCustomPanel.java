package com.orientalSalad.troubleShot.loginVersion;

import com.intellij.ide.util.PropertiesComponent;
import com.intellij.openapi.editor.Editor;
import com.intellij.openapi.ui.SimpleToolWindowPanel;
import com.orientalSalad.troubleShot.logoutVersion.LogoutVersionMain;

public class MyCustomPanel extends SimpleToolWindowPanel {


    public MyCustomPanel(Editor editor) {

        super(true, true);
        System.out.println("windowTool 시작");

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
