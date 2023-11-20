package com.orientalSalad.troubleShot.dto;

public class FeedbackResponseDTO {
    private boolean success;
    private String message;
    private String context;

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

    public String getContext() {
        return context;
    }

    public void setContext(String context) {
        this.context = context;
    }

    @Override
    public String toString() {
        return "FeedbackResponseDTO{" +
                "success=" + success +
                ", message='" + message + '\'' +
                ", context='" + context + '\'' +
                '}';
    }
}
