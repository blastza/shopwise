package com.shopwise.product.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ReviewRequest {

    @Min(1) @Max(5)
    @NotNull(message = "Rating is required")
    private Integer rating;

    private String comment;
}
