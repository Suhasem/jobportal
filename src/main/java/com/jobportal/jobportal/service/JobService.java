package com.jobportal.jobportal.service;

import com.jobportal.jobportal.dto.JobRequest;
import com.jobportal.jobportal.entity.Job;
import com.jobportal.jobportal.entity.User;
import com.jobportal.jobportal.exception.ResourceNotFoundException;
import com.jobportal.jobportal.exception.UnauthorizedException;
import com.jobportal.jobportal.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class JobService {

    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public Job createJob(JobRequest request, User recruiter) {
        Job job = new Job(
                request.getTitle(),
                request.getDescription(),
                request.getLocation(),
                request.getSalary(),
                recruiter,
                LocalDateTime.now()
        );
        return jobRepository.save(job);
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Job getJobById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));
    }

    public List<Job> getJobsPostedBy(User recruiter) {
        return jobRepository.findByPostedBy(recruiter);
    }

    public List<Job> searchJobs(String keyword, String location) {
        List<Job> jobs = jobRepository.findAll();
        return jobs.stream()
                .filter(j -> keyword == null || keyword.isBlank()
                        || j.getTitle().toLowerCase().contains(keyword.toLowerCase())
                        || j.getDescription().toLowerCase().contains(keyword.toLowerCase()))
                .filter(j -> location == null || location.isBlank()
                        || j.getLocation().toLowerCase().contains(location.toLowerCase()))
                .toList();
    }

    public Job updateJob(Long id, JobRequest request, User recruiter) {
        Job job = getJobById(id);
        assertOwner(job, recruiter);

        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setLocation(request.getLocation());
        job.setSalary(request.getSalary());

        return jobRepository.save(job);
    }

    public void deleteJob(Long id, User recruiter) {
        Job job = getJobById(id);
        assertOwner(job, recruiter);
        jobRepository.delete(job);
    }

    private void assertOwner(Job job, User recruiter) {
        if (!job.getPostedBy().getId().equals(recruiter.getId())) {
            throw new UnauthorizedException("You are not allowed to modify a job you did not post");
        }
    }
}
