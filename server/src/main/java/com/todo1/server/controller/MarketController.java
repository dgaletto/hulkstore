
package com.todo1.server.controller;

import com.todo1.server.model.Market;
import com.todo1.server.repository.MarketRepository;
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
public class MarketController {
    
    private MarketRepository repository;

    public MarketController(MarketRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/markets")
    public Collection<Market> markets() {
        return repository.findAll().stream()
                .collect(Collectors.toList());
    }

    @GetMapping("/markets/{id}")
    public ResponseEntity<Market> retrieveMarket(@PathVariable long id) {
        Optional<Market> market = repository.findById(id);

        if (!market.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok().body(market.get());
    }

    @DeleteMapping("/markets/{id}")
    public void deleteMarket(@PathVariable long id) {
        repository.deleteById(id);
    }

    @PostMapping("/markets")
    public ResponseEntity<Market> createMarket(@RequestBody Market market) {
        Market savedMarket = repository.save(market);

        return ResponseEntity.ok().body(savedMarket);

    }

    @PutMapping("/markets/{id}")
    public ResponseEntity<Object> updateMarket(
            @RequestBody Market market,
            @PathVariable long id) {

        Optional<Market> marketOptional = repository.findById(id);

        if (!marketOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        market.setId(id);

        Market savedMarket = repository.save(market);

        return ResponseEntity.ok().body(savedMarket);
    }
    
}
