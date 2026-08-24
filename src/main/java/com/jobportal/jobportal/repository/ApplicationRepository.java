package com.jobportal.jobportal.repository;

import com.jobportal.jobportal.entity.Application;
import com.jobportal.jobportal.entity.Job;
import com.jobportal.jobportal.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
   List<Application> findByApplicant(User user);
   List<Application> findByJob(Job job);
}
