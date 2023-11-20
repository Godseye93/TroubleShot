package com.orientalSalad.troubleShot.troubleShooting.converter;

import org.springframework.stereotype.Component;

import com.orientalSalad.troubleShot.global.utill.ObjectConverter;
import com.orientalSalad.troubleShot.troubleShooting.dto.TroubleShootingAnswerDTO;
import com.orientalSalad.troubleShot.troubleShooting.dto.TroubleShootingAnswerReplyDTO;
import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingAnswerEntity;
import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingAnswerReplyEntity;

@Component
public class TroubleShootingAnswerReplyConverter implements ObjectConverter<TroubleShootingAnswerReplyDTO, TroubleShootingAnswerReplyEntity> {

	@Override
	public TroubleShootingAnswerReplyEntity toEntity(TroubleShootingAnswerReplyDTO troubleShootingAnswerReplyDTO) {
		return TroubleShootingAnswerReplyEntity.builder()
			.answerSeq(troubleShootingAnswerReplyDTO.getAnswerSeq())
			.context(troubleShootingAnswerReplyDTO.getContext())
			.writerSeq(troubleShootingAnswerReplyDTO.getWriter().getSeq())
			.build();
	}

	@Override
	public TroubleShootingAnswerReplyDTO toDTO(TroubleShootingAnswerReplyEntity troubleShootingAnswerReplyEntity) {
		return null;
	}
}
