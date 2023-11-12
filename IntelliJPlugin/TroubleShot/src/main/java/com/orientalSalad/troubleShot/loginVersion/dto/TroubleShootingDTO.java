package com.orientalSalad.troubleShot.loginVersion.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


public class TroubleShootingDTO {
    public Long id;
    public String createdTime;
    public String title;
    public String trouble;
    public String solution;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getCreatedTime() {
        return LocalDateTime.parse(createdTime, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
    }

    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTrouble() {
        return trouble;
    }

    public void setTrouble(String trouble) {
        this.trouble = trouble;
    }

    public String getSolution() {
        return solution;
    }

    public void setSolution(String solution) {
        this.solution = solution;
    }
}
