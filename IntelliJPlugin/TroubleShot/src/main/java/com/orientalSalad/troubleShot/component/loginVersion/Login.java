package com.orientalSalad.troubleShot.component.loginVersion;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.orientalSalad.troubleShot.dto.LoginResponseDTO;
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
    private JPanel panel;
    private JTextField emailTextField;
    private JPasswordField passwordTextField;
    private JPanel loginMain;
    private JButton loginButton;
    private JLabel toJoinLinkText;
    private LoginVersionMain loginVersionMain;

    public Login() {
        panel = new JPanel();
        panel.add(loginMain);

        // 로그인 액션
        loginButton.addActionListener(e -> {
            System.out.println("login 액션 시작");

            // request body 생성
            JSONObject requestbody = new JSONObject();
            requestbody.put("email", emailTextField.getText());
            requestbody.put("password", new String(passwordTextField.getPassword()));
            requestbody.put("type", 1);

            // login 요청
            OkHttpClient client = new OkHttpClient();
            Request request = new Request.Builder()
                    .url("https://k9d205.p.ssafy.io:8101/login/login")
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

                    // todo :  SEQ값 저장

                    // todo : input값 깨끗이


                    // 로그인 버튼 비활성화
                    loginButton.setEnabled(false);

                    // 로그인 화면 끄고, 트러블 작성 페이지 보여주기
                    loginVersionMain = LoginVersionMain.getInstance();
                    loginVersionMain.showTrouble();
                    loginVersionMain.toLogoutLabel();

                }
                else {
                    System.out.println("요청 실패 : " + response.code());
                    // todo: 실패 알림 뜨게 하기
                }
            } catch (IOException ex) {
                throw new RuntimeException(ex);
            }
            System.out.println("login 액션 끝");
        });


        toJoinLinkText.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
        toJoinLinkText.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                try {
                    Desktop.getDesktop().browse(new URI("https://k9d205a.p.ssafy.io/signUp"));
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
