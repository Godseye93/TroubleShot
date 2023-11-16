package com.orientalSalad.troubleShot.dto;

import java.util.List;

public class ListResponseDTO {

    private boolean success;
    private String message;
    private List<TroubleShootingDTO> troubleShootingList;
    private int totalCount;

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

    public List<TroubleShootingDTO> getTroubleShootingList() {
        return troubleShootingList;
    }

    public void setTroubleShootingList(List<TroubleShootingDTO> troubleShootingList) {
        this.troubleShootingList = troubleShootingList;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }

    @Override
    public String toString() {
        return "ListResponseDTO{" +
                "success=" + success +
                ", message='" + message + '\'' +
                ", troubleShootingList=" + troubleShootingList +
                ", totalCount=" + totalCount +
                '}';
    }
}
