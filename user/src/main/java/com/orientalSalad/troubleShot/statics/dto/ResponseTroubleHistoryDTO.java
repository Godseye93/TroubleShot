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
public class ResponseTroubleHistoryDTO extends ResultDTO {
	@Schema(description = "작성한 트러블 슈팅 문서 히스토리")
	List<TroubleShootingHistoryDTO> troubleShootingHistoryList;
}
