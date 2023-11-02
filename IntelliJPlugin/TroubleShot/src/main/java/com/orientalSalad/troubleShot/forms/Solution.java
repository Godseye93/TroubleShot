package com.orientalSalad.troubleShot.forms;

import com.intellij.ui.PanelWithButtons;

import javax.swing.*;

public class Solution {
    private JPanel panel;
    private JPanel solutionMain;
    private JTextArea textArea1;
    private JTextArea textArea2;
    private JButton cancleButton;
    private JButton shootButton1;
    private JButton markDown복사Button;


    public Solution() {
        panel = new JPanel();
        panel.add(solutionMain);
    }
    public JPanel getPanel() {
        return panel;
    }
}
