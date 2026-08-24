package com.jobportal.jobportal.dto;

public class ApplicationResponse {
    private String jobTitle;
    private String applicantName;
    private String status;

    public ApplicationResponse(String applicantName, String jobTitle, String status) {
        this.applicantName = applicantName;
        this.jobTitle = jobTitle;
        this.status = status;
    }

    public String getApplicantName() {
        return applicantName;
    }

    public void setApplicantName(String applicantName) {
        this.applicantName = applicantName;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
