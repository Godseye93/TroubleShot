package com.orientalSalad.troubleShot.util;

import com.intellij.execution.ExecutionManager;
import com.intellij.execution.ui.RunContentDescriptor;

import java.util.List;

import static com.orientalSalad.troubleShot.actions.TroubleShot.project;

public class TroubleAutomation {

    public void detectRunningProcesses() {
        System.out.println("detectRunningProcess 시작");
        ExecutionManager executionManager = ExecutionManager.getInstance(project);
        List<RunContentDescriptor> runningProcesses = executionManager.getContentManager().getAllDescriptors();

        System.out.println("111111111");
        for (RunContentDescriptor descriptor : runningProcesses) {
            System.out.println("22222222");
            if (descriptor.getProcessHandler() != null && !descriptor.getProcessHandler().isProcessTerminated()) {
                System.out.println("Running process: " + descriptor.getDisplayName());
            }
        }
        System.out.println("detectRunningProcess 끝");
    }
}
