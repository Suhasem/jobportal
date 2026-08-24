package com.jobportal.jobportal.entity;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="applications")
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Job job;
    @ManyToOne
    private User applicant;
    private String status;
    private LocalDateTime appliedAt;

    public Application(User applicant, LocalDateTime appliedAt, Job job, String status) {
        this.applicant = applicant;
        this.appliedAt = appliedAt;
        this.job = job;
        this.status=status;
    }
    public Application(){

    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job = job;
    }

    public long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getAppliedAt() {
        return appliedAt;
    }

    public void setApplied(LocalDateTime applied) {
        this.appliedAt = applied;
    }

    public User getApplicant() {
        return applicant;
    }

    public void setApplication(User applicant) {
        this.applicant = applicant;
    }
}
