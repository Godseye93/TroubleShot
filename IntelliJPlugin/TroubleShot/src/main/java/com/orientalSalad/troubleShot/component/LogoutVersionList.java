package com.orientalSalad.troubleShot.component;

import javax.swing.*;

import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.orientalSalad.troubleShot.component.StartPanel.fileUtil;

public class LogoutVersionList {
    private JPanel wrapperPanel;
    private JPanel panel;

    public JPanel getPanel() {
        return wrapperPanel;
    }

    public LogoutVersionList() {
        wrapperPanel = new JPanel();

        // 파일 제목들 가져오기
        String[] fileNames = fileUtil.getFileNameList("TroubleShooting_documents");

        if (fileNames == null) {
            JLabel messageLabel = new JLabel("트러블슈팅이 존재하지 않습니다.");
            messageLabel.setHorizontalAlignment(JLabel.CENTER);
            messageLabel.setVerticalAlignment(JLabel.CENTER);
            wrapperPanel.setLayout(new GridBagLayout());
            wrapperPanel.add(messageLabel);
            return;
        }

        // md파일만 추출
        List<String> mdFileNames = extractMdFileNames(fileNames);

        panel = new JPanel();
        panel.setLayout(new BoxLayout(panel, BoxLayout.Y_AXIS));
        for (int i = 0; i < mdFileNames.size(); i++) {
            String fileName = mdFileNames.get(i);
            String type = fileUtil.getFileAttribute(fileName, "type");

//            JPanel itemPanel = new JPanel(new FlowLayout(FlowLayout.LEFT, 5, 5));
            JPanel itemPanel = new JPanel();
            GridBagLayout gridBagLayout = new GridBagLayout();
            GridBagConstraints gridBagConstraints = new GridBagConstraints();
            itemPanel.setLayout(gridBagLayout);
            JLabel label = new JLabel((i + 1) + ".    " + fileName);
            label.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));  // 커서를 포인터로 변경

            label.addMouseListener(new MouseAdapter() {
                @Override
                public void mouseClicked(MouseEvent e) {
                fileUtil.loadAndDisplayFile(fileName);
//                String context = String.join("\n", fileUtil.getFileContents(fileName));
//                MainPanel.getInstance().getGPTFeedback("trouble".equals(type), fileName, context);
                }
            });

            label.setAlignmentY(Component.CENTER_ALIGNMENT);
            gridBagConstraints.gridx = 0;
            gridBagConstraints.gridy = 0;
            gridBagConstraints.fill = GridBagConstraints.HORIZONTAL;
            gridBagConstraints.weightx = 1.0;
            itemPanel.add(label, gridBagConstraints);

            JPanel buttonPanel = new JPanel(new FlowLayout(FlowLayout.RIGHT));
            // type이 trouble일 경우
            if ("trouble".equals(type)) {

                // solution 작성 버튼 추가
                JButton writeSolutionButton = new JButton("Solution 작성");
                writeSolutionButton.addActionListener(e -> {
                    WriteSolution writeSolution = new WriteSolution(fileName);
                    MainPanel.getInstance().showWriteSolutionPanel(writeSolution.getPanel());
                });
                buttonPanel.add(writeSolutionButton);

                // 삭제 버튼 추가
                JButton deleteButton = new JButton("삭제");
                deleteButton.addActionListener(e -> {
                    showDeleteDialog(fileName);
                });
                buttonPanel.add(deleteButton);
            }
            // type이 solution일 경우
            else {
                // 삭제 버튼 추가
                JButton deleteButton = new JButton("삭제");
                deleteButton.addActionListener(e -> {
                    showDeleteDialog(fileName);
                });
                buttonPanel.add(deleteButton);
            }

            buttonPanel.setAlignmentY(Component.CENTER_ALIGNMENT);
            gridBagConstraints.gridx = 1;
            gridBagConstraints.weightx = 0.0;
            itemPanel.add(buttonPanel, gridBagConstraints);
            panel.add(itemPanel);
        }

        wrapperPanel.setLayout(new BorderLayout());
        JScrollPane scrollPane = new JScrollPane(panel);
        scrollPane.setBorder(null);
        wrapperPanel.add(scrollPane, BorderLayout.CENTER);

    }

    private void showDeleteDialog(String fileName) {
        int confirm = JOptionPane.showConfirmDialog(panel, "삭제하시겠습니까?", "삭제 확인", JOptionPane.YES_NO_OPTION);
        if (confirm == JOptionPane.YES_OPTION) {
            // 삭제
            fileUtil.deleteFile(fileName);
            // 초기화
            MainPanel.getInstance().showLogoutVersionMyTroubleShooting();
        } else if (confirm == JOptionPane.NO_OPTION) {
            System.out.println("삭제 취소");
        }
    }

    public List<String> extractMdFileNames(String[] fileNames) {
        String regex = "\\.md$";
        Pattern pattern = Pattern.compile(regex);
        List<String> mdFileNames = new ArrayList<>();

        for (String fileName : fileNames) {
            Matcher matcher = pattern.matcher(fileName);
            if (matcher.find()) {
                mdFileNames.add(fileName);
            }
        }

        return mdFileNames;
    }
}
