package com.orientalSalad.troubleShot.tag.entity;

import com.orientalSalad.troubleShot.global.entity.BaseEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Table(name= "tag")
@Entity
@Getter
@NoArgsConstructor
public class TagEntity extends BaseEntity {
	private String name;

	@Builder
	public TagEntity(String name){
		this.name = name;
	}
}
