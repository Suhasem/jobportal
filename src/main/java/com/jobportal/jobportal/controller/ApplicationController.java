package com.jobportal.jobportal.controller;

import com.jobportal.jobportal.dto.ApplicationResponse;
import com.jobportal.jobportal.security.UserPrincipal;
import com.jobportal.jobportal.service.ApplicationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping("/{jobId}")
    public ResponseEntity<ApplicationResponse> apply(@PathVariable Long jobId,
                                                       @AuthenticationPrincipal UserPrincipal principal) {
        ApplicationResponse response = applicationService.applyToJob(jobId, principal.getUser());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/my")
    public ResponseEntity<List<ApplicationResponse>> myApplications(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(applicationService.getMyApplications(principal.getUser()));
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<ApplicationResponse>> applicationsForJob(@PathVariable Long jobId,
                                                                          @AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(applicationService.getApplicationsForJob(jobId, principal.getUser()));
    }
}
