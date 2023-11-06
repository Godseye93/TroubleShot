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
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TroubleShootingAnswerReplyDTO extends BaseDTO {
	@Schema(description = "내용")
	private String context;
	@Schema(description = "작성자")
	SimpleMemberDTO writer;
	@Schema(description = "좋아요 수",hidden = true)
	private int likeCount;
	@Schema(description = "문서 pk")
	private long answerSeq;

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (!(o instanceof TroubleShootingReplyDTO))
			return false;

		TroubleShootingReplyDTO that = (TroubleShootingReplyDTO)o;

		return this.seq == that.seq;
	}

	@Override
	public int hashCode() {
		return Objects.hash(getSeq());
	}
}