package com.vocabtai.VocabTai.dto;

import lombok.Data;

import java.time.ZonedDateTime;

@Data
public class CreateTodoRequest {
    private String title;
    private String description;
    private Integer userId;
    private ZonedDateTime start_time;
}
