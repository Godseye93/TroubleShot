package com.orientalSalad.troubleShot.component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.intellij.openapi.components.ServiceManager;
import com.orientalSalad.troubleShot.dto.LoginResponseDTO;
import com.orientalSalad.troubleShot.endpoint.TroubleShotToolWindow;
import com.orientalSalad.troubleShot.util.LoginManager;
import net.minidev.json.JSONObject;
import okhttp3.*;

import javax.swing.*;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

public class Login {
    private JPanel wrapperPanel;
    private JPanel panel;
    private JTextField emailTextField;
    private JPasswordField passwordTextField;
    private JPanel loginMain;
    private JButton loginButton;
    private JLabel toJoinLinkText;

    public Login() {
        panel = new JPanel();
        JPanel wrapperPanel = new JPanel(new FlowLayout(FlowLayout.LEFT));
        wrapperPanel.add(loginMain);
        panel.setLayout(new BorderLayout());
        panel.add(wrapperPanel, BorderLayout.NORTH);
        emailTextField.setHorizontalAlignment(JTextField.LEFT);
        passwordTextField.setHorizontalAlignment(JTextField.LEFT);
        // 로그인 액션
        loginButton.addActionListener(e -> {
            System.out.println("[login 요청]");

            // request body 생성
            JSONObject requestbody = new JSONObject();
            requestbody.put("email", emailTextField.getText());
            requestbody.put("password", new String(passwordTextField.getPassword()));
            requestbody.put("type", 1);

            // login 요청
            OkHttpClient client = new OkHttpClient();
            Request request = new Request.Builder()
                    .url("https://orientalsalad.kro.kr:8101/login/login")
                    .post(RequestBody.create(MediaType.parse("application/json"), requestbody.toString()))
                    .build();

            // login 응답
            try (Response response = client.newCall(request).execute()) {
                if (response.isSuccessful()) {
                    // json -> string -> dto
                    ResponseBody responseBody = response.body();
                    String stringbody = responseBody.string();
                    ObjectMapper objectMapper = new ObjectMapper();
                    objectMapper.registerModule(new JavaTimeModule()); // json -> LocalDateTime
                    LoginResponseDTO loginResponseDTO = objectMapper.readValue(stringbody, LoginResponseDTO.class);

                    System.out.println("응답 본문: " + loginResponseDTO.toString());

                    // login 유저 정보 저장
                    LoginManager loginManager = ServiceManager.getService(LoginManager.class);
                    loginManager.setLoginUserSeq(loginResponseDTO.getMember().getSeq());
                    System.out.println("loginInfo : " + loginManager.getLoginUserSeq());

                    // 로그인 화면 끄고, 트러블 작성 페이지 보여주기
                    TroubleShotToolWindow.addMainPanelToToolWindow();

                }
                else {
                    System.out.println("요청 실패 : " + response.code() + " responsebody:  " + response.body().string());
                    // todo: dialog로 "아이디 혹은 비밀번호가 틀렸습니다"실패 알림 뜨게 하기
                }
            } catch (IOException ex) {
                throw new RuntimeException(ex);
            }
        });


        toJoinLinkText.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
        toJoinLinkText.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                try {
                    Desktop.getDesktop().browse(new URI("https://orientalsalad.kro.kr/signUp"));
                } catch (IOException | URISyntaxException ex) {
                    ex.printStackTrace();
                }
            }
        });

    }

    public JPanel getPanel() {
        return panel;
    }
}
