package com.vocabtai.VocabTai.controller;

import com.vocabtai.VocabTai.model.Topic;
import com.vocabtai.VocabTai.model.Vocabulary;
import com.vocabtai.VocabTai.repository.TopicRepository;
import com.vocabtai.VocabTai.repository.VocabularyRepository;
import com.vocabtai.VocabTai.dto.CreateVocabRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/vocabularies")
@RequiredArgsConstructor
public class VocabularyController {

    private final VocabularyRepository vocabularyRepository;
    private final TopicRepository topicRepository;

    @GetMapping
    public List<Vocabulary> getAll(@RequestParam(required = false) Integer topic_id) {
        if (topic_id != null) {
            return vocabularyRepository.findByTopicId(topic_id);
        }
        return vocabularyRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Integer id) {
        return vocabularyRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody CreateVocabRequest request) {
        Optional<Topic> topicOpt = topicRepository.findById(request.getTopicId());
        if (topicOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid topic_id"));
        }

        Vocabulary newVocabulary = Vocabulary.builder()
                .word(request.getWord())
                .meaning(request.getMeaning())
                .context(request.getContext())
                .pronunciation(request.getPronunciation())
                .topic(topicOpt.get())
                .build();

        Vocabulary saved = vocabularyRepository.save(newVocabulary);
        return ResponseEntity.status(201).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody CreateVocabRequest updated) {
        return vocabularyRepository.findById(id)
                .map(vocab -> {
                    vocab.setWord(updated.getWord());
                    vocab.setMeaning(updated.getMeaning());
                    vocab.setContext(updated.getContext());
                    vocab.setPronunciation(updated.getPronunciation());

                    if (updated.getTopicId() != null) {
                        topicRepository.findById(updated.getTopicId())
                                .ifPresent(vocab::setTopic);
                    }

                    Vocabulary saved = vocabularyRepository.save(vocab);
                    return ResponseEntity.ok(saved);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        return vocabularyRepository.findById(id)
                .map(vocab -> {
                    vocabularyRepository.delete(vocab);
                    return ResponseEntity.ok(Map.of("message", "Deleted successfully"));
                })
                .orElse(ResponseEntity.status(404).body(Map.of("message", "Not found")));
    }
}
