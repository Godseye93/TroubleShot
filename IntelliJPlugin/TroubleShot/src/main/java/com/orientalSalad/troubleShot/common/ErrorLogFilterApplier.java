package com.orientalSalad.troubleShot.common;


import com.intellij.execution.filters.Filter;
import com.intellij.execution.impl.ConsoleViewImpl;

import com.intellij.execution.ui.ConsoleView;
import com.intellij.execution.ui.RunContentDescriptor;
import com.intellij.execution.ui.RunContentManager;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

import static com.orientalSalad.troubleShot.endpoint.TroubleShotToolWindow.project;

public class ErrorLogFilterApplier {


    public String captureErrorMessages() {
        System.out.println("captureErrorMessage시작");
        RunContentDescriptor currentDescriptor = RunContentManager.getInstance(project).getSelectedContent();
        if (currentDescriptor == null) {
            System.out.println("1");
            return "currentDescriptor == null";
        }
        ConsoleView consoleView = (ConsoleView) currentDescriptor.getExecutionConsole();
        if (!(consoleView instanceof ConsoleViewImpl)) {
            System.out.println("2");
            return "!(consoleView instanceof ConsoleViewImpl)";
        }

        System.out.println("3");
        ConsoleViewImpl consoleViewImpl = (ConsoleViewImpl) consoleView;
        String consoleText = consoleViewImpl.getEditor().getDocument().getText();  // 콘솔에 이미 출력된 텍스트를 가져옵니다.
//        return "consoleText : " + consoleText;
        // 콘솔에 이미 출력된 에러 메시지를 파일에 기록합니다.
        String[] lines = consoleText.split("");
        for (String line : lines) {
            if (line.contains("ERROR")) {
                try (PrintWriter out = new PrintWriter(new BufferedWriter(new FileWriter("error_log.txt", true)))) {
                    out.println(line);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        System.out.println("4");
        // 새로 출력되는 에러 메시지를 캡처하고 기록하는 필터를 추가합니다.
        Filter errorFilter = new Filter() {
            @Override
            public Result applyFilter(String line, int entireLength) {
                if (line.contains("ERROR")) {
                    try (PrintWriter out = new PrintWriter(new BufferedWriter(new FileWriter("error_log.txt", true)))) {
                        out.println(line);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    return new Result(entireLength - line.length(), entireLength, null);
                }
                return null;
            }
        };

        consoleViewImpl.addMessageFilter(errorFilter);
      return "captureErrorMessage 끝";
    }
}
