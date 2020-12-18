package com.project.tasks.controllers;

import com.project.tasks.exceptions.ResourceNotFoundException;
import com.project.tasks.models.Task;
import com.project.tasks.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TaskController {
    private TaskRepository taskRepository;

    @Autowired
    public TaskController(TaskRepository taskRepository){
        this.taskRepository = taskRepository;
    }

    @PostMapping("/task/save")
    public Task saveTask(@RequestBody Task task){
        return this.taskRepository.save(task);
    }

    @GetMapping("/task/all")
    public ResponseEntity<List<Task>> getTasks(){
        return ResponseEntity.ok(
          this.taskRepository.findAll()
        );
    }

    @GetMapping("/task/{id}")
    public ResponseEntity<Task> getTask(@PathVariable(value = "id" ) Long id){
        Task task = this.taskRepository.findById(id).orElseThrow(
                ()-> new ResourceNotFoundException("Task not found")
        );

        return  ResponseEntity.ok().body(task);
    }

    @PutMapping("task/{id}")
    public Task updateUser(@RequestBody Task newTask, @PathVariable(value = "id") Long id){
        return this.taskRepository.findById(id)
                .map(task -> {
                    task.setEvent(newTask.getEvent());
                    task.setDescription(newTask.getDescription());
                    task.setStatus(newTask.getStatus());
                    task.setStart(newTask.getStart());
                    task.setEnd(newTask.getEnd());
                    return this.taskRepository.save(task);
 
                })
                .orElseGet(()->{
                   newTask.setId(id);
                   return this.taskRepository.save(newTask);
                });
    }

    @DeleteMapping("task/{id}")
    public ResponseEntity<Void> removeTask(@PathVariable(value = "id") Long id){
        Task task =this.taskRepository.findById(id).orElseThrow(
                ()-> new ResourceNotFoundException("User not found"+id)
        );

        this.taskRepository.delete(task);
        return ResponseEntity.ok().build();
    }




}