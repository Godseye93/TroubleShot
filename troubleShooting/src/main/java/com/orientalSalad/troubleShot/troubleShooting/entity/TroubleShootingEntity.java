package com.orientalSalad.troubleShot.troubleShooting.entity;

import com.orientalSalad.troubleShot.global.entity.BaseEntity;
import com.orientalSalad.troubleShot.troubleShooting.dto.TroubleShootingDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Table(name= "trouble_shooting")
@Entity
@Getter
@NoArgsConstructor
@ToString
public class TroubleShootingEntity extends BaseEntity {
	@Column(columnDefinition = "TEXT")
	private String title;
	@Column(columnDefinition = "TEXT")
	private String context;
	@Column(columnDefinition = "TEXT")
	private String category;
	private String dependency;
	private long writerSeq;
	private boolean solved;
	@Column(columnDefinition = "int4 DEFAULT '0'")
	private int scope;
	@Column(columnDefinition = "int4 DEFAULT '0'")
	private int viewCount;
	@Column(columnDefinition = "int4 DEFAULT '0'")
	private int likeCount;
	@Column(columnDefinition = "int4 DEFAULT '0'")
	private int replyCount;

	@Builder
	public TroubleShootingEntity(String title, String context,String category,
		long writerSeq, boolean solved,int viewCount,String dependency,int scope,
		int likeCount, int replyCount){
		this.title = title;
		this.context = context;
		this.category = category;
		this.writerSeq = writerSeq;
		this.viewCount = viewCount;
		this.likeCount = likeCount;
		this.dependency = dependency;
		this.replyCount = replyCount;
		this.solved = solved;
		this.scope = scope;
	}
	public void update(TroubleShootingDTO troubleShootingDTO){
		this.title = troubleShootingDTO.getTitle();
		this.category = troubleShootingDTO.getCategory();
		this.context = troubleShootingDTO.getContext();
		this.solved = troubleShootingDTO.isSolved();
		this.dependency = troubleShootingDTO.getDependency();
		this.scope =scope;
	}
	public void updateViews(){
		this.viewCount++;
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
