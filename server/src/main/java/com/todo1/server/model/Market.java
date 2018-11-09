package com.todo1.server.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
@NoArgsConstructor
@JsonSerialize
public class Market {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private @Getter @Setter String date;
    private @Getter @Setter String products;
    private @Getter @Setter String user;
    
}
