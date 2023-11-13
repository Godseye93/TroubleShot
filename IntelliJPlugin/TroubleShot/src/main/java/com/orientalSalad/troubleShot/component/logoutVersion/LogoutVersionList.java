package com.orientalSalad.troubleShot.component.logoutVersion;

import javax.swing.*;

import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.orientalSalad.troubleShot.component.MainPanel.fileUtil;

public class LogoutVersionList {
    private JPanel wrapperPanel;
    private JScrollPane scrollPane;

    public JPanel getPanel() {
        return wrapperPanel;
    }

    public LogoutVersionList() {
        // 파일 제목들 가져오기
        String[] fileNames = fileUtil.getFileNameList("troubleShooting_documents");
        if (fileNames == null) {
            // todo : 작성한 트러블 슈팅이 존재하지 않습니다. 텍스트로 보여주기
            System.out.println("fileNames null입니다");
            return;
        }

        // md파일만 추출
        List<String> mdFileNames = extractMdFileNames(fileNames);

        // todo : null 처리

        // JPanel을 생성하고 BoxLayout을 설정합니다.
        JPanel panel = new JPanel(new GridLayout(mdFileNames.size(), 1));
//        panel.setLayout(new BoxLayout(panel, BoxLayout.Y_AXIS));

        // 각 항목에 대해 레이블과 버튼을 추가합니다.
        for (int i = 0; i < mdFileNames.size(); i++) {
            String fileName = mdFileNames.get(i);
            String type = fileUtil.getFileAttribute(fileName, "type");

            JPanel itemPanel = new JPanel(new BorderLayout());
            JLabel label = new JLabel((i + 1) + ".    " + fileName);
            label.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));  // 커서를 포인터로 변경
            label.addMouseListener(new MouseAdapter() {
                @Override
                public void mouseClicked(MouseEvent e) {
                    // 레이블 클릭 시 파일 로드 및 표시
                    fileUtil.loadAndDisplayFile(fileName);
                }
            });
            itemPanel.add(label, BorderLayout.CENTER);

            JPanel buttonPanel = new JPanel(new FlowLayout(FlowLayout.RIGHT));
            // type이 trouble일 경우
            if ("trouble".equals(type)) {

                // solution 작성 버튼 추가
                JButton writeSolutionButton = new JButton("Solution 작성");
                writeSolutionButton.addActionListener(e -> {
                    System.out.println("solution 작성하기 버튼 클릭");
                    LogoutVersionWriteSolution logoutVersionWriteSolution = new LogoutVersionWriteSolution(fileName);
                    LogoutVersionMain.getInstance().showWriteSolutionPanel(logoutVersionWriteSolution.getPanel());
                });
                buttonPanel.add(writeSolutionButton);

                // 삭제 버튼 추가
                JButton deleteButton = new JButton("삭제");
                deleteButton.addActionListener(e -> {
                    System.out.println("삭제 버튼 클릭");

                    // 삭제 로직 구현
                    fileUtil.deleteFile(fileName);

                    // 초기화
                    LogoutVersionMain.getInstance().showMyTroubleShootingsPanel();
                });
                buttonPanel.add(deleteButton);


            }
            // type이 solution일 경우
            else {
                // 삭제 버튼 추가
                JButton deleteButton = new JButton("삭제");
                deleteButton.addActionListener(e -> {
                    System.out.println("삭제 버튼 클릭");

                    // 삭제 로직 구현
                    fileUtil.deleteFile(fileName);


                    // 초기화
                    LogoutVersionMain.getInstance().showMyTroubleShootingsPanel();
                });
                buttonPanel.add(deleteButton);
            }

            itemPanel.add(buttonPanel, BorderLayout.EAST);
            panel.add(itemPanel);
        }

        // 생성된 JPanel을 스크롤 패널에 추가합니다.
        scrollPane.setViewportView(panel);
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
