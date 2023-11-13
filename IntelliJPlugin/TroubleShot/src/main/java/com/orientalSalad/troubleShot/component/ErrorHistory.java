package com.orientalSalad.troubleShot.component;

import javax.swing.*;

import static com.orientalSalad.troubleShot.component.MainPanel.fileUtil;

public class ErrorHistory {
    DefaultListModel<String> listModel;
    JList<String> errorList;
    private static ErrorHistory instance;
    private JPanel panel;

    public static ErrorHistory getInstance() {
        if (instance == null) {
            instance = new ErrorHistory();
        }
        return instance;
    }

    public ErrorHistory() {
        // JList와 DefaultListModel 생성
        listModel = new DefaultListModel<>();
        errorList = new JList<>(listModel);
        // todo : list 보여주고, 클릭시 write trouble에 내용 가져가기
        String[] fileNames = fileUtil.getFileNameList("error_history");

    }

    public void addErrorHistory(String[] errorInfo) {

        listModel.addElement(errorInfo[1]);

    }

    public JPanel getPanel() {
        return panel;
    }
}
