package com.vocabtai.VocabTai.controller;

import com.vocabtai.VocabTai.model.Topic;
import com.vocabtai.VocabTai.repository.TopicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.vocabtai.VocabTai.dto.CreateTopicRequest;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/topics")
@RequiredArgsConstructor
public class TopicController {

    private final TopicRepository topicRepository;

    @GetMapping
    public List<Topic> getAll() {
        return topicRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Topic> getById(@PathVariable Integer id) {
        return topicRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody CreateTopicRequest topic) {
        if (topic.getName() == null || topic.getDescription() == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Missing name or description"));
        }
        Topic newTopic = Topic.builder()
                .name(topic.getName())
                .description(topic.getDescription())
                .build();
        Topic saved = topicRepository.save(newTopic);
        return ResponseEntity.status(201).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody CreateTopicRequest updated) {
        return topicRepository.findById(id)
                .map(topic -> {
                    topic.setName(updated.getName() != null ? updated.getName() : topic.getName());
                    topic.setDescription(
                            updated.getDescription() != null ? updated.getDescription() : topic.getDescription());
                    Topic saved = topicRepository.save(topic);
                    return ResponseEntity.ok(saved);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        return topicRepository.findById(id)
                .map(topic -> {
                    topicRepository.delete(topic);
                    return ResponseEntity.ok(Map.of("message", "Deleted successfully"));
                }).orElse(ResponseEntity.status(404).body(Map.of("message", "Not found")));
    }
}
