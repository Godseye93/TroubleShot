package com.orientalSalad.troubleShot.troubleShooting.entity;

import com.orientalSalad.troubleShot.global.entity.BaseEntity;
import com.orientalSalad.troubleShot.troubleShooting.dto.CategoryDTO;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Table(name= "search_tag")
@Entity
@Getter
@NoArgsConstructor
@ToString
public class SearchTagEntity extends BaseEntity {
	private String tag;
	private Long userSeq;

	@Builder
	public SearchTagEntity(String tag, Long userSeq){
		this.tag = tag;
		this.userSeq = userSeq;
	}
}
