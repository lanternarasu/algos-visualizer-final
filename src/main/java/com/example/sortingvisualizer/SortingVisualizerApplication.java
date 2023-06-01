package com.example.sortingvisualizer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;

@SpringBootApplication
@RestController
public class SortingVisualizerApplication {

    public static void main(String[] args) {
        SpringApplication.run(SortingVisualizerApplication.class, args);
    }
}
