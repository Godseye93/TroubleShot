package com.orientalSalad.troubleShot.troubleShooting.entity;

import com.orientalSalad.troubleShot.global.entity.BaseEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Table(name= "trouble_shooting_reply_like")
@Entity
@Getter
@NoArgsConstructor
@ToString
public class TroubleShootingReplyLikeEntity extends BaseEntity {
	private Long userSeq;
	private Long troubleSeq;
	private Long replySeq;

	@Builder
	public TroubleShootingReplyLikeEntity(Long userSeq, Long troubleSeq,Long replySeq){
		this.userSeq = userSeq;
		this.troubleSeq = troubleSeq;
		this.replySeq = replySeq;
	}
}
