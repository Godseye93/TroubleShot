package com.orientalSalad.troubleShot.troubleShooting.entity;

import com.orientalSalad.troubleShot.global.entity.BaseEntity;
import com.orientalSalad.troubleShot.troubleShooting.dto.TroubleShootingAnswerDTO;
import com.orientalSalad.troubleShot.troubleShooting.dto.TroubleShootingAnswerReplyDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Table(name= "trouble_shooting_answer_reply")
@Entity
@Getter
@NoArgsConstructor
@ToString
public class TroubleShootingAnswerReplyEntity extends BaseEntity {
	@Column(columnDefinition = "TEXT")
	private String context;
	private long writerSeq;
	@Column(columnDefinition = "int4 DEFAULT '0'")
	private int likeCount;
	private long answerSeq;

	@Builder
	public TroubleShootingAnswerReplyEntity(
		String context,
		long writerSeq,
		int likeCount,
		long answerSeq){
		this.context = context;
		this.writerSeq = writerSeq;
		this.likeCount = likeCount;
		this.answerSeq = answerSeq;
	}
	public void update(TroubleShootingAnswerReplyDTO troubleShootingAnswerReplyDTO){
		this.context = troubleShootingAnswerReplyDTO.getContext();
	}
	public void increaseLike(){
		this.likeCount++;
	}
	public void decreaseLike(){
		if(this.likeCount > 0){
			this.likeCount--;
		}
	}
}
