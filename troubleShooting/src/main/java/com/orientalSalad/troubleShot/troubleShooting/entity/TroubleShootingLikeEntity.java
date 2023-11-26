package com.orientalSalad.troubleShot.troubleShooting.entity;

import com.orientalSalad.troubleShot.global.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Table(name= "trouble_shooting_like")
@Entity
@Getter
@NoArgsConstructor
@ToString
public class TroubleShootingLikeEntity extends BaseEntity {
	private Long userSeq;
	private Long troubleSeq;

	@Builder
	public TroubleShootingLikeEntity(Long userSeq, Long troubleSeq){
		this.userSeq = userSeq;
		this.troubleSeq = troubleSeq;
	}
}
