package com.orientalSalad.troubleShot.forms;

import javax.swing.*;
import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.util.HashMap;
import java.util.Map;

import static com.orientalSalad.troubleShot.actions.TroubleShotAction.frame;

public class TroubleShotMain {
    private JPanel panel;
    private JList<String> mainList;
    private JButton cancelButton;
    private JButton shootButton;
    private JButton nextButton;
    private JPanel detailPanel;
    private JPanel footPanel;
    private JLabel loginLabel;
    private CardLayout cardLayout;
    private static TroubleShotMain instance;

    public static TroubleShotMain getInstance() {
        if (instance == null) {
            instance = new TroubleShotMain();
        }
        return instance;
    }

    public TroubleShotMain() {

        System.out.println("TroubleShotMain 시작");
        panel = new JPanel();

        // detail에 trouble, solution 배치
        cardLayout = new CardLayout();
        detailPanel = new JPanel(cardLayout);
        Trouble trouble = new Trouble();
        detailPanel.add(trouble.getPanel(), "Write Trouble");
        Solution solution = new Solution();
        detailPanel.add(solution.getPanel(), "Write Solution");
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
            frame.dispose();
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
