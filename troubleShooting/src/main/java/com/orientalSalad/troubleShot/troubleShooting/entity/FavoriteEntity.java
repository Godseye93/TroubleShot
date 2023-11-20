package com.orientalSalad.troubleShot.troubleShooting.entity;

import com.orientalSalad.troubleShot.global.entity.BaseEntity;
import com.orientalSalad.troubleShot.troubleShooting.dto.CategoryDTO;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Table(name= "favorite")
@Entity
@Getter
@NoArgsConstructor
@ToString
public class FavoriteEntity extends BaseEntity {
	private Long userSeq;
	private Long troubleSeq;

	@Builder
	public FavoriteEntity(Long troubleSeq, Long userSeq){
		this.troubleSeq = troubleSeq;
		this.userSeq = userSeq;
	}
}
