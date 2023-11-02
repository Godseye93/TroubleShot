package com.orientalSalad.troubleShot.forms;

import javax.swing.*;

public class Login {
    private JPanel panel;
    private JTextField textField1;
    private JPasswordField passwordField1;
    private JPanel loginMain;
    private JButton 로그인Button;

    public Login() {
        panel = new JPanel();
        panel.add(loginMain);
    }

    public JPanel getPanel() {
        return panel;
    }

//    email, pw, 어디에서 로그인했는지(1) -> json으로 만들어서 보내기
//    https://k9d205.p.ssay.io:8101/login/login POST
//    return : memberDTO  -> SEQ값 저장
}
