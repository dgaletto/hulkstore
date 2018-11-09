package com.todo1.server;

import com.todo1.server.model.Product;
import com.todo1.server.repository.ProductRepository;
import java.util.stream.Stream;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

        @Bean
        ApplicationRunner init(ProductRepository repository) {
            return args -> {
                Stream.of("Muñeco Hulk", "Stickers Wolverine", "Cartuchera Spiderman", "Taza batman").forEach(name -> {
                    Product product = new Product();
                    product.setName(name);
                    repository.save(product);
                });
                repository.findAll().forEach(System.out::println);
            };
        }
}
