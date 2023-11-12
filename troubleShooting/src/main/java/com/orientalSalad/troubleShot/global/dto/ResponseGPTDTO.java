package com.orientalSalad.troubleShot.global.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.orientalSalad.troubleShot.troubleShooting.dto.TroubleShootingDTO;

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
public class ResponseGPTDTO {
	@Schema(description = "트러블 슈팅 문서")
	String id;
	String object;
	String created;
	String model;
	@JsonProperty("choices")
	List<ResponseGPTChoiceDTO> choices;
	@JsonProperty("usage")
	ResponseGPTUsageDTO usage;
}