package com.orientalSalad.troubleShot.statics.dto;

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
public class RequestTagHistoryDTO {
	@Schema(description = "유저 pk")
	long userSeq;
	@Schema(description = "검색할 기간 일수")
	Long day;
	@Schema(description = "검색할 태그 개수")
	Long count;
}
