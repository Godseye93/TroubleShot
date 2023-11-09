package com.orientalSalad.troubleShot.logoutVersion;

import com.orientalSalad.troubleShot.loginVersion.Login;

import javax.swing.*;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

public class LogoutVersionMain {
    private JPanel panel;
    private JList<String> mainList;
    private JPanel detailPanel;
    private JLabel loginLabel;
    private CardLayout cardLayout;
    private static LogoutVersionMain instance;

    public static LogoutVersionMain getInstance() {
        if (instance == null) {
            instance = new LogoutVersionMain();
        }
        return instance;
    }

    public static LogoutVersionMain getNewInstance() {
        instance = new LogoutVersionMain();
        return instance;
    }

    public LogoutVersionMain() {

        System.out.println("LogoutVersionMain 시작");


        // detail에 trouble, solution 배치
        panel = new JPanel();
        cardLayout = new CardLayout();
        detailPanel = new JPanel(cardLayout);
        LogoutVersionWriteTrouble logoutVersionWriteTrouble = new LogoutVersionWriteTrouble();
        detailPanel.add(logoutVersionWriteTrouble.getPanel(), "Write Trouble");
        Login login = new Login();
        detailPanel.add(login.getPanel(), "Login");
        LogoutVersionList logoutVersionList = new LogoutVersionList();
        detailPanel.add(logoutVersionList.getPanel(), "My Trouble Shooting");
        // main에 list, detail, foot 배치
        panel.setLayout(new BorderLayout());
        panel.add(new JScrollPane(mainList), BorderLayout.WEST);
        panel.add(new JScrollPane(detailPanel), BorderLayout.CENTER);

        // 리스트 클릭 시
        mainList.addListSelectionListener(e -> {
            if (!e.getValueIsAdjusting()) {
                String selectedValue = mainList.getSelectedValue();
                cardLayout.show(detailPanel, selectedValue);
                System.out.println("selectedValue : " + selectedValue);
            }
        });

        // 로그인 클릭 시
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

        System.out.println("LogoutVersionMain 끝");

    }

    public JPanel getPanel() {
        return panel;
    }

    public void showWriteSolutionPanel(JPanel newPanel) {
        detailPanel.add(newPanel, "Write Solution");
        cardLayout.show(detailPanel, "Write Solution");
        System.out.println("selectedValue : write Solution");
    }

    public void showMyTroubleShootingsPanel() {
        LogoutVersionList logoutVersionList = new LogoutVersionList();
        detailPanel.add(logoutVersionList.getPanel(), "My Trouble Shooting");
        cardLayout.show(detailPanel, "My Trouble Shooting");
        System.out.println("selectedValue : My Trouble Shooting");
    }
}
