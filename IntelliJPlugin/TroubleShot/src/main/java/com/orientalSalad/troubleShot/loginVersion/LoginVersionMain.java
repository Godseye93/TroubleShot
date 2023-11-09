package com.orientalSalad.troubleShot.loginVersion;

import javax.swing.*;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;


public class LoginVersionMain {
    private JPanel panel;
    private JList<String> mainList;
    private JButton cancelButton;
    private JButton shootButton;
    private JButton nextButton;
    private JPanel detailPanel;
    private JPanel footPanel;
    private JLabel loginLabel;
    private CardLayout cardLayout;
    private static LoginVersionMain instance;

    public static LoginVersionMain getInstance() {
        if (instance == null) {
            instance = new LoginVersionMain();
        }
        return instance;
    }

    public LoginVersionMain() {

        System.out.println("TroubleShotMain 시작");
        panel = new JPanel();

        // detail에 trouble, solution 배치
        cardLayout = new CardLayout();
        detailPanel = new JPanel(cardLayout);
        LoginVersionTrouble loginVersionTrouble = new LoginVersionTrouble();
        detailPanel.add(loginVersionTrouble.getPanel(), "Write Trouble");
        LoginVersionSolution loginVersionSolution = new LoginVersionSolution();
        detailPanel.add(loginVersionSolution.getPanel(), "Write Solution");
        Login login = new Login();
        detailPanel.add(login.getPanel(), "Login");

        // list에 선택한 경우
        mainList.addListSelectionListener(e -> {
            // 선택이 변경된 경우
            if (!e.getValueIsAdjusting()) {
                String selectedValue = mainList.getSelectedValue();
                cardLayout.show(detailPanel, selectedValue);
                System.out.println("selectedValue : " + selectedValue);
            }
        });

        loginLabel.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
        loginLabel.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                if (loginLabel.getText() == "Logout") {

                    loginLabel.setText("Login");
                    // todo : logout 처리
                    System.out.println("logout");

                }
                else {
                    cardLayout.show(detailPanel, "Login");
                    System.out.println("selectedValue : Login");
                }
            }
        });

        // cancle 버튼
        cancelButton.addActionListener(e -> {
//            frame.dispose();
        });

        // main에 list, detail, foot 배치
        panel.setLayout(new BorderLayout());
        panel.add(new JScrollPane(mainList), BorderLayout.WEST);
        panel.add(new JScrollPane(detailPanel), BorderLayout.CENTER);
        panel.add(footPanel, BorderLayout.SOUTH);
        System.out.println("TroubleShotMain 끝");


    }

    public JPanel getPanel() {
        return panel;
    }

    public void showTrouble() {
        cardLayout.show(detailPanel, "Write Trouble");
        System.out.println("selectedValue : write Trouble");
    }

    public void toLogoutLabel() {
        loginLabel.setText("Logout");
    }
}
