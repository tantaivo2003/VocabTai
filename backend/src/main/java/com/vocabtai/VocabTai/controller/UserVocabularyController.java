package com.vocabtai.VocabTai.controller;

import com.vocabtai.VocabTai.dto.AddUserVocabularyRequest;
import com.vocabtai.VocabTai.model.UserVocabulary;
import com.vocabtai.VocabTai.model.Vocabulary;

import com.vocabtai.VocabTai.repository.UserVocabularyRepository;
import com.vocabtai.VocabTai.repository.VocabularyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user-vocabularies")
@RequiredArgsConstructor
public class UserVocabularyController {

    private final UserVocabularyRepository userVocabularyRepository;
    private final VocabularyRepository vocabularyRepository;

    // Lấy tất cả từ vựng user đang học
    @GetMapping("/{userId}")
    public List<UserVocabulary> getUserVocabularyList(@PathVariable Integer userId) {
        return userVocabularyRepository.findByUserIdOrderByAddedDateDesc(userId);
    }

    // Lấy từ vựng của user theo ngày
    @GetMapping("/{userId}/date/{date}")
    public List<UserVocabulary> getUserVocabularyByDate(
            @PathVariable Integer userId,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return userVocabularyRepository.findByUserIdAndAddedDate(userId, date);
    }

    // Thêm từ vựng cho user
    @PostMapping
    public ResponseEntity<?> addWordToUser(@RequestBody AddUserVocabularyRequest request) {
        Integer userId = request.getUser_id();
        Integer vocabId = request.getVocabulary_id();
        String addedDateStr = request.getAdded_date();

        if (userId == null || vocabId == null || addedDateStr == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Missing fields"));
        }

        // Kiểm tra từ vựng có tồn tại không
        Vocabulary vocab = vocabularyRepository.findById(vocabId).orElse(null);
        if (vocab == null) {
            return ResponseEntity.status(404).body(Map.of("message", "Vocabulary not found"));
        }

        UserVocabulary uv = UserVocabulary.builder()
                .userId(userId)
                .vocabulary(vocab)
                .addedDate(LocalDate.parse(addedDateStr))
                .isLearned(false)
                .build();

        return ResponseEntity.status(201).body(userVocabularyRepository.save(uv));
    }

    // Đánh dấu đã học

    // Xoá từ khỏi danh sách
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUserVocabulary(@PathVariable Integer id) {
        return userVocabularyRepository.findById(id)
                .map(uv -> {
                    userVocabularyRepository.delete(uv);
                    return ResponseEntity.ok(Map.of("message", "Deleted"));
                })
                .orElse(ResponseEntity.status(404).body(Map.of("message", "Not found")));
    }
}
