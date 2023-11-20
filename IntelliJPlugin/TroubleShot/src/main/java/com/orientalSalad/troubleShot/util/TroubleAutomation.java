package com.orientalSalad.troubleShot.util;

import com.intellij.openapi.command.WriteCommandAction;
import com.intellij.openapi.roots.ProjectFileIndex;
import com.intellij.openapi.roots.ProjectRootManager;
import com.intellij.openapi.vfs.LocalFileSystem;
import com.intellij.openapi.vfs.VirtualFile;
import com.intellij.psi.PsiDirectory;
import com.intellij.psi.PsiFileFactory;
import com.intellij.psi.PsiManager;
import com.intellij.psi.xml.XmlFile;
import com.orientalSalad.troubleShot.component.MainPanel;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Stream;

import static com.orientalSalad.troubleShot.endpoint.TroubleShotToolWindow.project;


public class TroubleAutomation {

    public static String parsingKey = "\n<<parsingKey>>\n";

    public void getTroubleInfo() {
        // logback-spring.xml 설정
        setSpringLogFile();

        // Error messge, 발생 코드 가져오기
        String[] errorLogList = getErrorLog().split(parsingKey);
        for (int i = 0; i < errorLogList.length; i++) {
            System.out.println(i + "번째 에러로그 확인");
            saveErrorHistory(errorLogList[i]);
            System.out.println();
        }
    }

    public void debugging(String errorLog) {
//        try {
//            System.out.println("에러로그 쓰기");
//            BufferedWriter writer = new BufferedWriter(new FileWriter(project.getBasePath() +"/errorLog.txt", true));
//            writer.write(errorLog);
//            writer.newLine();
//            writer.flush();
//        } catch (Exception e) {
//            System.out.println("에러로그 쓰기 실패");
//            e.printStackTrace();
//        }
    }

