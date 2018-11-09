package com.todo1.server.controller;

import com.todo1.server.repository.ProductRepository;
import com.todo1.server.model.Product;
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
public class ProductController {

    private ProductRepository repository;

    public ProductController(ProductRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/products")
    public Collection<Product> products() {
        return repository.findAll().stream()
                .collect(Collectors.toList());
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> retrieveProduct(@PathVariable long id) {
        Optional<Product> product = repository.findById(id);

        if (!product.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok().body(product.get());
    }

    @DeleteMapping("/products/{id}")
    public void deleteProduct(@PathVariable long id) {
        repository.deleteById(id);
    }

    @PostMapping("/products")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product savedProduct = repository.save(product);

        return ResponseEntity.ok().body(savedProduct);

    }

    @PutMapping("/products/{id}")
    public ResponseEntity<Object> updateProduct(
            @RequestBody Product product,
            @PathVariable long id) {

        Optional<Product> productOptional = repository.findById(id);

        if (!productOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        product.setId(id);

        Product savedProduct = repository.save(product);

        return ResponseEntity.ok().body(savedProduct);
    }

}
