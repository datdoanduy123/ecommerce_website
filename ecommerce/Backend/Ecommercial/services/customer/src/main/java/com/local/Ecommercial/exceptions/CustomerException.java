package com.local.Ecommercial.exceptions;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class CustomerException extends RuntimeException{
    private final String mgs;
}
