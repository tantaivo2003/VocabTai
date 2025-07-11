package com.vocabtai.VocabTai.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.ZonedDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "user_vocabularies")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserVocabulary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer userId;

    @JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vocabulary_id", nullable = false)
    private Vocabulary vocabulary;

    @Column(name = "added_date", nullable = false)
    private LocalDate addedDate;

    @Builder.Default
    @Column(name = "is_learned", nullable = false)
    private Boolean isLearned = false;

    private ZonedDateTime learnedAt;
}
