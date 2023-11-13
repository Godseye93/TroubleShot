package com.orientalSalad.troubleShot.component;

import com.intellij.ui.components.JBList;
import com.orientalSalad.troubleShot.component.logoutVersion.LogoutVersionMain;
import com.orientalSalad.troubleShot.component.logoutVersion.LogoutVersionWriteTrouble;

import javax.swing.*;
import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;

import static com.orientalSalad.troubleShot.component.MainPanel.fileUtil;

public class ErrorHistory {
    DefaultListModel<String> listModel;
    private JPanel panel;
    private JList<String> errorList;


    public ErrorHistory() {
        listModel = new DefaultListModel<>();


        // errorHistory list에 추가
        String[] fileNames = fileUtil.getFileNameList("error_history");
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
                        // todo : 선택한 파일의 내용을 가져와서, write troubleShooting에 넘기기
                        String[] troubleInfo = fileUtil.getFileContents(selectedFileName);
                        LogoutVersionMain.getInstance().showAutomaticWriteTroublePanel(selectedFileName, troubleInfo);
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
