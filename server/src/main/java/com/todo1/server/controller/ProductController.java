package com.todo1.server.controller;

import com.todo1.server.repository.ProductRepository;
import com.todo1.server.model.Product;
import java.util.Collection;
import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {
    
    private ProductRepository repository;

    public ProductController(ProductRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/products")
    public Collection<Product> coolCars() {
        return repository.findAll().stream()
                .collect(Collectors.toList());
    }
}
