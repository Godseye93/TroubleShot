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
}
