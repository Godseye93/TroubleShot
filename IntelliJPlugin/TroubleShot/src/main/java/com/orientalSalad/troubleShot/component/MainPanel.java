package com.orientalSalad.troubleShot.component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.intellij.openapi.components.ServiceManager;
import com.orientalSalad.troubleShot.dto.FeedbackResponseDTO;
import com.orientalSalad.troubleShot.endpoint.TroubleShotToolWindow;
import com.orientalSalad.troubleShot.util.LoginManager;
import net.minidev.json.JSONObject;
import okhttp3.*;

import javax.swing.*;
import java.awt.*;
import java.io.IOException;
import java.util.concurrent.TimeUnit;

import static com.orientalSalad.troubleShot.endpoint.TroubleShotToolWindow.toolWindow;

public class MainPanel {
    private JPanel panel;
    private JList<String> mainList;
    private JPanel detailPanel;
    private CardLayout cardLayout;
    private static MainPanel instance;
    LoginManager loginManager;

    public static MainPanel getInstance() {
        if (instance == null) {
            instance = new MainPanel();
        }
        return instance;
    }

    public static MainPanel getNewInstance() {
        instance = new MainPanel();
        return instance;
    }

    public MainPanel() {
        System.out.println("LogoutVersionMain 시작");

        // detail에 trouble, solution 배치
        cardLayout = new CardLayout();
        detailPanel = new JPanel(cardLayout);
        WriteTrouble writeTrouble = new WriteTrouble();
        detailPanel.add(writeTrouble.getPanel(), "Write Trouble");
        ErrorHistory errorHistory = new ErrorHistory();
        detailPanel.add(errorHistory.getPanel(), "Error History");

        loginManager = ServiceManager.getService(LoginManager.class);
        loginManager.setLoginUserSeq(null);
        System.out.println("loginManager : " + loginManager.getLoginUserSeq());

        // 비로그인
        if (loginManager.getLoginUserSeq() == null) {
            LogoutVersionList logoutVersionList = new LogoutVersionList();
            detailPanel.add(logoutVersionList.getPanel(), "My Trouble Shooting");
            Login login = new Login();
            detailPanel.add(login.getPanel(), "Login");
            mainList = new JList<>(new String[]{"Write Trouble", "My Trouble Shooting", "Error History", "Login"});
        }
        // 로그인
        else {
            LoginVersionList loginVersionList = new LoginVersionList();
            detailPanel.add(loginVersionList.getPanel(), "My Trouble Shooting");
            detailPanel.add(new JPanel(), "Logout");
            mainList = new JList<>(new String[]{"Write Trouble", "My Trouble Shooting", "Error History", "Logout"});
        }

        // main에 list, detail, foot 배치
        panel.setLayout(new BorderLayout());
        panel.add(new JScrollPane(mainList), BorderLayout.WEST);
        panel.add(detailPanel, BorderLayout.CENTER);

        // 리스트 클릭 시
        mainList.addListSelectionListener(e -> {
            if (!e.getValueIsAdjusting()) {
                String selectedValue = mainList.getSelectedValue();
                System.out.println("selectedValue : " + selectedValue);

                // 로그아웃시 다시 초기화
                if (selectedValue == "Logout") {
                    int confirm = JOptionPane.showConfirmDialog(panel, "로그아웃 하시겠습니까?", "로그아웃 확인", JOptionPane.YES_NO_OPTION);
                    if (confirm == JOptionPane.YES_OPTION) {
                        logout();
                    } else if (confirm == JOptionPane.NO_OPTION) {
                        // '아니오'를 선택한 경우, 메시지 출력
                        System.out.println("로그아웃 취소");
                        cardLayout.show(detailPanel, "Write Trouble");
                    }
                }

                else {
                    cardLayout.show(detailPanel, selectedValue);
                }

            }
        });
    }

