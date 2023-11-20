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
public class TroubleShootingAnswerDTO extends BaseDTO {
	@Schema(description = "제목")
	private String title;
	@Schema(description = "내용")
	private String context;
	@Schema(description = "작성자")
	private SimpleMemberDTO writer;
	@Schema(description = "좋아요 수",hidden = true)
	private int likeCount;
	@Schema(description = "덧글 수",hidden = true)
	private int replyCount;
	@Schema(description = "게시물 pk")
	private long troubleSeq;
	@Schema(description = "덧글",hidden = true)
	private Set<TroubleShootingAnswerReplyDTO> replies;
	@Schema(description = "로그인한 유저가 좋아요를 눌렀는지 확인",hidden = true)
	private boolean loginLike;
	@Schema(description = "채택 여부")
	private boolean selected;

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (!(o instanceof TroubleShootingAnswerDTO))
			return false;

		TroubleShootingAnswerDTO that = (TroubleShootingAnswerDTO)o;

		return this.getSeq() == that.getSeq();
	}

	@Override
	public int hashCode() {
		return Objects.hash(getSeq());
	}

	@Override
	public String toString(){
		return this.seq+" title: "+this.title+" context: "+context+" creatTime : "+createTime+" like count : "+likeCount+" trouble seq : "+troubleSeq;
	}
}