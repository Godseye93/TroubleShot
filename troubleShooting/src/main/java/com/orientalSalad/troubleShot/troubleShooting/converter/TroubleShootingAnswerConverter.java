package com.orientalSalad.troubleShot.troubleShooting.converter;

import org.springframework.stereotype.Component;

import com.orientalSalad.troubleShot.global.utill.ObjectConverter;
import com.orientalSalad.troubleShot.member.dto.SimpleMemberDTO;
import com.orientalSalad.troubleShot.troubleShooting.dto.TroubleShootingAnswerDTO;
import com.orientalSalad.troubleShot.troubleShooting.dto.TroubleShootingDTO;
import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingAnswerEntity;
import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingEntity;

@Component
public class TroubleShootingAnswerConverter implements ObjectConverter<TroubleShootingAnswerDTO, TroubleShootingAnswerEntity> {

	@Override
	public TroubleShootingAnswerEntity toEntity(TroubleShootingAnswerDTO troubleShootingAnswerDTO) {
		return TroubleShootingAnswerEntity.builder()
			.troubleSeq(troubleShootingAnswerDTO.getTroubleSeq())
			.context(troubleShootingAnswerDTO.getContext())
			.title(troubleShootingAnswerDTO.getTitle())
			.writerSeq(troubleShootingAnswerDTO.getWriter().getSeq())
			.selected(troubleShootingAnswerDTO.isSelected())
			.build();
	}

	@Override
	public TroubleShootingAnswerDTO toDTO(TroubleShootingAnswerEntity troubleShootingAnswerEntity) {
		return TroubleShootingAnswerDTO.builder()
			.troubleSeq(troubleShootingAnswerEntity.getTroubleSeq())
			.context(troubleShootingAnswerEntity.getContext())
			.title(troubleShootingAnswerEntity.getTitle())
			.writer(SimpleMemberDTO.builder()
				.seq(troubleShootingAnswerEntity.getWriterSeq())
				.build())
			.seq(troubleShootingAnswerEntity.getSeq())
			.selected(troubleShootingAnswerEntity.isSelected())
			.build();
	}
}
