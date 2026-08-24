package com.jobportal.jobportal.service;

import com.jobportal.jobportal.dto.ApplicationResponse;
import com.jobportal.jobportal.entity.Application;
import com.jobportal.jobportal.entity.Job;
import com.jobportal.jobportal.entity.User;
import com.jobportal.jobportal.exception.ResourceNotFoundException;
import com.jobportal.jobportal.exception.UnauthorizedException;
import com.jobportal.jobportal.exception.UserAlreadyExistsException;
import com.jobportal.jobportal.repository.ApplicationRepository;
import com.jobportal.jobportal.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;

    public ApplicationService(ApplicationRepository applicationRepository, JobRepository jobRepository) {
        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
    }

    public ApplicationResponse applyToJob(Long jobId, User applicant) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + jobId));

        boolean alreadyApplied = applicationRepository.findByApplicant(applicant).stream()
                .anyMatch(a -> a.getJob().getId().equals(jobId));
        if (alreadyApplied) {
            throw new UserAlreadyExistsException("You have already applied to this job");
        }

        Application application = new Application(applicant, LocalDateTime.now(), job, "APPLIED");
        Application saved = applicationRepository.save(application);

        return toResponse(saved);
    }

    public List<ApplicationResponse> getMyApplications(User applicant) {
        return applicationRepository.findByApplicant(applicant).stream()
                .map(this::toResponse)
                .toList();
    }

    public List<ApplicationResponse> getApplicationsForJob(Long jobId, User recruiter) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + jobId));

        if (!job.getPostedBy().getId().equals(recruiter.getId())) {
            throw new UnauthorizedException("You are not allowed to view applications for a job you did not post");
        }

        return applicationRepository.findByJob(job).stream()
                .map(this::toResponse)
                .toList();
    }

    private ApplicationResponse toResponse(Application application) {
        return new ApplicationResponse(
                application.getApplicant().getName(),
                application.getJob().getTitle(),
                application.getStatus()
        );
    }
}
