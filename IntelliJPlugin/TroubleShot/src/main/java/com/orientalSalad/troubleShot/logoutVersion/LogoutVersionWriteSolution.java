package com.orientalSalad.troubleShot.logoutVersion;

import javax.swing.*;
import java.awt.*;
import java.awt.datatransfer.Clipboard;
import java.awt.datatransfer.StringSelection;

import static com.orientalSalad.troubleShot.common.MainPanel.fileUtil;
import static com.orientalSalad.troubleShot.endpoint.TroubleShotToolWindow.mainPanel;
import static com.orientalSalad.troubleShot.endpoint.TroubleShotToolWindow.toolWindow;


public class LogoutVersionWriteSolution {
    public String mdFileName;
    private JTextArea solvedCodeInput;
    private JTextArea descriptionInput;
    private JButton shootSolutionButton;
    private JButton copyMDButton;
    private JPanel wrapperPanel;

    public LogoutVersionWriteSolution(String mdFileName) {
        this();
        this.mdFileName = mdFileName;
    }

    public LogoutVersionWriteSolution(){
        // markdown copy 버튼 클릭 시
        copyMDButton.addActionListener(e -> {
            copyMDCode();
        });

        // solution 달기 버튼 클릭 시
        shootSolutionButton.addActionListener(e -> {
            System.out.println("solution 달기 버튼 클릭");
            // md파일에 solution 추가
            fileUtil.createSolutionMD(mdFileName, makeMDCode());
            // 파일 보여주기
            fileUtil.loadAndDisplayFile(mdFileName);

            // 초기화
            mainPanel.setContent(LogoutVersionMain.getNewInstance().getPanel());

            // ToolWindow 숨기기
            toolWindow.hide(null);
        });
    }

    public JPanel getPanel() {
        return wrapperPanel;
    }

    private void copyMDCode() {
        // markdown으로 생성
        String markdown = makeMDCode();

        System.out.println(markdown.toString());

        // 복사하기
        Clipboard clipboard = Toolkit.getDefaultToolkit().getSystemClipboard();
        StringSelection selection = new StringSelection(markdown.toString());
        clipboard.setContents(selection, null);
    }


    private String makeMDCode() {
        StringBuilder markdown = new StringBuilder();
        markdown.append("## SOLUTION").append("\n");
        markdown.append("---------------------------------------").append("\n");
        markdown.append("### 해결 코드").append("\n");
        markdown.append("```\n").append(solvedCodeInput.getText()).append("\n```").append("\n");
        markdown.append("### 해결 설명").append("\n");
        markdown.append(descriptionInput.getText()).append("\n");
        return markdown.toString();
    }
}
