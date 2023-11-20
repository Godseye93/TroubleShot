package com.orientalSalad.troubleShot.component;

import javax.swing.*;
import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;
import javax.swing.table.DefaultTableCellRenderer;
import javax.swing.table.DefaultTableModel;
import javax.swing.table.JTableHeader;
import java.awt.*;

import static com.orientalSalad.troubleShot.component.StartPanel.fileUtil;

public class ErrorHistory {
    private JPanel panel;
    private JTable errorTable;
    private DefaultTableModel tableModel;


    public ErrorHistory() {
        panel = new JPanel();
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

        String[] columnNames = {"번호", "에러 히스토리", "시간"};
        tableModel = new DefaultTableModel(columnNames, 0);
        errorTable = new JTable(tableModel);
        JTableHeader header = errorTable.getTableHeader();
        errorTable.getColumnModel().getColumn(0).setPreferredWidth(10);
        errorTable.getColumnModel().getColumn(1).setPreferredWidth(200);
        errorTable.getColumnModel().getColumn(2).setPreferredWidth(100);
        errorTable.setFont(new Font("Dialog", Font.PLAIN, 14));
        DefaultTableCellRenderer centerRenderer = new DefaultTableCellRenderer();
        centerRenderer.setHorizontalAlignment(JLabel.CENTER);
        errorTable.setDefaultRenderer(Object.class, centerRenderer);

        for (int i = 0; i < fileNames.length; i++) {
            Object[] row = new Object[3];
            row[0] = i + 1;
            String title = fileNames[i].replace(".txt", "");
            int length = title.length();
            if (length >= 14) {
                row[1] = title.substring(0, length - 17);
                row[2] = title.substring(length - 17, length - 8).replace(".", "-")
                        + title.substring(length - 8 , length).replace(".", ":");
                tableModel.addRow(row);
                System.out.println(fileNames[i]);
            } else {
                row[1] = title;
                row[2] = "";
                tableModel.addRow(row);
            }
        }

        // table에서 항목 클릭 시
        errorTable.getSelectionModel().addListSelectionListener(new ListSelectionListener() {
            @Override
            public void valueChanged(ListSelectionEvent e) {
                int selectedRowIndex = errorTable.getSelectedRow();
                if (selectedRowIndex != -1) {
                    String selectedFileName =  (String) tableModel.getValueAt(selectedRowIndex, 1)
                            + (String) ((String) tableModel.getValueAt(selectedRowIndex, 2)).replace("-", ".").replace(":", ".");
                    if (selectedFileName != null) {
                        String[] troubleInfo = fileUtil.getFileContents(selectedFileName);
                        MainPanel.getInstance().showAutomaticWriteTroublePanel(selectedFileName, troubleInfo);
                        System.out.println("troubleInfo 길이 : " + troubleInfo.length);
                    }
                }
            }
        });

        panel.setLayout(new BorderLayout());
        JScrollPane scrollPane = new JScrollPane(errorTable);
        panel.add(scrollPane, BorderLayout.CENTER);

    }


    public JPanel getPanel() {
        return panel;
    }
}
