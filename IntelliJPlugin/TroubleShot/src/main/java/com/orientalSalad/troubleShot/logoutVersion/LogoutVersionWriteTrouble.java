package com.orientalSalad.troubleShot.logoutVersion;


import com.orientalSalad.troubleShot.util.AutomaticUtil;
import com.orientalSalad.troubleShot.util.FileUtil;

import javax.swing.*;

import java.awt.*;
import java.awt.datatransfer.Clipboard;
import java.awt.datatransfer.StringSelection;

import static com.orientalSalad.troubleShot.actions.MyToolWindowFactory.customPanel;
import static com.orientalSalad.troubleShot.actions.MyToolWindowFactory.toolWindow;

public class LogoutVersionWriteTrouble {
    private FileUtil fileUtil;
    private AutomaticUtil automaticUtil;
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
    private JTextField techStackInput;
    private JLabel description;
    private JTextArea descriptionInput;

    public LogoutVersionWriteTrouble() {

        fileUtil = new FileUtil();
        automaticUtil = new AutomaticUtil();

        wrapperPanel.setLayout(new BorderLayout());
        wrapperPanel.add(new JScrollPane(centerPanel), BorderLayout.CENTER);
        wrapperPanel.add(footPanel, BorderLayout.SOUTH);

        // 추출된 의존성 텍스트에 자동 입력
        techStackInput.setText(automaticUtil.extractTechStack());
        System.out.println(automaticUtil.extractTechStack());

        // shoot 버튼 클릭 시
        shootButton.addActionListener(e -> {
            System.out.println("shoot");

            fileUtil.createMDFile(titleInput.getText(), makeMDCode());

            // 초기화
            customPanel.setContent(LogoutVersionMain.getNewInstance().getPanel());

            // ToolWindow 숨기기
            toolWindow.hide(null);
        });



        // markdown copy 버튼 클릭 시
        mdCopyButton.addActionListener(e -> {
            copyMDCode();
        });

    }



    private void copyMDCode() {

        // markdown으로 생성
        String markdown = makeMDCode();

        System.out.println(markdown.toString());

        // 복사하기
        Clipboard clipboard = Toolkit.getDefaultToolkit().getSystemClipboard();
        StringSelection selection = new StringSelection(markdown.toString());
        clipboard.setContents(selection, null);

/*
        // mardkdown -> html
        Parser parser = Parser.builder().build();
        Node document = parser.parse(markdown.toString());
        HtmlRenderer renderer = HtmlRenderer.builder().build();
        String html = renderer.render(document);

        System.out.println(html);

        // 창으로 띄우기
        JEditorPane editorPane = new JEditorPane();
        editorPane.setContentType("text/html");
        editorPane.setText(html);
        JDialog dialog = new JDialog();
        dialog.setTitle(titleInput.getText());
        dialog.getContentPane().add(new JScrollPane(editorPane));
        dialog.setSize(500, 800);
        dialog.setVisible(true);

 */
    }

    private String makeMDCode() {
        StringBuilder markdown = new StringBuilder();
        markdown.append("# ").append(titleInput.getText()).append("\n");
        markdown.append("---------------------------------------").append("\n");
        markdown.append("## Trouble").append("\n");
        markdown.append("### 사용 기술 및 의존성").append("\n");
        markdown.append("`").append(techStackInput.getText()).append("`").append("\n");
        markdown.append("### 문제 코드").append("\n");
        markdown.append("```\n").append(troubleCodeInput.getText()).append("\n```").append("\n");
        markdown.append("### 콘솔 로그").append("\n");
        markdown.append("`").append(consoleLogInput.getText()).append("`").append("\n");
        markdown.append("### 문제 설명").append("\n");
        markdown.append(descriptionInput.getText()).append("\n");
        return markdown.toString();
    }

    public JPanel getPanel() {
        return wrapperPanel;
    }

}
