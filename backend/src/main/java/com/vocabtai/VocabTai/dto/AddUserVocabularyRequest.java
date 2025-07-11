package com.vocabtai.VocabTai.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Schema(description = "Request body để thêm từ vào danh sách học của user")
@Data
public class AddUserVocabularyRequest {

    @Schema(description = "ID của người dùng", example = "1", required = true)
    private Integer user_id;

    @Schema(description = "ID của từ vựng", example = "10", required = true)
    private Integer vocabulary_id;

    @Schema(description = "Ngày thêm từ (yyyy-MM-dd)", example = "2025-07-10", required = true)
    private String added_date;
}
