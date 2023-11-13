package com.orientalSalad.troubleShot.component.logoutVersion;


import com.orientalSalad.troubleShot.util.TechStackAutomation;
import com.orientalSalad.troubleShot.util.TroubleAutomation;

import javax.swing.*;

import java.awt.*;
import java.awt.datatransfer.Clipboard;
import java.awt.datatransfer.StringSelection;

import static com.orientalSalad.troubleShot.component.MainPanel.fileUtil;
import static com.orientalSalad.troubleShot.endpoint.TroubleShotToolWindow.mainPanel;
import static com.orientalSalad.troubleShot.endpoint.TroubleShotToolWindow.toolWindow;


public class LogoutVersionWriteTrouble {

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

    public LogoutVersionWriteTrouble() {

//        wrapperPanel = new JPanel();
//        centerPanel = new JPanel();
//        footPanel = new JPanel();
//        techStackInput = new JTextArea();
//        shootButton = new JButton();
//        mdCopyButton = new JButton();

        techStackAutomation = new TechStackAutomation();

        wrapperPanel.setLayout(new BorderLayout());
        wrapperPanel.add(new JScrollPane(centerPanel), BorderLayout.CENTER);
        wrapperPanel.add(footPanel, BorderLayout.SOUTH);

        // 추출된 의존성 텍스트에 자동 입력
        techStackInput.setText(techStackAutomation.extractTechStack());

        // shoot 버튼 클릭 시
        shootButton.addActionListener(e -> {
            System.out.println("shoot");

            fileUtil.createMDFile(titleInput.getText(), makeMDCode());

            // 초기화
            mainPanel.setContent(LogoutVersionMain.getNewInstance().getPanel());

            // ToolWindow 숨기기
            toolWindow.hide(null);
        });

        // markdown copy 버튼 클릭 시
        mdCopyButton.addActionListener(e -> {
            copyMDCode();
            TroubleAutomation troubleAutomation = new TroubleAutomation();
            troubleAutomation.getTroubleInfo();
        });

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
        markdown.append("# ").append(titleInput.getText()).append("\n");
        markdown.append("---------------------------------------").append("\n");
        markdown.append("## Trouble").append("\n");
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
