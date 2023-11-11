package com.orientalSalad.troubleShot.util;


import com.intellij.execution.filters.Filter;
import com.intellij.execution.impl.ConsoleViewImpl;

import com.intellij.execution.ui.ConsoleView;
import com.intellij.execution.ui.RunContentDescriptor;
import com.intellij.execution.ui.RunContentManager;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

import static com.orientalSalad.troubleShot.actions.TroubleShot.project;

public class ErrorLogFilterApplier {

    public void captureErrorMessages() {
        System.out.println("captureErrorMessage시작");
        // 현재 실행 중인 프로세스의 ConsoleView를 얻습니다.
        RunContentDescriptor currentDescriptor = RunContentManager.getInstance(project).getSelectedContent();
        if (currentDescriptor == null) {
            System.out.println("1");
            return;
        }
        ConsoleView consoleView = (ConsoleView) currentDescriptor.getExecutionConsole();
        if (!(consoleView instanceof ConsoleViewImpl)) {
            System.out.println("2");
            return;
        }
        System.out.println("3");
        // 에러 메시지를 필터링하는 Filter 인스턴스를 생성합니다.
        Filter errorFilter = new Filter() {
            @Override
            public Result applyFilter(String line, int entireLength) {
                System.out.println("4");
                if (line.contains("ERROR")) {  // "ERROR"를 포함하는 메시지를 필터링합니다.
                    System.out.println("5");
                    // 필터링된 에러 메시지를 로그 파일에 저장합니다.
                    try (PrintWriter out = new PrintWriter(new BufferedWriter(new FileWriter("error_log.txt", true)))) {
                        System.out.println("6");
                        out.println(line);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    System.out.println("7");
                    return new Result(entireLength - line.length(), entireLength, null);
                }

                System.out.println("8");
                return null;
            }
        };

        System.out.println("9");
        // ConsoleView에 필터를 추가합니다.
        ((ConsoleViewImpl) consoleView).addMessageFilter(errorFilter);
        System.out.println("captureErrorMessage 끝");
    }
}
