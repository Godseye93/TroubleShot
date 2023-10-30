package com.orientalSalad.troubleShot.troubleShooting.entity;

import com.orientalSalad.troubleShot.global.entity.BaseEntity;

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
	private String title;
	private String context;
	private long writerSeq;
	private boolean solved;
	private int views;

	@Builder
	public TroubleShootingEntity(String title, String context, long writerSeq, boolean solved,int views){
		this.title = title;
		this.context = context;
		this.writerSeq = writerSeq;
		this.views = views;
		this.solved = solved;
	}
}
