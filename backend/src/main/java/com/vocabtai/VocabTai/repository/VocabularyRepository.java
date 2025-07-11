package com.vocabtai.VocabTai.repository;

import com.vocabtai.VocabTai.model.Vocabulary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VocabularyRepository extends JpaRepository<Vocabulary, Integer> {
    List<Vocabulary> findByTopicId(Integer topicId);
}
