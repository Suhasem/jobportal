package com.jobportal.jobportal.repository;

import com.jobportal.jobportal.entity.Job;
import com.jobportal.jobportal.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<Job,Long> {
   List<Job> findByPostedBy(User user);
}
