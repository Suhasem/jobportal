package com.jobportal.jobportal.dto;

public class JobRequest {
    private String title;
    private String description;
    private String location;
    private Double salary;

    public JobRequest() {
    }

    public JobRequest(String description, String location, Double salary, String title) {
        this.description = description;
        this.location = location;
        this.salary = salary;
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
