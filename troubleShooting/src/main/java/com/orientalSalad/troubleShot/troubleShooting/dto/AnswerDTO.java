package com.orientalSalad.troubleShot.troubleShooting.dto;

import java.util.Objects;
import java.util.Set;

import com.orientalSalad.troubleShot.global.dto.BaseDTO;
import com.orientalSalad.troubleShot.member.dto.SimpleMemberDTO;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AnswerDTO extends BaseDTO {
	@Schema(description = "제목")
	private String title;
	@Schema(description = "내용")
	private String context;
	@Schema(description = "작성자")
	private SimpleMemberDTO writer;
	@Schema(description = "좋아요 수")
	private int likeCount;
	@Schema(description = "덧글 수")
	private int replyCount;
	@Schema(description = "게시물 pk")
	private long troubleSeq;
	@Schema(description = "덧글",hidden = true)
	private Set<TroubleShootingReplyDTO> replies;
	@Schema(description = "로그인한 유저가 좋아요를 눌렀는지 확인",hidden = true)
	private boolean loginLike;

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (!(o instanceof TroubleShootingReplyDTO))
			return false;

		AnswerDTO that = (AnswerDTO)o;

		return this.seq == that.seq;
	}

	@Override
	public int hashCode() {
		return Objects.hash(getSeq());
	}
}