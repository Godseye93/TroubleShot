package com.orientalSalad.troubleShot.global.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ResponseGPTUsageDTO {
	@JsonProperty("prompt_tokens")
	int promptTokens;
	@JsonProperty("completion_tokens")
	int completionTokens;
	@JsonProperty("total_tokens")
	int totalTokens;
}