    public void saveErrorHistory(String errorLog) {

        // 현재 프로젝트 내의 모든 파일 이름 구하기
        Set<String> fileNameSet = new HashSet<>();
        ProjectFileIndex projectFileIndex = ProjectRootManager.getInstance(project).getFileIndex();
        projectFileIndex.iterateContent(fileOrDir -> {
            if (!fileOrDir.isDirectory()) {
                fileNameSet.add(fileOrDir.getName());
            }
            return true;
        });

        // 에러 발생 코드 위치 찾기
        System.out.println("에러 발생 코드 위치 찾기");
        String[] errorLine = errorLog.split("\n");
        Pattern errorCodepattern = Pattern.compile("\\(([^:]+):(\\d+)\\)");
        Pattern exceptionTypePattern = Pattern.compile("([a-zA-Z.]*Exception)");
        String title = "";
        String errorDateTIme = null;
        String errorType = null;
        String errorFilePath = null; // 에러 발생 파일 경로
        String errorFileName = null; // 에러 발생 파일 이름
        String errorFileType = null; // 무슨 파일인지 ex) .java
        int errorlineNumber = -1;
        boolean finished = false;
        for (String line : errorLine) {
            // 에러 발생 시간 얻기

            if (line.contains(" ERROR ")) {
                errorDateTIme = line.substring(2, 19).replace(":", ".").replace("-", ".");
                System.out.println("errorDateTime" + errorDateTIme);
                continue;
            }
            // Exception Type 얻기
            if (line.contains("Exception")) {
                Matcher matcher = exceptionTypePattern.matcher(line);
                if (matcher.find()) {
                    errorType = matcher.group(1);
                }
                continue;
            }
            // error 발생 코드 얻기
            Matcher matcher = errorCodepattern.matcher(line);
            while (matcher.find()) {
                errorFileName = matcher.group(1);
                String[] errorFileNameAndType = errorFileName.split("\\.");
                System.out.println("errorFileName : " + errorFileName);
                System.out.println("errorFileNameAndType  length : " + errorFileNameAndType.length);
                for (String ent : errorFileNameAndType) {
                    System.out.print(ent + " ");
                }
                System.out.println();
                if (errorFileNameAndType.length < 2) {
                    System.out.println("errorFileNameAndType.length < 2");
                    break;
                }
                errorFileType = "." + errorFileNameAndType[1];
                errorlineNumber = Integer.parseInt(matcher.group(2));
                System.out.println("errorFileType : " + errorFileType + ", errorlineNumber : " + errorlineNumber);
                if (fileNameSet.contains(errorFileName)) {
                    String filePath = "at (([a-zA-Z0-9.]+)\\." + errorFileNameAndType[0] + ")";
                    Pattern filePathPattern = Pattern.compile(filePath);
                    matcher = filePathPattern.matcher(line);
                    if (matcher.find()) {
                        errorFilePath = matcher.group(1).replace(".", "/");
                        System.out.println("erorFilePath : " + errorFilePath);
                    }
                    finished = true;
                    break;
                }
            }
            if (finished) {
                break;
            }
        }

        // 에러 발생 코드 구하기
        System.out.println("에러 발생 코드 구하기");
        if (errorFilePath == null) {
            System.out.println("errorFilePath == null");
            return;
        }
        title += errorType + " " + errorDateTIme;
        System.out.println("title : " + title);
        try {
            String filePath = project.getBasePath() + "/src/main/java/" + errorFilePath + errorFileType;
            BufferedReader reader = new BufferedReader(new FileReader(filePath));
            String line;
            List<String> contents = new ArrayList<>();
            while ((line = reader.readLine()) != null) {
                contents.add(line);
            }
            reader.close();
            int upperIndex = errorlineNumber;
            for (int i = errorlineNumber - 1; i >= 0; i--) {
                upperIndex = i;
                if (contents.get(i).contains("{")) {
                    break;
                }
            }
            int downIndex = errorlineNumber;
            for (int i = errorlineNumber; i < contents.size(); i++) {
                downIndex = i;
                if (contents.get(i).contains("}")) {
                    break;
                }
            }
            StringBuilder errorCode = new StringBuilder();
            for (int i = upperIndex; i <= downIndex; i++) {
                errorCode.append(contents.get(i)).append("\n");
            }
            createErrorHistory(title, errorLog, errorCode.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void createErrorHistory(String fileName, String errorLog, String errorCode) {
        System.out.println("createErrorHistory 시작");
        try {
            String userHomePath = System.getProperty("user.home");
            String directoryPath = userHomePath + "/Documents/TroubleShot1.0-OrientalSalad/error_history";

            File documentsDir = new File(directoryPath);
            if (!documentsDir.exists()) {
                documentsDir.mkdirs();
            }

            String filePath = directoryPath + "/" + fileName + ".txt";
            BufferedWriter writer = new BufferedWriter(new FileWriter(filePath));

            writer.write(errorLog);
            writer.write(parsingKey);
            writer.write(errorCode);
            writer.write(parsingKey);
            TechStackAutomation techStackAutomation = new TechStackAutomation();
            writer.write(techStackAutomation.extractTechStack());

            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        MainPanel.getInstance().updateErrorHistory();
    }

    private String getErrorLog() {
        File file = new File(project.getBasePath() + "/spring.log");
        if (!file.exists()) {
            return "";
        }
        StringBuilder sb = new StringBuilder();
        try (BufferedReader br = new BufferedReader(new FileReader(project.getBasePath() + "/spring.log"))) {

            String line;
            boolean errorLine = false;
            while ((line = br.readLine()) != null) {
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
        return sb.toString();
    }

    public void setSpringLogFile() {
        String directory = project.getBasePath() + "/" + "src/main/resources";  // 탐색하려는 디렉토리의 경로
        String fileName = "logback-spring.xml";  // 찾으려는 파일의 이름

        // logback-spring.xml 존재하는지 확인
        boolean isFilePresent = false;
        try (Stream<Path> paths = Files.walk(Paths.get(directory))) {
            isFilePresent = paths
                    .filter(Files::isRegularFile)
                    .anyMatch(path -> path.getFileName().toString().equals(fileName));

        } catch (IOException e) {
            e.printStackTrace();
        }

        // logback-spring.xml이 존재할 경우
        if (isFilePresent) {
            return;
        }

        // logback-spring.xml이 존재하지 않을 경우
        PsiFileFactory psiFileFactory = PsiFileFactory.getInstance(project);
        XmlFile xmlFile = (XmlFile) psiFileFactory.createFileFromText(fileName,
                "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
                        "<configuration>\n" +
                        "    <include resource=\"org/springframework/boot/logging/logback/base.xml\"/>\n" +
                        "\n" +
                        "    <appender name=\"FILE\" class=\"ch.qos.logback.core.rolling.RollingFileAppender\">\n" +
                        "        <file>spring.log</file>\n" +
                        "        <rollingPolicy class=\"ch.qos.logback.core.rolling.TimeBasedRollingPolicy\">\n" +
                        "            <fileNamePattern>spring.%d{yyyy-MM-dd}.log</fileNamePattern>\n" +
                        "            <maxHistory>30</maxHistory>\n" +
                        "        </rollingPolicy>\n" +
                        "        <encoder>\n" +
                        "            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>\n" +
                        "        </encoder>\n" +
                        "    </appender>\n" +
                        "\n" +
                        "    <root level=\"ERROR\">\n" +
                        "        <appender-ref ref=\"FILE\" />\n" +
                        "    </root>\n" +
                        "</configuration>");

        VirtualFile vf = LocalFileSystem.getInstance().refreshAndFindFileByPath(directory);
        PsiDirectory psiDirectory = vf == null ? null : PsiManager.getInstance(project).findDirectory(vf);
        if (psiDirectory == null) {
            return;
        }

        WriteCommandAction.runWriteCommandAction(project, () -> {
            psiDirectory.add(xmlFile);
        });
    }

//    public String getAndParseError() {
//        System.out.println("Error 찾기 시작");
//
//        try {
//            // cmd 명령어 실행 (Gradle을 이용한 Spring Boot 프로젝트 빌드)
//            ProcessBuilder processBuilder = new ProcessBuilder("cmd.exe", "/c", "gradle clean build");
//            processBuilder.directory(new File(project.getBasePath())); // 여기에 프로젝트의 경로를 입력
//            Process process = processBuilder.start();
//
//            // 오류 메시지 스트림을 가져옴
//            InputStream errorStream = process.getErrorStream();
//            BufferedReader reader = new BufferedReader(new InputStreamReader(errorStream, "MS949"));
//
//            // 오류 메시지 파싱
//            String line;
//            Pattern pattern = Pattern.compile("((.*Exception.*|.*Error.*)|(\\sat .*\\.(.*)\\((.*):(\\d+)\\)))");
//            while ((line = reader.readLine()) != null) {
//                Matcher matcher = pattern.matcher(line);
//                if (matcher.find()) {
//                    return matcher.group();
//                }
//            }
//
//            process.waitFor();
//
//        } catch (IOException | InterruptedException e) {
//            e.printStackTrace();
//        }
//        return "Error 찾기 끝!!!!" + project.getBasePath();
//    }
//
//    public void getErrorTxtFile() {
//        System.out.println("error.txt 얻기 시작");
//        try {
//            ProcessBuilder processBuilder = new ProcessBuilder("cmd.exe", "/c", "gradle clean build");
//            processBuilder.directory(new File(project.getBasePath())); // 여기에 프로젝트의 경로를 입력
//
//            // 표준 에러를 파일로 리다이렉트
//            File errorFile = new File("error.txt");
//            processBuilder.redirectError(errorFile);
//
//            Process process = processBuilder.start();
//            process.waitFor();
//            System.out.println("error.");
//
//        } catch (IOException | InterruptedException e) {
//            e.printStackTrace();
//            System.out.println("txt");
//        }
//    }
}
