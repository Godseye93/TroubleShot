package com.orientalSalad.troubleShot.troubleShooting.entity;

import com.orientalSalad.troubleShot.global.entity.BaseEntity;
import com.orientalSalad.troubleShot.troubleShooting.dto.TroubleShootingAnswerDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Table(name= "trouble_shooting_answer")
@Entity
@Getter
@NoArgsConstructor
@ToString
public class TroubleShootingAnswerEntity extends BaseEntity {
	@Column(columnDefinition = "TEXT")
	private String title;
	@Column(columnDefinition = "TEXT")
	private String context;
	private long writerSeq;
	@Column(columnDefinition = "int4 DEFAULT '0'")
	private int likeCount;
	@Column(columnDefinition = "int4 DEFAULT '0'")
	private int replyCount;
	private long troubleSeq;

	@Builder
	public TroubleShootingAnswerEntity(String title,
		String context,
		long writerSeq,
		int likeCount,
		int replyCount,
		long troubleSeq){
		this.title = title;
		this.context = context;
		this.writerSeq = writerSeq;
		this.likeCount = likeCount;
		this.replyCount = replyCount;
		this.troubleSeq = troubleSeq;
	}
	public void update(TroubleShootingAnswerDTO troubleShootingAnswerDTO){
		this.title = troubleShootingAnswerDTO.getTitle();
		this.context = troubleShootingAnswerDTO.getContext();
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
