package com.orientalSalad.troubleShot.common;

import com.intellij.lang.Language;
import com.intellij.openapi.editor.Document;
import com.intellij.openapi.editor.Editor;
import com.intellij.openapi.fileEditor.FileEditorManager;
import com.intellij.psi.FileViewProvider;
import com.intellij.psi.PsiDocumentManager;
import com.intellij.psi.PsiFile;
import com.intellij.psi.search.FilenameIndex;
import com.intellij.psi.search.GlobalSearchScope;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.orientalSalad.troubleShot.endpoint.TroubleShotToolWindow.project;

public class TechStackAutomation {

    // 의존성 추출 자동화
    public String extractTechStack() {
        StringBuilder techStack = new StringBuilder();

        String mavenDependencies = extractMavenTechStack();
        String gradleDependencies = extractGradleTechStack();
        String langauge = currentFileInfo();

        if (mavenDependencies != null) {
            techStack.append(mavenDependencies).append("\n");
        }
        if (gradleDependencies != null) {
            techStack.append(gradleDependencies).append("\n");
        }

        if (langauge != null && mavenDependencies == null && gradleDependencies == null) {
            techStack.append(langauge).append("\n");
        }
        return techStack.toString();
    }

    private String currentFileInfo() {
        String fileInfo = null;
        Editor editor = FileEditorManager.getInstance(project).getSelectedTextEditor();
        if (editor != null) {
            Document document = editor.getDocument();
            FileViewProvider fileViewProvider = PsiDocumentManager.getInstance(project).getPsiFile(document).getViewProvider();
            Language language = fileViewProvider.getBaseLanguage();
            fileInfo = language.getID();
        }
        return fileInfo;
    }


    private String extractGradleTechStack() {
        System.out.println("gradle 의존성 추출");
        String techStack = null;

        // 현재 프로젝트에서 build.gradle 찾기
        PsiFile[] gradleFiles = FilenameIndex.getFilesByName(project, "build.gradle", GlobalSearchScope.allScope(project));

        if (gradleFiles == null || gradleFiles.length == 0) {
            return null;
        }

        for (PsiFile file : gradleFiles) {
            String filePath = file.getVirtualFile().getCanonicalPath();
            String projectPath = project.getBasePath();

            if (projectPath == null || filePath == null || !filePath.startsWith(projectPath)) {
                continue;
            }

            techStack = "java ";
            // 버전 찾기
            String fileText = file.getText();
            Pattern pattern = Pattern.compile("sourceCompatibility\\s*=\\s*'(.+?)'", Pattern.DOTALL);
            Matcher matcher = pattern.matcher(fileText);
            while (matcher.find()) {
                techStack += matcher.group(1).replaceAll("[^\\d]", "");
            }
            // dependencies 찾기
            pattern =  Pattern.compile("dependencies\\s*\\{(.+?)\\}", Pattern.DOTALL);
            matcher = pattern.matcher(fileText);
            while (matcher.find()) {
                techStack += "\n" + matcher.group(0);
            }
        }
        return techStack;
    }

    private String extractMavenTechStack() {
        System.out.println("maven 의존성 추출");
        String techStack = null;

        // 현재 프로젝트에서 pon.xml 찾기
        PsiFile[] mavenFiles = FilenameIndex.getFilesByName(project, "pom.xml", GlobalSearchScope.allScope(project));

        if (mavenFiles == null || mavenFiles.length == 0) {
            return null;
        }

        for (PsiFile file : mavenFiles) {
            String filePath = file.getVirtualFile().getCanonicalPath();
            String projectPath = project.getBasePath();

            if (projectPath == null || filePath == null || !filePath.startsWith(projectPath)) {
                continue;
            }

            techStack = "java ";
            // 버전 찾기
            String fileText = file.getText();
            Pattern pattern = Pattern.compile("<maven.compiler.source>(.+?)</maven.compiler.source>", Pattern.DOTALL);
            pattern = Pattern.compile("<maven.compiler.source>(\\\\d+)</maven.compiler.source>", Pattern.DOTALL);
            Matcher matcher = pattern.matcher(fileText);
            while (matcher.find()) {
                techStack += matcher.group(1);
            }
            // dependencies 찾기
            pattern = Pattern.compile("<dependencies>(.+?)</dependencies>", Pattern.DOTALL);
            matcher = pattern.matcher(fileText);
            while (matcher.find()) {
                techStack += "\n" + matcher.group(0);
            }
        }
        return techStack;
    }

}
