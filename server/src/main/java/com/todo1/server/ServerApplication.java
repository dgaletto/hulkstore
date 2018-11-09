package com.todo1.server;

import com.todo1.server.model.Product;
import com.todo1.server.model.User;
import com.todo1.server.repository.ProductRepository;
import com.todo1.server.repository.UserRepository;
import java.util.Random;
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
        ApplicationRunner init(UserRepository userRepository, ProductRepository productRepository) {
            Random rand = new Random();
            return args -> {
                
                generateUsers(userRepository);
                
                Stream.of("T-Shirt - Wolverine", "Cup - Superman", "Pillow - Spiderman").forEach(name -> {
                    Product product = new Product();
                    product.setName(name);
                    product.setQuantity(rand.nextInt(20));
                    double price = (double)Math.round(rand.nextDouble()*10000)/100;
                    product.setPrice(price);
                    productRepository.save(product);
                });
                productRepository.findAll().forEach(System.out::println);
                userRepository.findAll().forEach(System.out::println);
            };
        }
        
        
        public void generateUsers(UserRepository userRepository) {
            User user = new User();
            user.setFirstName("Lilianna");
            user.setLastName("Riddle");
            userRepository.save(user);
            
            User user1 = new User();
            user1.setFirstName("Killian");
            user1.setLastName("Brock");
            userRepository.save(user1);
            
            User user2 = new User();
            user2.setFirstName("Phoebe");
            user2.setLastName("Joyce");
            userRepository.save(user2);
                
        }
}
