package com.jobportal.jobportal.controller;

import com.jobportal.jobportal.dto.JobRequest;
import com.jobportal.jobportal.entity.Job;
import com.jobportal.jobportal.security.UserPrincipal;
import com.jobportal.jobportal.service.JobService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String location) {
        if (keyword != null || location != null) {
            return ResponseEntity.ok(jobService.searchJobs(keyword, location));
        }
        return ResponseEntity.ok(jobService.getAllJobs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.getJobById(id));
    }

    @PostMapping
    public ResponseEntity<Job> createJob(@RequestBody JobRequest request,
                                          @AuthenticationPrincipal UserPrincipal principal) {
        Job created = jobService.createJob(request, principal.getUser());
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable Long id,
                                          @RequestBody JobRequest request,
                                          @AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(jobService.updateJob(id, request, principal.getUser()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id,
                                           @AuthenticationPrincipal UserPrincipal principal) {
        jobService.deleteJob(id, principal.getUser());
        return ResponseEntity.noContent().build();
    }
}
