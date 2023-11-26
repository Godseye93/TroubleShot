package com.orientalSalad.troubleShot.statics.dto;

import java.util.List;

import com.orientalSalad.troubleShot.global.dto.ResultDTO;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
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
public class ResponseTroubleShootingTypeGroupDTO extends ResultDTO {
	@Schema(description = "등록한 기기 별 트러블 슈팅 개수 목록")
	List<TroubleShootingTypeGroupDTO> troubleShootingTypeGroupList;
	@Schema(description = "총 개수")
	long totalCount;
}
