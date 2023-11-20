package com.orientalSalad.troubleShot.statics.dto;

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
public class ResponsePolygonDTO extends ResultDTO {
	@Schema(description = "유저 pk")
	long userSeq;
	@Schema(description = "총 질문 순위")
	double troubleRank;
	@Schema(description = "답변 순위")
	double answerRank;
	@Schema(description = "태그 다양성 순위")
	double tagTypeRank;
	@Schema(description = "댓글 순위")
	double replyRank;
	@Schema(description = "일일 최대 질문량 순위")
	double dailyTroubleRank;

}
