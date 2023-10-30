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

    private Map<String, JPanel> inputDataMap;
    public TroubleShotMain() {

        System.out.println("로그 시작: TroubleShotMain");
        panel = new JPanel();
        Trouble trouble = new Trouble();
        Solution solution = new Solution();

        // 리스트 구성
        panel.setLayout(new BorderLayout());
        panel.add(new JScrollPane(mainList), BorderLayout.WEST);

        // 디테일 구성
        panel.add(new JScrollPane(trouble.getPanel()), BorderLayout.CENTER);

        // 입력 데이터 저장
        inputDataMap = new HashMap<>();
        inputDataMap.put("Write Trouble", trouble.getPanel());
        inputDataMap.put("Write Solution", solution.getPanel());

        mainList.addListSelectionListener(new ListSelectionListener() {
            @Override
            public void valueChanged(ListSelectionEvent e) {
                if (!e.getValueIsAdjusting()) {
                    String selectedValue = mainList.getSelectedValue();
                    System.out.println("selectedValue : " + selectedValue);
                    updatedContent(selectedValue);
                }
            }
        });

        System.out.println("로그 끝");
    }

    private void updatedContent(String selectedValue) {
        if (selectedValue != null) {
            System.out.println("selectedValue" + selectedValue);
            JPanel selectedPanel = inputDataMap.get(selectedValue);
            if (selectedPanel != null) {
                detailPanel = selectedPanel;
            }
        }
    }

    public JPanel getPanel() {
        return panel;
    }
}
