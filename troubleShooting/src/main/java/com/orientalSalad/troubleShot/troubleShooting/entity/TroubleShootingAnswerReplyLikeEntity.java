package com.orientalSalad.troubleShot.troubleShooting.entity;

import com.orientalSalad.troubleShot.global.entity.BaseEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Table(name= "trouble_shooting_answer_reply_like")
@Entity
@Getter
@NoArgsConstructor
@ToString
public class TroubleShootingAnswerReplyLikeEntity extends BaseEntity {
	private Long userSeq;
	private Long answerReplySeq;

	@Builder
	public TroubleShootingAnswerReplyLikeEntity(Long userSeq, Long answerReplySeq){
		this.userSeq = userSeq;
		this.answerReplySeq = answerReplySeq;
	}
}
