package com.orientalSalad.troubleShot.troubleShooting.entity;

import com.orientalSalad.troubleShot.global.entity.BaseEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Table(name= "trouble_shooting_answer_like")
@Entity
@Getter
@NoArgsConstructor
@ToString
public class TroubleShootingAnswerLikeEntity extends BaseEntity {
	private Long userSeq;
	private Long answerSeq;

	@Builder
	public TroubleShootingAnswerLikeEntity(Long userSeq,Long answerSeq){
		this.userSeq = userSeq;
		this.answerSeq = answerSeq;
	}
}
