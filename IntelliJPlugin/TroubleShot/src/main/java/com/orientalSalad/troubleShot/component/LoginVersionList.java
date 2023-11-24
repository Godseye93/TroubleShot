package com.orientalSalad.troubleShot.component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.intellij.openapi.components.ServiceManager;

import com.orientalSalad.troubleShot.dto.ListResponseDTO;
import com.orientalSalad.troubleShot.dto.TroubleShootingDTO;

import com.orientalSalad.troubleShot.util.LoginManager;

import okhttp3.*;

import javax.swing.*;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.io.IOException;

import java.util.List;

import static com.orientalSalad.troubleShot.component.StartPanel.fileUtil;

public class LoginVersionList {
    private LoginManager loginManager;
    private JPanel wrapperPanel;
    JPanel panel;

    public LoginVersionList() {
        wrapperPanel = new JPanel();
        loginManager = ServiceManager.getService(LoginManager.class);

        List<TroubleShootingDTO> troubleShootingList = getTroubleShootingList();

        if (troubleShootingList == null || troubleShootingList.size() == 0) {
            JLabel messageLabel = new JLabel("트러블슈팅이 존재하지 않습니다.");
            messageLabel.setHorizontalAlignment(JLabel.CENTER);
            messageLabel.setVerticalAlignment(JLabel.CENTER);
            wrapperPanel.setLayout(new GridBagLayout());
            wrapperPanel.add(messageLabel);
            return;
        }

        panel = new JPanel();
        panel.setLayout(new BoxLayout(panel, BoxLayout.Y_AXIS));
        for (int i = 0; i < troubleShootingList.size(); i++) {
            TroubleShootingDTO trouble = troubleShootingList.get(i);
            System.out.println(trouble.getWriter() + " " + trouble.getSeq() + " " + trouble.getTitle() + "  " + trouble.isSolved());

            JPanel itemPanel = new JPanel();
            GridBagLayout gridBagLayout = new GridBagLayout();
            GridBagConstraints gridBagConstraints = new GridBagConstraints();
            itemPanel.setLayout(gridBagLayout);
            JLabel label = new JLabel((i + 1) + ".    " + trouble.getTitle());
            label.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));

            label.addMouseListener(new MouseAdapter() {
                @Override
                public void mouseClicked(MouseEvent e) {
                fileUtil.showInEditor(trouble.getTitle(), trouble.getContext());
                MainPanel.getInstance().getGPTFeedback(trouble.isSolved(), trouble.getTitle(), trouble.getContext());
                }
            });

            label.setAlignmentY(Component.CENTER_ALIGNMENT);
            gridBagConstraints.gridx = 0;
            gridBagConstraints.gridy = 0;
            gridBagConstraints.fill = GridBagConstraints.HORIZONTAL;
            gridBagConstraints.weightx = 1.0;
            itemPanel.add(label, gridBagConstraints);

            JPanel buttonPanel = new JPanel(new FlowLayout(FlowLayout.RIGHT));
            // solved하지 않을 경우
            if (!trouble.isSolved()) {

                // solution 작성 버튼
                JButton writeSolutionButton = new JButton("Solution 작성");
                writeSolutionButton.addActionListener(e -> {
                    WriteSolution writeSolution = new WriteSolution(trouble);
                    MainPanel.getInstance().showWriteSolutionPanel(writeSolution.getPanel());
                });
                buttonPanel.add(writeSolutionButton);

                // 삭제 버튼
                JButton deleteButton = new JButton("삭제");
                deleteButton.addActionListener(e -> {
                    showDeleteDialog(trouble);
                });
                buttonPanel.add(deleteButton);
            }
            // solved한 경우
            else {
                // 삭제 버튼 추가
                JButton deleteButton = new JButton("삭제");
                deleteButton.addActionListener(e -> {
                    showDeleteDialog(trouble);
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

    private void showDeleteDialog(TroubleShootingDTO trouble) {
        int confirm = JOptionPane.showConfirmDialog(panel, "삭제하시겠습니까?", "삭제 확인", JOptionPane.YES_NO_OPTION);
        if (confirm == JOptionPane.YES_OPTION) {
            // 삭제
            deleteTrouble(trouble);
            // 초기화
            MainPanel.getInstance().showLoginVersionMyTroubleShooting();
        } else if (confirm == JOptionPane.NO_OPTION) {
            // '아니오'를 선택한 경우, 메시지 출력
            System.out.println("삭제 취소");

        }

    }


    private void deleteTrouble(TroubleShootingDTO trouble) {
        System.out.println("[troubleshooting 삭제 요청]");

        OkHttpClient client = new OkHttpClient();
//        HttpUrl.Builder urlBuilder = HttpUrl.parse("http://orientalsalad.kro.kr:8102/trouble-shootings/" + trouble.getSeq()).newBuilder();
        HttpUrl.Builder urlBuilder = HttpUrl.parse("https://orientalsalad.kro.kr/api/troubleshooting/trouble-shootings/" + trouble.getSeq()).newBuilder();
        urlBuilder.addQueryParameter("loginSeq", String.valueOf(loginManager.getLoginUserSeq()));
        urlBuilder.addQueryParameter("type", String.valueOf(1));
        String urlWithParameters = urlBuilder.build().toString();
        Request request = new Request.Builder()
                .url(urlWithParameters)
                .delete()
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (response.isSuccessful()) {
                System.out.println("요청 성공");
            } else {
                System.out.println("요청 실패 : " + response.code() + " responsebody:  " + response.body().string());
                // todo: 실패 알림 뜨게 하기
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private List getTroubleShootingList() {
        System.out.println("[troubleList 요청]");

        OkHttpClient client = new OkHttpClient();
        Long userSeq = loginManager.getLoginUserSeq();
        List<TroubleShootingDTO> troubleShootingDTOList = null;

//        HttpUrl.Builder urlBuilder = HttpUrl.parse("http://orientalsalad.kro.kr:8102/trouble-shootings").newBuilder();\
        HttpUrl.Builder urlBuilder = HttpUrl.parse("https://orientalsalad.kro.kr/api/troubleshooting/trouble-shootings").newBuilder();
        urlBuilder.addQueryParameter("writerSeq", String.valueOf(userSeq));
        urlBuilder.addQueryParameter("pageSize", String.valueOf(100));
        String urlWithParameters = urlBuilder.build().toString();
        Request request = new Request.Builder()
                .url(urlWithParameters)
                .get()
                .build();

        // troubleshooting list 응답
        try (Response response = client.newCall(request).execute()) {
            if (response.isSuccessful()) {
                System.out.println("요청 성공");

                // json -> string -> dto
                ResponseBody responseBody = response.body();
                String stringbody = responseBody.string();
                ObjectMapper objectMapper = new ObjectMapper();
                objectMapper.registerModule(new JavaTimeModule()); // json -> LocalDateTime
                ListResponseDTO listResponseDTO = objectMapper.readValue(stringbody, ListResponseDTO.class);
                troubleShootingDTOList = listResponseDTO.getTroubleShootingList();
            }
            else {
                System.out.println("요청 실패 : " + response.code() + " responsebody:  " + response.body().string());
                // todo: 실패 알림 뜨게 하기
            }
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        return troubleShootingDTOList;
    }

    public JPanel getPanel() {
        return wrapperPanel;
    }
}
