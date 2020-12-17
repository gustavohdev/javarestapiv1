package com.project.tasks.repositories;

import com.project.tasks.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task,Long> {


}