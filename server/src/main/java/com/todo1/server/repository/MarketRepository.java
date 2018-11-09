package com.todo1.server.repository;

import com.todo1.server.model.Market;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface MarketRepository extends JpaRepository<Market, Long> {
    
}
