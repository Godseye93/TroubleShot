package com.orientalSalad.troubleShot.troubleShooting.entity;

import com.orientalSalad.troubleShot.global.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name= "trouble_shooting")
@Entity
@Getter
@NoArgsConstructor
public class TroubleShootingEntity extends BaseEntity {
	@Column(columnDefinition = "TEXT")
	private String title;
	@Column(columnDefinition = "TEXT")
	private String context;
	private long writerSeq;
	private boolean solved;
	@Column(columnDefinition = "int4 DEFAULT '0'")
	private int viewCount;
	@Column(columnDefinition = "int4 DEFAULT '0'")
	private int likeCount;
	@Column(columnDefinition = "int4 DEFAULT '0'")
	private int replyCount;

	@Builder
	public TroubleShootingEntity(String title, String context,
		long writerSeq, boolean solved,int viewCount,
		int likeCount, int replyCount){
		this.title = title;
		this.context = context;
		this.writerSeq = writerSeq;
		this.viewCount = viewCount;
		this.likeCount = likeCount;
		this.replyCount = replyCount;
		this.solved = solved;
	}

	public void updateViews(){
		this.viewCount++;
	}
}
