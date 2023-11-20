package com.orientalSalad.troubleShot.statics.dto;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.log4j.Log4j2;

@Getter
@Setter
@Builder
@Log4j2
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class TagHistoryDTO {
	@Schema(description = "태그 이름")
	String name;
	@Schema(description = "총 사용 개수")
	long totalCount;
	@Schema(description = "일일 태그 히스토리 목록")
	List<TagDailyHistoryDTO> dailyHistoryList;
}
