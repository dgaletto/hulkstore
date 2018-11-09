package com.todo1.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import com.todo1.server.model.Product;

@RepositoryRestResource
public interface ProductRepository extends JpaRepository<Product, Long> {
    
}
