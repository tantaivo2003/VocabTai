package com.vocabtai.VocabTai.repository;

import com.vocabtai.VocabTai.model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicRepository extends JpaRepository<Topic, Integer> {
}
