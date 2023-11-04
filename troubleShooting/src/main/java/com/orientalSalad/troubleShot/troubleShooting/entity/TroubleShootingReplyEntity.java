package com.orientalSalad.troubleShot.troubleShooting.entity;

import com.orientalSalad.troubleShot.global.entity.BaseEntity;
import com.orientalSalad.troubleShot.troubleShooting.dto.TroubleShootingDTO;
import com.orientalSalad.troubleShot.troubleShooting.dto.TroubleShootingReplyDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name= "trouble_shooting_reply")
@Entity
@Getter
@NoArgsConstructor
public class TroubleShootingReplyEntity extends BaseEntity {
	@Column(columnDefinition = "TEXT")
	private String context;
	private long writerSeq;
	@Column(columnDefinition = "int4 DEFAULT '0'")
	private int likeCount;
	private long troubleSeq;

	@Builder
	public TroubleShootingReplyEntity(String context,
		long writerSeq, int likeCount,long troubleSeq){
		this.context = context;
		this.writerSeq = writerSeq;
		this.likeCount = likeCount;
		this.troubleSeq = troubleSeq;
	}

	public void update(TroubleShootingReplyDTO replyDTO){
		this.context = replyDTO.getContext();
	}
}
