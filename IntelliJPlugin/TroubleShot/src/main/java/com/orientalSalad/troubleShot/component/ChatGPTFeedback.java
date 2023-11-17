package com.orientalSalad.troubleShot.component;

import javax.swing.*;

public class ChatGPTFeedback {
    private JEditorPane editor;
    private JPanel panel;

    public ChatGPTFeedback() {
        editor.setContentType("text/html");
    }

    public JPanel getPanel() {
        return panel;
    }

    public void showFeedback(boolean solved, String title, String feedback) {
        StringBuilder sb = new StringBuilder();
        if (solved) {
            sb.append("<h2 style='text-align: center;'><strong>트러블 슈팅 피드백</strong></h2>");
        } else {
            sb.append("<h2 style='text-align: center;'><strong>에러 피드백</strong></h2>");
        }
        sb.append("<h1>").append(title).append("</h1>");
        feedback = feedback.replace("\n", "<br>");
        sb.append(feedback);
        editor.setText(sb.toString());
    }
}
