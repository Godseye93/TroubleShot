package com.orientalSalad.troubleShot.dto;

import java.time.LocalDateTime;
import java.util.List;

public class TroubleShootingDTO {

    private Long seq;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
    private LocalDateTime deleteTime;
    private String title;
    private String category;
    private String context;
    private String dependency;
    private int scope;
    private WriterDTO writer;
    private boolean solved;
    private int viewCount;
    private int likeCount;
    private int replyCount;
    private int answerCount;
    private List<String> tags;
    private String replies;
    private String answers;
    private boolean loginLike;
    private boolean favorite;
    private int postType;

    public Long getSeq() {
        return seq;
    }

    public void setSeq(Long seq) {
        this.seq = seq;
    }

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public void setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
    }

    public LocalDateTime getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(LocalDateTime updateTime) {
        this.updateTime = updateTime;
    }

    public LocalDateTime getDeleteTime() {
        return deleteTime;
    }

    public void setDeleteTime(LocalDateTime deleteTime) {
        this.deleteTime = deleteTime;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getContext() {
        return context;
    }

    public void setContext(String context) {
        this.context = context;
    }

    public String getDependency() {
        return dependency;
    }

    public void setDependency(String dependency) {
        this.dependency = dependency;
    }

    public int getScope() {
        return scope;
    }

    public void setScope(int scope) {
        this.scope = scope;
    }

    public WriterDTO getWriter() {
        return writer;
    }

    public void setWriter(WriterDTO writer) {
        this.writer = writer;
    }

    public boolean isSolved() {
        return solved;
    }

    public void setSolved(boolean solved) {
        this.solved = solved;
    }

    public int getViewCount() {
        return viewCount;
    }

    public void setViewCount(int viewCount) {
        this.viewCount = viewCount;
    }

    public int getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(int likeCount) {
        this.likeCount = likeCount;
    }

    public int getReplyCount() {
        return replyCount;
    }

    public void setReplyCount(int replyCount) {
        this.replyCount = replyCount;
    }

    public int getAnswerCount() {
        return answerCount;
    }

    public void setAnswerCount(int answerCount) {
        this.answerCount = answerCount;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public String getReplies() {
        return replies;
    }

    public void setReplies(String replies) {
        this.replies = replies;
    }

    public String getAnswers() {
        return answers;
    }

    public void setAnswers(String answers) {
        this.answers = answers;
    }

    public boolean isLoginLike() {
        return loginLike;
    }

    public void setLoginLike(boolean loginLike) {
        this.loginLike = loginLike;
    }

    public boolean isFavorite() {
        return favorite;
    }

    public void setFavorite(boolean favorite) {
        this.favorite = favorite;
    }

    public int getPostType() {
        return postType;
    }

    public void setPostType(int postType) {
        this.postType = postType;
    }

    @Override
    public String toString() {
        return "TroubleShootingDTO{" +
                "seq=" + seq +
                ", createTime=" + createTime +
                ", updateTime=" + updateTime +
                ", deleteTime=" + deleteTime +
                ", title='" + title + '\'' +
                ", category='" + category + '\'' +
                ", context='" + context + '\'' +
                ", dependency='" + dependency + '\'' +
                ", scope=" + scope +
                ", writer=" + writer +
                ", solved=" + solved +
                ", viewCount=" + viewCount +
                ", likeCount=" + likeCount +
                ", replyCount=" + replyCount +
                ", answerCount=" + answerCount +
                ", tags=" + tags +
                ", replies='" + replies + '\'' +
                ", answers='" + answers + '\'' +
                ", loginLike=" + loginLike +
                ", favorite=" + favorite +
                ", postType=" + postType +
                '}';
    }
}
