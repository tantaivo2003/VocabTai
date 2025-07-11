package com.vocabtai.VocabTai.controller;

import com.vocabtai.VocabTai.dto.CreateTodoRequest;
import com.vocabtai.VocabTai.dto.ChangeTodoRequest;

import com.vocabtai.VocabTai.model.Todo;

import com.vocabtai.VocabTai.repository.UserRepository;
import com.vocabtai.VocabTai.repository.TodoRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
public class TodoController {
    private final TodoRepository todoRepository;
    private final UserRepository userRepository;

    @GetMapping
    public List<Todo> getAll() {
        return todoRepository.findAll();
    }

    @GetMapping("/user/{id}")
    public List<Todo> getByUser(@PathVariable Integer id) {
        return todoRepository.findAllByUserId(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Todo> getById(@PathVariable Integer id) {
        return todoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public List<Todo> search(@RequestParam String q) {
        return todoRepository.searchTodos(q);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody CreateTodoRequest request) {
        // Kiểm tra user_id có hợp lệ không
        boolean userExists = userRepository.existsById(request.getUserId());
        if (!userExists) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "User not found"));
        }

        Todo todo = Todo.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .userId(request.getUserId()) // Dùng trực tiếp user_id
                .startTime(request.getStart_time())
                .completed(false)
                .createdAt(ZonedDateTime.now())
                .updatedAt(ZonedDateTime.now())
                .build();

        Todo saved = todoRepository.save(todo);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Todo> update(@PathVariable Integer id, @RequestBody ChangeTodoRequest updated) {
        return todoRepository.findById(id)
                .map(todo -> {
                    todo.setTitle(updated.getTitle());
                    todo.setDescription(updated.getDescription());
                    return ResponseEntity.ok(todoRepository.save(todo));
                }).orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<Todo> toggle(@PathVariable Integer id) {
        return todoRepository.findById(id)
                .map(todo -> {
                    todo.setCompleted(!todo.getCompleted());
                    todo.setEndTime(todo.getCompleted() ? ZonedDateTime.now() : null);
                    todo.setUpdatedAt(ZonedDateTime.now());
                    return ResponseEntity.ok(todoRepository.save(todo));
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        Optional<Todo> optionalTodo = todoRepository.findById(id);
        if (optionalTodo.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Todo not found"));
        }

        todoRepository.delete(optionalTodo.get());
        return ResponseEntity.ok(Map.of("message", "Todo deleted successfully"));
    }
}
