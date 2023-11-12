package com.orientalSalad.troubleShot.common;

import com.intellij.openapi.command.WriteCommandAction;
import com.intellij.openapi.roots.ProjectFileIndex;
import com.intellij.openapi.roots.ProjectRootManager;
import com.intellij.openapi.vfs.LocalFileSystem;
import com.intellij.openapi.vfs.VirtualFile;
import com.intellij.psi.PsiDirectory;
import com.intellij.psi.PsiFileFactory;
import com.intellij.psi.PsiManager;
import com.intellij.psi.xml.XmlFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.util.HashSet;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Stream;

import static com.orientalSalad.troubleShot.endpoint.TroubleShotToolWindow.project;


public class TroubleAutomation {

    private String parsingKey = "\n<<parsingKey>>\n";

    public String getTroubleInfo() {
        // logback-spring.xml 설정
        setSpringLogFile();

        // Error messge, 발생 코드 가져오기
        String[] errorLogList = getErrorLog().split(parsingKey);
        System.out.println("------");
        for (int i = 0; i < errorLogList.length; i++) {
            getErrorCode(errorLogList[i]);
        }
        return "";
    }

    private String[] getErrorCode(String errorLog) {

        // 현재 프로젝트 내의 모든 파일 이름 구하기
        Set<String> fileNameSet = new HashSet<>();
        ProjectFileIndex projectFileIndex = ProjectRootManager.getInstance(project).getFileIndex();

        projectFileIndex.iterateContent(fileOrDir -> {
            if (!fileOrDir.isDirectory()) {
                fileNameSet.add(fileOrDir.getName());
            }
            return true;
        });

        for (String fn : fileNameSet) {
            System.out.print(fn + " ");
        }

        String[] errorLine = errorLog.split("\n");
        Pattern pattern = Pattern.compile("\\(([^:]+):(\\d+)\\)");
        for (String line : errorLine) {
            Matcher matcher = pattern.matcher(line);
            while (matcher.find()) {
                String fileName = matcher.group(1);
                String lineNumber = matcher.group(2);
                System.out.println(fileName + " : " + lineNumber);
                if (fileNameSet.contains(fileName)) {
                    return new String[] {line, fileName, lineNumber};
                }
            }
        }
        return null;
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

    private void setSpringLogFile() {
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
