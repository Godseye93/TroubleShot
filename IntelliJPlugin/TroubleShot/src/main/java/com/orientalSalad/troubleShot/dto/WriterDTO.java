package com.orientalSalad.troubleShot.dto;

public class WriterDTO {
    private Long seq;
    private String email;
    private String profileImg;
    private String nickname;

    public Long getSeq() {
        return seq;
    }

    public void setSeq(Long seq) {
        this.seq = seq;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getProfileImg() {
        return profileImg;
    }

    public void setProfileImg(String profileImg) {
        this.profileImg = profileImg;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    @Override
    public String toString() {
        return "WriterDTO{" +
                "seq=" + seq +
                ", email='" + email + '\'' +
                ", profileImg='" + profileImg + '\'' +
                ", nickname='" + nickname + '\'' +
                '}';
    }
}
