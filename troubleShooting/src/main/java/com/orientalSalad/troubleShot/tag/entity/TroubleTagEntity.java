package com.orientalSalad.troubleShot.tag.entity;

import com.orientalSalad.troubleShot.global.entity.BaseEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name= "trouble_tag")
@Entity
@Getter
@NoArgsConstructor
public class TroubleTagEntity extends BaseEntity {
	private Long troubleSeq;
	private Long tagSeq;
	@Builder
	public TroubleTagEntity(Long troubleSeq, Long tagSeq){
		this.troubleSeq = troubleSeq;
		this.tagSeq = tagSeq;
	}
}