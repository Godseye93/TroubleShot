package com.orientalSalad.troubleShot.forms;

import javax.swing.*;
import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;
import java.util.HashMap;
import java.util.Map;

public class TroubleShotMain {
    private JList mainList;
    private JButton cancelButton;
    private JButton shootButton;
    private JButton nextButton;
    private Object detailPanel;

    private TroubleShooting troubleShooting;

    private Map<String, Object> inputDataMap;
    public TroubleShotMain() {
        mainList.addListSelectionListener(new ListSelectionListener() {
            @Override
            public void valueChanged(ListSelectionEvent e) {
                if (!e.getValueIsAdjusting()) {
                    Object selectedValue = mainList.getSelectedValue();
                    updatedContent(selectedValue);
                }
            }
        });

        inputDataMap = new HashMap<>(); // 입력 데이터를 저장할 맵
        detailPanel = new TroubleShooting();
        inputDataMap.put("troubleShooting", detailPanel);
    }

    private void updatedContent(Object selectedValue) {
        if (selectedValue != null) {
            Object selectedPanel = inputDataMap.get(selectedValue);
            if (selectedPanel != null) {
                detailPanel = selectedPanel;
            }
        }
    }
}
