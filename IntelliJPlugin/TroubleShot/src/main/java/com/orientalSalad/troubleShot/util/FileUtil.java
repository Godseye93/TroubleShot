package com.orientalSalad.troubleShot.util;

import com.intellij.openapi.command.WriteCommandAction;
import com.intellij.openapi.fileEditor.FileEditorManager;
import com.intellij.openapi.vfs.LocalFileSystem;
import com.intellij.openapi.vfs.VirtualFile;
import com.intellij.psi.PsiDirectory;
import com.intellij.psi.PsiFile;
import com.intellij.psi.PsiFileFactory;
import com.intellij.psi.PsiManager;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.UserDefinedFileAttributeView;

import static com.orientalSalad.troubleShot.endpoint.TroubleShotToolWindow.project;

public class FileUtil {

    // trouble을 Md파일로 만들기
    public void createMDFile(String fileName, String contents) {
        String userHomePath = System.getProperty("user.home");
        String documentsPath = userHomePath + "/Documents/TroubleShot1.0-OrientalSalad/troubleshooting_documents";

        File documentsDir = new File(documentsPath);
        if (!documentsDir.exists()) {
            documentsDir.mkdirs();
        }

        VirtualFile directory = LocalFileSystem.getInstance().findFileByPath(documentsPath);

        WriteCommandAction.runWriteCommandAction(project, () -> {
            PsiDirectory psiDirectory = PsiManager.getInstance(project).findDirectory(directory);
            if (psiDirectory != null) {

                // 똑같은 이름의 파일이 있으면, (1)이런식으로 추가
                String newFileName = fileName;
                int count = 1;
                while (psiDirectory.findFile(newFileName + ".md") != null) {
                    System.out.println("이미 존재할 경우");
                    newFileName = fileName + "(" + count + ")";
                    count++;
                }

                // 파일 생성
                PsiFile psiFile = PsiFileFactory.getInstance(project).createFileFromText(newFileName + ".md", contents);
                psiDirectory.add(psiFile);

                // 사용자 정의 확장 속성 추가
                String filePath = documentsPath + "/" + newFileName + ".md";
                addFileAttribute(filePath, "type", "trouble");

                // 파일 보여주기
                loadAndDisplayFile(newFileName+".md");
            }
        });
    }

    // solution을 Md파일에 합치기
    public void createSolutionMD(String fileName, String contents) {
        String userHomePath = System.getProperty("user.home");
        String filePath = userHomePath + "/Documents/TroubleShot1.0-OrientalSalad/troubleshooting_documents/" + fileName;

        try (BufferedWriter bw = new BufferedWriter(new FileWriter(filePath, true))) { // FileWriter의 두번째 인자를 true로 설정하면 파일에 이어서 내용을 작성할 수 있습니다.
            bw.write(contents);
            addFileAttribute(filePath, "type","solution");
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    // 파일 이름 가져오기
    public String[] getFileNameList(String path) {
        String userHomePath = System.getProperty("user.home");
        String documentsPath = userHomePath + "/Documents/TroubleShot1.0-OrientalSalad/";
        documentsPath += path;
        File folder = new File(documentsPath);
        // 폴더가 존재하지 않거나, 파일일 경우
        if (!folder.exists() || !folder.isDirectory()) {
            return null;
        }

        return folder.list();
    }

    // 파일 삭제
    public void deleteFile(String fileName) {
        String userHomePath = System.getProperty("user.home");
        String filePath = userHomePath + "/Documents/TroubleShot1.0-OrientalSalad/troubleshooting_documents/" + fileName;
        File file = new File(filePath);
        if (file.delete()) {
            System.out.println("파일이 성공적으로 삭제되었습니다.");
        } else {
            System.out.println("파일 삭제에 실패했습니다.");
        }
    }

    // 사용자 정의 속성 추가
    public void addFileAttribute(String filePath, String attributeName, String attributeValue) {
        try {
            Path path = Paths.get(filePath);
            UserDefinedFileAttributeView view = Files.getFileAttributeView(path, UserDefinedFileAttributeView.class);
            view.write(attributeName, ByteBuffer.wrap(attributeValue.getBytes(StandardCharsets.UTF_8)));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // 사용자 정의 속성 가져오기
    public String getFileAttribute(String filePath, String attributeName) {
        try {
            String userHomePath = System.getProperty("user.home");
            String documentsPath = userHomePath + "/Documents/TroubleShot1.0-OrientalSalad/troubleshooting_documents/";
            Path file = Paths.get(documentsPath + filePath);

            // 파일로부터 사용자 정의 속성 읽기
            UserDefinedFileAttributeView view = Files.getFileAttributeView(file, UserDefinedFileAttributeView.class);
            ByteBuffer attributeBuffer = ByteBuffer.allocate(view.size(attributeName));

            view.read(attributeName, attributeBuffer);
            attributeBuffer.flip();
            byte[] attributeBytes = new byte[attributeBuffer.remaining()];
            attributeBuffer.get(attributeBytes);
            return new String(attributeBytes, StandardCharsets.UTF_8);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    // 파일 내용 에디터에 표시
    public void loadAndDisplayFile(String fileName) {
        String userHomePath = System.getProperty("user.home");
        String filePath = userHomePath + "/Documents/TroubleShot1.0-OrientalSalad/troubleshooting_documents/" + fileName;
        VirtualFile file = LocalFileSystem.getInstance().findFileByPath(filePath);
        FileEditorManager.getInstance(project).openFile(file, true);
    }
}
