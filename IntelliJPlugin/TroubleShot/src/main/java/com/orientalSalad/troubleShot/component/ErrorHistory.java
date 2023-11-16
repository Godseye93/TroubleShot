package com.orientalSalad.troubleShot.component;

import javax.swing.*;
import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;
import java.awt.*;

import static com.orientalSalad.troubleShot.component.StartPanel.fileUtil;

public class ErrorHistory {
    DefaultListModel<String> listModel;
    private JPanel panel;
    private JList<String> errorList;


    public ErrorHistory() {
        listModel = new DefaultListModel<>();

        errorList.setCellRenderer(new DefaultListCellRenderer() {
            @Override
            public Component getListCellRendererComponent(JList<?> list, Object value, int index,
                                                          boolean isSelected, boolean cellHasFocus) {
                Component renderer = super.getListCellRendererComponent(list, value, index, isSelected, cellHasFocus);
                if (renderer instanceof JLabel) {
                    ((JLabel) renderer).setFont(new Font("Dialog", Font.PLAIN, 12));
                }
                return renderer;
            }
        });

        // errorHistory list에 추가
        String[] fileNames = fileUtil.getFileNameList("error_history");
        if (fileNames == null || fileNames.length == 0) {
            panel.setLayout(new BorderLayout());
            JLabel messageLabel = new JLabel("에러 히스토리가 존재하지 않습니다.");
            messageLabel.setHorizontalAlignment(JLabel.CENTER);
            messageLabel.setVerticalAlignment(JLabel.CENTER);
            panel.setLayout(new GridBagLayout());
            panel.add(messageLabel);
            return;
        }

        for (int i = 0; i < fileNames.length; i++) {
            listModel.addElement(fileNames[i].replace(".txt", ""));
            System.out.println(fileNames[i]);
        }
        errorList.setModel(listModel);

        // list에서 항목 클릭 시
        errorList.addListSelectionListener(new ListSelectionListener() {
            @Override
            public void valueChanged(ListSelectionEvent e) {
//                if (errorList.getSelectedIndex() < listModel.getSize()) {
                    String selectedFileName = errorList.getSelectedValue();
                    if (selectedFileName != null) {
                        String[] troubleInfo = fileUtil.getFileContents(selectedFileName);
                        MainPanel.getInstance().showAutomaticWriteTroublePanel(selectedFileName, troubleInfo);
                        System.out.println("troubleInfo 길이 : " + troubleInfo.length);

                    }
//                }
            }
        });

    }


    public JPanel getPanel() {
        return panel;
    }
}
