
package com.todo1.server.controller;

import com.todo1.server.model.User;
import com.todo1.server.repository.UserRepository;
import java.util.Collection;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:4200")
public class UserController {
    
    private UserRepository repository;

    public UserController(UserRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/users")
    public Collection<User> users() {
        return repository.findAll().stream()
                .collect(Collectors.toList());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> retrieveUser(@PathVariable long id) {
        Optional<User> user = repository.findById(id);

        if (!user.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok().body(user.get());
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable long id) {
        repository.deleteById(id);
    }

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User savedUser = repository.save(user);

        return ResponseEntity.ok().body(savedUser);

    }

    @PutMapping("/users/{id}")
    public ResponseEntity<Object> updateUser(
            @RequestBody User user,
            @PathVariable long id) {

        Optional<User> userOptional = repository.findById(id);

        if (!userOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        user.setId(id);

        User savedUser = repository.save(user);

        return ResponseEntity.ok().body(savedUser);
    }
    
}
