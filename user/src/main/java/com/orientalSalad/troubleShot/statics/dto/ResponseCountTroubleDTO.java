package com.orientalSalad.troubleShot.statics.dto;

import java.util.List;

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
public class ResponseCountTroubleDTO extends ResultDTO {
	@Schema(description = "해결 트러블 문서 개수")
	long solvedCount;
	@Schema(description = "미해결 트러블 문서 개수")
	long notSolvedCount;
	@Schema(description = "총 트러블 문서 개수")
	long totalCount;
}
