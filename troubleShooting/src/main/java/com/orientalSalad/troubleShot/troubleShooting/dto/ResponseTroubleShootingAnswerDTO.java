package com.orientalSalad.troubleShot.troubleShooting.dto;

import com.orientalSalad.troubleShot.global.dto.ResultDTO;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResponseTroubleShootingAnswerDTO extends ResultDTO {
	@Schema(description = "솔루션")
	TroubleShootingAnswerDTO troubleShootingAnswer;
}