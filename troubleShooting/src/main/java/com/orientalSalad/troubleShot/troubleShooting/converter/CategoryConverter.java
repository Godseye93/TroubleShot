package com.orientalSalad.troubleShot.troubleShooting.converter;

import org.springframework.stereotype.Component;

import com.orientalSalad.troubleShot.global.utill.ObjectConverter;
import com.orientalSalad.troubleShot.troubleShooting.dto.CategoryDTO;
import com.orientalSalad.troubleShot.troubleShooting.dto.TroubleShootingReplyDTO;
import com.orientalSalad.troubleShot.troubleShooting.entity.CategoryEntity;
import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingReplyEntity;

@Component
public class CategoryConverter implements ObjectConverter<CategoryDTO, CategoryEntity> {
	@Override
	public CategoryEntity toEntity(CategoryDTO categoryDTO) {
		return CategoryEntity.builder()
			.name(categoryDTO.getName())
			.userSeq(categoryDTO.getUserSeq())
			.build();
	}

	@Override
	public CategoryDTO toDTO(CategoryEntity categoryEntity) {
		return CategoryDTO.builder()
			.seq(categoryEntity.getSeq())
			.name(categoryEntity.getName())
			.userSeq(categoryEntity.getUserSeq())
			.createTime(categoryEntity.getCreateTime())
			.updateTime(categoryEntity.getUpdateTime())
			.deleteTime(categoryEntity.getDeleteTime())
			.build();
	}
}