    private void logout() {
        System.out.println("[logout 요청]");
        System.out.println( "loginSeq "  + loginManager.getLoginUserSeq());
        JSONObject requestLogout = new JSONObject();
        requestLogout.put("seq", loginManager.getLoginUserSeq());
        requestLogout.put("type", 1);

        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
                .url("http://orientalsalad.kro.kr:8101/login/logout")
                .post(RequestBody.create(MediaType.parse("application/json"), requestLogout.toString()))
                .build();

        // logout 응답
        try (Response response = client.newCall(request).execute()) {
            if (response.isSuccessful()) {
                System.out.println("요청 성공");
                loginManager.setLoginUserSeq(null);
                TroubleShotToolWindow.addMainPanelToToolWindow();
            }
            else {
                TroubleShotToolWindow.addMainPanelToToolWindow();
                System.out.println("요청 실패 : " + response.code() + " responsebody:  " + response.body().string());
                // todo: 실패 알림 뜨게 하기
            }
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    public JPanel getPanel() {
        return panel;
    }

    public void showWriteSolutionPanel(JPanel newPanel) {
        detailPanel.add(newPanel, "Write Solution");
        cardLayout.show(detailPanel, "Write Solution");
    }

    public void showLogoutVersionMyTroubleShooting() {
        LogoutVersionList logoutVersionList = new LogoutVersionList();
        detailPanel.add(logoutVersionList.getPanel(), "My Trouble Shooting");
        cardLayout.show(detailPanel, "My Trouble Shooting");
    }

    public void showLoginVersionMyTroubleShooting() {
        LoginVersionList loginVersionList = new LoginVersionList();
        detailPanel.add(loginVersionList.getPanel(), "My Trouble Shooting");
        cardLayout.show(detailPanel, "My Trouble Shooting");
    }


    public void showAutomaticWriteTroublePanel(String title, String[] troubleInfo) {
        WriteTrouble writeTrouble = new WriteTrouble();
        writeTrouble.setAutomaticTrouble(title, troubleInfo);
        detailPanel.add(writeTrouble.getPanel(), "Write Trouble");
        cardLayout.show(detailPanel, "Write Trouble");
    }

    public void updateErrorHistory() {
        ErrorHistory errorHistory = new ErrorHistory();
        detailPanel.add(errorHistory.getPanel(), "Error History");
        cardLayout.show(detailPanel, "Error History");
    }

    public void getGPTFeedback(boolean solved, String title, String context) {
        String feedback = null;
        // 해결했을 경우
        if (solved) {
            // solution feedback
            feedback = getSolutionFeedback(context);
        }
        // 해결하지 않았을 경우
        else {
            // error feedback
            feedback = getErrorFeedback(context);
        }

        // 피드백이 없는 경우
        if (feedback == null) {
            toolWindow.hide(null);
            return;
        }

        ChatGPTFeedback chatGPTFeedback = new ChatGPTFeedback();
        chatGPTFeedback.showFeedback(solved, title, feedback);
        detailPanel.add(chatGPTFeedback.getPanel(), "GPT Feedback");
        cardLayout.show(detailPanel, "GPT Feedback");

    }

    private String getErrorFeedback(String context) {
        String feedback = "피드백 불러오기를 실패하였습니다.";

        JSONObject requestFeedback = new JSONObject();
        requestFeedback.put("context", context);
        requestFeedback.put("loginSeq", loginManager.getLoginUserSeq());
        requestFeedback.put("type", 1);

        OkHttpClient client = new OkHttpClient.Builder()
                .readTimeout(30, TimeUnit.SECONDS)
                .build();
        Request request = new Request.Builder()
                .url("http://orientalsalad.kro.kr:8102/gpt/error-feedback")
                .post(RequestBody.create(MediaType.parse("application/json"), requestFeedback.toString()))
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (response.isSuccessful()) {
                System.out.println("요청 성공");
                // json -> string -> dto
                ResponseBody responseBody = response.body();
                String stringbody = responseBody.string();
                ObjectMapper objectMapper = new ObjectMapper();
                objectMapper.registerModule(new JavaTimeModule()); // json -> LocalDateTime
                FeedbackResponseDTO feedbackResponseDTO = objectMapper.readValue(stringbody, FeedbackResponseDTO.class);
                feedback = feedbackResponseDTO.getContext();
            }
            else {
                System.out.println("요청 실패 : " + response.code() + " responsebody:  " + response.body().string());
            }
        } catch (IOException ex) {
            ex.printStackTrace();
        }

        return feedback;
    }

    private String getSolutionFeedback(String context) {
        String feedback = "피드백 불러오기를 실패하였습니다.";

        JSONObject requestFeedback = new JSONObject();
        requestFeedback.put("context", context);
        requestFeedback.put("loginSeq", loginManager.getLoginUserSeq());
        requestFeedback.put("type", 1);

        OkHttpClient client = new OkHttpClient.Builder()
                .readTimeout(30, TimeUnit.SECONDS)
                .build();
        Request request = new Request.Builder()
                .url("http://orientalsalad.kro.kr:8102/gpt/readme-feedback")
                .post(RequestBody.create(MediaType.parse("application/json"), requestFeedback.toString()))
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (response.isSuccessful()) {
                System.out.println("요청 성공");
                // json -> string -> dto
                ResponseBody responseBody = response.body();
                String stringbody = responseBody.string();
                ObjectMapper objectMapper = new ObjectMapper();
                objectMapper.registerModule(new JavaTimeModule()); // json -> LocalDateTime
                FeedbackResponseDTO feedbackResponseDTO = objectMapper.readValue(stringbody, FeedbackResponseDTO.class);
                feedback = feedbackResponseDTO.getContext();
            }
            else {
                System.out.println("요청 실패 : " + response.code() + " responsebody:  " + response.body().string());
            }
        } catch (IOException ex) {
            ex.printStackTrace();
        }

        return feedback;
    }
}
