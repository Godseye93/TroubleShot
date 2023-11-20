package com.orientalSalad.troubleShot.troubleShooting.entity;

import com.orientalSalad.troubleShot.global.entity.BaseEntity;
import com.orientalSalad.troubleShot.troubleShooting.dto.CategoryDTO;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Table(name= "category")
@Entity
@Getter
@NoArgsConstructor
@ToString
public class CategoryEntity extends BaseEntity {
	private String name;
	private Long userSeq;

	@Builder
	public CategoryEntity(String name, Long userSeq){
		this.name = name;
		this.userSeq = userSeq;
	}
	public void update(CategoryDTO categoryDTO){
		this.name = categoryDTO.getName();
		this.userSeq = categoryDTO.getUserSeq();
	}
}
