package com.orientalSalad.troubleShot.statics.dto;

import com.orientalSalad.troubleShot.global.dto.ResultDTO;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import lombok.extern.log4j.Log4j2;

@Getter
@Setter
@SuperBuilder
@Log4j2
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ResponseCountTroubleAndAnswerDTO extends ResultDTO {
	@Schema(description = "등록한 트러블 문서 개수")
	long troubleCount;
	@Schema(description = "등록한 답변 개수")
	long answerCount;
	@Schema(description = "채택된 답변 개수")
	long selectedAnswerCount;
	@Schema(description = "채택률")
	double selectedRate;
}
