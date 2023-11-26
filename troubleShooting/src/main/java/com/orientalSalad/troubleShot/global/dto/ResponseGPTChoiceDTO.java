package com.orientalSalad.troubleShot.global.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
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
public class ResponseGPTChoiceDTO{
	int index;
	@JsonProperty("finish_reason")
	String finishReason;
	@JsonProperty("message")
	ResponseGPTMessageDTO message;
}