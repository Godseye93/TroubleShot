package com.orientalSalad.troubleShot.troubleShooting.dto;

import java.util.List;
import java.util.Set;

import com.orientalSalad.troubleShot.global.dto.BaseDTO;
import com.orientalSalad.troubleShot.member.dto.SimpleMemberDTO;

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
public class TroubleShootingDTO extends BaseDTO {
	@Schema(description = "제목")
	private String title;
	@Schema(description = "카테고리")
	private String category;
	@Schema(description = "내용")
	private String context;
	@Schema(description = "작성자")
	private SimpleMemberDTO writer;
	@Schema(description = "해결 여부")
	private boolean solved;
	@Schema(description = "조회 수")
	private int viewCount;
	@Schema(description = "좋아요 수")
	private int likeCount;
	@Schema(description = "덧글 수")
	private int replyCount;
	@Schema(description = "다중 태그")
	private List<String> tags;
	@Schema(description = "덧글")
	private Set<TroubleShootingReplyDTO> replies;
	@Schema(description = "로그인한 유저가 좋아요를 눌렀는지 확인")
	private boolean loginLike;
}