package com.vocabtai.VocabTai.repository;

import com.vocabtai.VocabTai.model.UserVocabulary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface UserVocabularyRepository extends JpaRepository<UserVocabulary, Integer> {
    List<UserVocabulary> findByUserIdOrderByAddedDateDesc(Integer userId);

    List<UserVocabulary> findByUserIdAndAddedDate(Integer userId, LocalDate addedDate);

    boolean existsByUserIdAndVocabularyId(Integer userId, Integer vocabularyId);
}
