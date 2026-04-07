package com.example.HotelBookingSystem.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "addresses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long addressId;

    @OneToOne(mappedBy = "address")
    @JsonIgnore
    private Hotel hotel;

    private String street;
    private String city;
    private String state;
    private String country;
    private String zipCode;
}
