package com.orientalSalad.troubleShot.component;

import com.intellij.openapi.components.ServiceManager;
import com.orientalSalad.troubleShot.component.MainPanel;
import com.orientalSalad.troubleShot.dto.TroubleShootingDTO;
import com.orientalSalad.troubleShot.util.LoginManager;
import net.minidev.json.JSONObject;
import okhttp3.*;

import javax.swing.*;
import java.awt.*;
import java.awt.datatransfer.Clipboard;
import java.awt.datatransfer.StringSelection;
import java.io.IOException;

import static com.orientalSalad.troubleShot.component.StartPanel.fileUtil;
import static com.orientalSalad.troubleShot.endpoint.TroubleShotToolWindow.startPanel;
import static com.orientalSalad.troubleShot.endpoint.TroubleShotToolWindow.toolWindow;


public class WriteSolution {
    private String mdFileName;
    private TroubleShootingDTO trouble;
    private JTextArea solvedCodeInput;
    private JTextArea descriptionInput;
    private JButton shootSolutionButton;
    private JButton copyMDButton;
    private JPanel wrapperPanel;
    private LoginManager loginManager;

    public WriteSolution(String mdFileName) {
        this();
        this.mdFileName = mdFileName;
    }

    public WriteSolution(TroubleShootingDTO trouble) {
        this();
        this.trouble = trouble;
    }

    public WriteSolution(){
        loginManager = ServiceManager.getService(LoginManager.class);

        // markdown copy 버튼 클릭 시
        copyMDButton.addActionListener(e -> {
            copyMDCode();
        });

        // solution 달기 버튼 클릭 시
        shootSolutionButton.addActionListener(e -> {
            // 비로그인
            if (loginManager.getLoginUserSeq() == null) {
                // md파일에 solution 추가
                fileUtil.createSolutionMD(mdFileName, makeMDCode());
                // 파일 보여주기
                fileUtil.loadAndDisplayFile(mdFileName);

                // 초기화
                startPanel.setContent(MainPanel.getNewInstance().getPanel());
                // ToolWindow 숨기기
                toolWindow.hide(null);
            }
            // 로그인
            else {
                postSolution(trouble);
            }

        });
    }

    private void postSolution(TroubleShootingDTO trouble) {
        System.out.println("[solution 등록 요청]");

        Long loginSeq = loginManager.getLoginUserSeq();
        String title = trouble.getTitle();
        String context = trouble.getContext() + makeMDCode();

        JSONObject writer = new JSONObject();
        writer.put("seq", loginSeq);

        JSONObject troubleShootingAnswer = new JSONObject();
        troubleShootingAnswer.put("title", title);
        troubleShootingAnswer.put("context", context);
        troubleShootingAnswer.put("writer", writer);

        JSONObject requestSolution = new JSONObject();
        requestSolution.put("loginSeq", loginSeq);
        requestSolution.put("type", 1);
        requestSolution.put("troubleShootingAnswer", troubleShootingAnswer);
        requestSolution.put("troubleSeq", trouble.getSeq());
        requestSolution.put("selected", true);

        OkHttpClient client = new OkHttpClient();
        HttpUrl.Builder urlBuilder = HttpUrl.parse("http://orientalsalad.kro.kr:8102/trouble-shootings/" + trouble.getSeq() +"/answers").newBuilder();
        urlBuilder.addQueryParameter("troubleSeq", String.valueOf(trouble.getSeq()));
        String urlWithParameters = urlBuilder.build().toString();
        Request request = new Request.Builder()
                .url(urlWithParameters)
                .post(RequestBody.create(MediaType.parse("application/json"), requestSolution.toString()))
                .build();


        // solution post 응답
        try (Response response = client.newCall(request).execute()) {
            if (response.isSuccessful()) {
                System.out.println("요청 성공");
                MainPanel.getInstance().showLoginVersionMyTroubleShooting();
                fileUtil.showInEditor(title, context);
                // 초기화
                startPanel.setContent(MainPanel.getNewInstance().getPanel());
                // ToolWindow 숨기기
                toolWindow.hide(null);
            }
            else {
                System.out.println("요청 실패 : " + response.code() + " responsebody:  " + response.body().string());
                // todo: 실패 알림 뜨게 하기
            }
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    public JPanel getPanel() {
        return wrapperPanel;
    }

    private void copyMDCode() {
        // markdown으로 생성
        String markdown = makeMDCode();

        System.out.println(markdown.toString());

        // 복사하기
        Clipboard clipboard = Toolkit.getDefaultToolkit().getSystemClipboard();
        StringSelection selection = new StringSelection(markdown.toString());
        clipboard.setContents(selection, null);
    }


    private String makeMDCode() {
        StringBuilder markdown = new StringBuilder();
        markdown.append("\n## SOLUTION").append("\n");
        markdown.append("### 해결 코드").append("\n");
        markdown.append("```\n").append(solvedCodeInput.getText()).append("\n```").append("\n");
        markdown.append("### 해결 설명").append("\n");
        markdown.append(descriptionInput.getText()).append("\n");
        return markdown.toString();
    }
}
