package com.orientalSalad.troubleShot.troubleShooting.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SearchTroubleShootingDTO{
	@Schema(description = "검색어")
	private String keyword;
	@Schema(description = "한번에 보여줄 개수")
	private int pageSize;
	@Schema(description = "페이지 번호")
	private int pageNo;
	@Schema(description = "카테고리")
	private String category;
	@Schema(description = "풀이 여부")
	private Boolean solved;
	@Schema(description = "다중 태그")
	private List<String> tags;
	@Schema(description = "작성자 이름")
	private String writer;
	@Schema(description = "게시물 pk")
	private Long troubleSeq;
	@Schema(description = "작성자 pk")
	private Long writerSeq;
	@Schema(description = "로그인 유저 pk")
	private Long loginSeq;
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@Schema(description = "시작 검색 시간")
	private LocalDateTime startTime;
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@Schema(description = "끝 검색 시간")
	private LocalDateTime endTime;
	@Schema(description = "정렬 방식 0: 최신순,1 :좋아요 많음, 2: 댓글 많음, 3: 조회수 높음")
	private int order;

	public String getKeyword() {
		return keyword;
	}

	public int getPageSize() {
		return pageSize;
	}

	public int getPageNo() {
		return pageNo;
	}

	public Boolean getSolved() {
		return solved;
	}

	public List<String> getTags() {
		return tags;
	}

	public String getWriter() {
		return writer;
	}

	public LocalDateTime getStartTime() {
		return startTime;
	}

	public LocalDateTime getEndTime() {
		return endTime;
	}

	public int getOrder() {
		return order;
	}
}