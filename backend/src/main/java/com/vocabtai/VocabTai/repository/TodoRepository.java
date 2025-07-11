package com.vocabtai.VocabTai.repository;

import com.vocabtai.VocabTai.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TodoRepository extends JpaRepository<Todo, Integer> {
    List<Todo> findAllByUserId(Integer userId);

    @Query("SELECT t FROM Todo t WHERE LOWER(t.title) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(t.description) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Todo> searchTodos(@Param("query") String query);
}
