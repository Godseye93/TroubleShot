package com.orientalSalad.troubleShot.util;

import com.intellij.openapi.application.ApplicationManager;
import com.intellij.openapi.components.PersistentStateComponent;
import groovyjarjarantlr4.v4.runtime.misc.Nullable;
import org.jetbrains.annotations.NotNull;

import java.io.*;
import java.nio.file.*;

import static com.orientalSalad.troubleShot.endpoint.TroubleShotToolWindow.project;
import static com.orientalSalad.troubleShot.util.TroubleAutomation.parsingKey;

public class SpringLogWatcher implements PersistentStateComponent<SpringLogWatcher.State> {

    @Nullable
    @Override
    public State getState() {
        State state = new State();
        state.lastPosition = lastPosition;
        return state;
    }

    @Override
    public void loadState(@NotNull State state) {
        lastPosition = state.lastPosition;
    }

    public static class State {
        public long lastPosition;
    }
    private final RandomAccessFile file;
    private long lastPosition;

    public SpringLogWatcher() {
        RandomAccessFile tmpFile = null;
        try {
            tmpFile = new RandomAccessFile(project.getBasePath() + "/spring.log", "r");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        this.file = tmpFile;
    }

    public void watch() {
        System.out.println("watch 시작");
        State state = getState();
        if (state != null) {
            lastPosition = state.lastPosition;
        }
        try {
            if (lastPosition > file.length()) {
                lastPosition = 0;
            }
            WatchService watchService = FileSystems.getDefault().newWatchService();

            Path path = Paths.get(project.getBasePath());
            path.register(watchService, StandardWatchEventKinds.ENTRY_MODIFY);

            while (true) {
                WatchKey key = watchService.take();

                for (WatchEvent<?> event : key.pollEvents()) {
                    Path changed = (Path) event.context();
                    if (changed.toString().equals("spring.log")) {
                        getTroubleInfo();
                    }
                }

                boolean valid = key.reset();
                if (!valid) {
                    break;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void getTroubleInfo() {
        StringBuilder sb = new StringBuilder();
        try {

            file.seek(lastPosition);
            String line;
            boolean errorLine = false;
            while ((line = file.readLine()) != null) {
                System.out.println(line);
                lastPosition = file.getFilePointer();
                if (line.contains(" ERROR ")) {
                    errorLine = true;
                    sb.append(parsingKey);
                } else if (line.contains(" ALL ") || line.contains(" DEBUG ") || line.contains(" INFO ") || line.contains(" WARN ")) {
                    errorLine = false;
                }

                if (errorLine) {
                    sb.append(line).append("\n");
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        getState().lastPosition = lastPosition;
        String[] errorLogList = sb.toString().split(parsingKey);
        for (int i = 0; i < errorLogList.length; i++) {
            System.out.println(i + "번째 에러로그 확인");
            final String errorLog = errorLogList[i];
            ApplicationManager.getApplication().invokeLater(() -> {
                new TroubleAutomation().saveErrorHistory(errorLog);
            });
            System.out.println();
        }
    }
}
