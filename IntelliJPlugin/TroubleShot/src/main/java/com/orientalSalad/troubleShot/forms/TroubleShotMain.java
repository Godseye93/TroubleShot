package com.orientalSalad.troubleShot.forms;

import javax.swing.*;
import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;
import java.awt.*;
import java.util.HashMap;
import java.util.Map;

public class TroubleShotMain {
    private JPanel panel;
    private JList<String> mainList;
    private JButton cancelButton;
    private JButton shootButton;
    private JButton nextButton;
    private JPanel detailPanel;

    public TroubleShotMain() {

        System.out.println("TroubleShotMain 시작");

        // main 판넬 구성
        panel = new JPanel();

        // trouble 판넬 구성

        // solution 판넬 구성


        // detail에 trouble, solution 배치
        CardLayout cardLayout = new CardLayout();
        JPanel detailPanel = new JPanel(cardLayout);

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

        // main에 list, detail 배치
        panel.setLayout(new BorderLayout());
        panel.add(new JScrollPane(mainList), BorderLayout.WEST);
        panel.add(new JScrollPane(detailPanel), BorderLayout.CENTER);

        System.out.println("TroubleShotMain 끝");
    }

    public JPanel getPanel() {
        return panel;
    }
}
