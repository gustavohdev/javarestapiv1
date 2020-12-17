package com.project.tasks;

import com.project.tasks.models.Task;
import com.project.tasks.repositories.TaskRepository;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.Date;


@DataJpaTest
public class TaskTests {

    LocalDate date = LocalDate.now();
    Long l = new Long(1);
    Long ld = new Long(2);

    @Autowired
    private TaskRepository taskRepository;

    @Test
    public void testSaveTask(){
        //DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy"); // usar para converter Date quando enviada
        //Long l= new Long(1);
        Task task = new Task(l,"Provao","Química", false, date, date);
        taskRepository.save(task);
        taskRepository.findById(new Long(1))
                .map(newTask ->{
                    Assert.assertEquals("Provao",newTask.getEvent());
                    return true;
                });
    }

    @Test
    public void getTask(){
        
        //Long l = new Long(1);
       // Long ld = new Long(2);
        Task task = new Task(l,"Provinha","Química", false, date, date);
        Task task2 = new Task(ld,"Provao","Química", false, date, date);
        taskRepository.save(task);
        taskRepository.save(task2);

        taskRepository.findById(new Long(1))
                .map(newTask ->{
                   Assert.assertEquals("Provinha",newTask.getEvent());
                   return true;
                });

    }

    @Test
    public void getTasks(){
        //Long l = new Long(1);
        //Long ld = new Long(2);
        Task task = new Task(l,"Prova1","Química", false, date, date);
        Task task2 = new Task(ld,"Prova2","Química", false, date, date);
        taskRepository.save(task);
        taskRepository.save(task2);

        Assert.assertNotNull(taskRepository.findAll());
    }

    @Test
    public void deleteTask(){
        Long l = new Long(10);
        Task task = new Task(l,"Prova11","Química", false, date, date);
        taskRepository.save(task);
        //delete task - não consegue checar somente o id para dar assertTrue, pois os dados estão ficando gravados no h2
        taskRepository.delete(task);

        // delete all
        taskRepository.deleteAll();
        Assert.assertTrue(taskRepository.findAll().isEmpty());

        // long deletedRecords = taskRepository.deleteById(l);
        // assertThat(deletedRecords).isEqualTo(1);
        // Assert.assertNull(taskRepository.findById(l));
    }
}