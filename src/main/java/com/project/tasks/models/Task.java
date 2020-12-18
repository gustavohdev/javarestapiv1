package com.project.tasks.models;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.Date;

import java.text.DateFormat; 
import java.text.SimpleDateFormat; 

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) 
    private Long id;
    private String event;
    private String description;
    private Boolean status;
    //private LocalDate start;
    //private LocalDate end;
    private Date start;
    private Date end;

}