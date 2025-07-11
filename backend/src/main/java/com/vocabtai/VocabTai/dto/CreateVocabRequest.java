package com.vocabtai.VocabTai.dto;

import lombok.Data;

@Data
public class CreateVocabRequest {
    private String word;
    private String meaning;
    private String context;
    private String pronunciation;
    private Integer topicId;
}
