package com.orientalSalad.troubleShot.statics.dto;

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
public class UserRankDTO {
	@Schema(description = "유저 pk")
	long userSeq;
	@Schema(description = "유저보다 많은 개수")
	long upperCount;
	@Schema(description = "전제 개수")
	long totalCount;
}
