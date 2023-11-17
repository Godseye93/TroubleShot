package com.orientalSalad.troubleShot.component;


import com.intellij.openapi.components.ServiceManager;
import com.orientalSalad.troubleShot.component.MainPanel;
import com.orientalSalad.troubleShot.util.LoginManager;
import com.orientalSalad.troubleShot.util.TechStackAutomation;
import net.minidev.json.JSONObject;
import okhttp3.*;

import javax.swing.*;

import java.awt.*;
import java.awt.datatransfer.Clipboard;
import java.awt.datatransfer.StringSelection;
import java.io.IOException;

import static com.orientalSalad.troubleShot.component.StartPanel.fileUtil;
import static com.orientalSalad.troubleShot.endpoint.TroubleShotToolWindow.startPanel;
import static com.orientalSalad.troubleShot.endpoint.TroubleShotToolWindow.toolWindow;


public class WriteTrouble {

    private LoginManager loginManager;
    private TechStackAutomation techStackAutomation;
    private JPanel wrapperPanel;
    private JPanel footPanel;
    private JPanel centerPanel;
    private JButton mdCopyButton;
    private JButton shootButton;
    private JLabel title;
    private JFormattedTextField titleInput;
    private JLabel troubleCode;
    private JTextArea troubleCodeInput;
    private JTextArea consoleLogInput;
    private JLabel consoleLog;
    private JLabel techStack;
    private JLabel description;
    private JTextArea descriptionInput;
    private JTextArea techStackInput;
    private ButtonGroup publicScopeGroup;
    private JRadioButton publicButton;
    private JRadioButton privateButton;
    private JLabel publicScopeLabel;

    public WriteTrouble(String a) {
        this();
        consoleLogInput.setText(a);
    }

    public WriteTrouble() {

//        wrapperPanel = new JPanel();
//        centerPanel = new JPanel();
//        footPanel = new JPanel();
//        techStackInput = new JTextArea();
//        shootButton = new JButton();
//        mdCopyButton = new JButton();

        loginManager = ServiceManager.getService(LoginManager.class);

        techStackAutomation = new TechStackAutomation();

        wrapperPanel.setLayout(new BorderLayout());
        wrapperPanel.add(new JScrollPane(centerPanel), BorderLayout.CENTER);
        wrapperPanel.add(footPanel, BorderLayout.SOUTH);

        if (loginManager.getLoginUserSeq() == null) {
            publicScopeLabel.setVisible(false);
            publicButton.setVisible(false);
            privateButton.setVisible(false);
        }
        else {
            publicScopeGroup = new ButtonGroup();
            publicScopeGroup.add(publicButton);
            publicScopeGroup.add(privateButton);
            publicButton.setActionCommand("public");
            privateButton.setActionCommand("private");
            publicScopeLabel.setVisible(true);
            publicButton.setVisible(true);
            privateButton.setVisible(true);
            publicButton.setSelected(true);
        }

        // 추출된 의존성 텍스트에 자동 입력
        techStackInput.setText(techStackAutomation.extractTechStack());

        // shoot 버튼 클릭 시
        shootButton.addActionListener(e -> {
            // 비로그인
            if (loginManager.getLoginUserSeq() == null) {
                fileUtil.createMDFile(titleInput.getText(), makeMDCode());
                // 초기화
                startPanel.setContent(MainPanel.getNewInstance().getPanel());
                // ToolWindow 숨기기
                toolWindow.hide(null);
            }
            // 로그인
            else {
                postTrouble();
            }

        });

        // markdown copy 버튼 클릭 시
        mdCopyButton.addActionListener(e -> {
            copyMDCode();
        });

    }

    private void postTrouble() {
        System.out.println("[post trouble 요청]");
        String selectedButton = publicScopeGroup.getSelection().getActionCommand();
        String title = titleInput.getText();
        String context = makeMDCode();

        JSONObject writer = new JSONObject();
        writer.put("seq", loginManager.getLoginUserSeq());

        JSONObject troubleShooting = new JSONObject();
        troubleShooting.put("title", title);
        troubleShooting.put("category", null);
        troubleShooting.put("context", context);
        troubleShooting.put("dependency", techStackInput.getText());
        troubleShooting.put("scope", selectedButton.equals("public") ? 0 : 1);
        troubleShooting.put("writer", writer);

        JSONObject requestTroubleShooting = new JSONObject();
        requestTroubleShooting.put("loginSeq", loginManager.getLoginUserSeq());
        requestTroubleShooting.put("type", 1);
        requestTroubleShooting.put("troubleShooting", troubleShooting);
        requestTroubleShooting.put("solved", false);
        requestTroubleShooting.put("tags", null);
        requestTroubleShooting.put("postType", 1);

        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
                .url("http://orientalsalad.kro.kr:8102/trouble-shootings")
                .post(RequestBody.create(MediaType.parse("application/json"), requestTroubleShooting.toString()))
                .build();

        // troubleshooting post 응답
        try (Response response = client.newCall(request).execute()) {
            if (response.isSuccessful()) {
                System.out.println("요청 성공");
                fileUtil.showInEditor(title, context);
                // 초기화
                startPanel.setContent(MainPanel.getNewInstance().getPanel());
                // ToolWindow 숨기기
                toolWindow.hide(null);
            }
            else {
                System.out.println("요청 실패 : " + response.code() + " responsebody:  " + response.body().string());
                // todo: 실패 알림 뜨게 하기
            }
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }
    }



    private void copyMDCode() {

        // markdown으로 생성
        String markdown = makeMDCode();

        // 복사하기
        Clipboard clipboard = Toolkit.getDefaultToolkit().getSystemClipboard();
        StringSelection selection = new StringSelection(markdown.toString());
        clipboard.setContents(selection, null);
    }

    private String makeMDCode() {
        StringBuilder markdown = new StringBuilder();
        markdown.append("\n# ").append(titleInput.getText()).append("\n");
        markdown.append("## TROUBLE").append("\n");
        markdown.append("### 사용 기술 및 의존성").append("\n");
        markdown.append("```\n").append(techStackInput.getText()).append("\n```\n");
        markdown.append("### 문제 코드").append("\n");
        markdown.append("```\n").append(troubleCodeInput.getText()).append("\n```\n");
        markdown.append("### 콘솔 로그").append("\n");
        markdown.append("`").append(consoleLogInput.getText()).append("`\n");
        markdown.append("### 문제 설명").append("\n");
        markdown.append(descriptionInput.getText()).append("\n");
        return markdown.toString();
    }

    public JPanel getPanel() {
        return wrapperPanel;
    }

    public void setAutomaticTrouble(String title, String[] troubleInfo) {
        String errorLog = troubleInfo[0];
        String errorCode = troubleInfo[1];
        String techStack = troubleInfo[2];
        titleInput.setText(title);
        consoleLogInput.setText(errorLog);
        troubleCodeInput.setText(errorCode);
        techStackInput.setText(techStack);
    }

}
