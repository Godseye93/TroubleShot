package com.orientalSalad.troubleShot.dto;

public class LoginResponseDTO {
    private boolean success;
    private String message;
    private MemberDTO member;

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public MemberDTO getMember() {
        return member;
    }

    public void setMember(MemberDTO member) {
        this.member = member;
    }

    @Override
    public String toString() {
        return "LoginResponseDTO{" +
                "success=" + success +
                ", message='" + message + '\'' +
                ", member=" + member +
                '}';
    }
}
