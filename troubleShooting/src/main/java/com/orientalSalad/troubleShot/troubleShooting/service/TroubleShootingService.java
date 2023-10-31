package com.orientalSalad.troubleShot.troubleShooting.service;

import org.springframework.stereotype.Service;

import com.orientalSalad.troubleShot.global.utill.ObjectConverter;
import com.orientalSalad.troubleShot.troubleShooting.converter.TroubleShootingConverter;
import com.orientalSalad.troubleShot.troubleShooting.dto.TroubleShootingDTO;
import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingEntity;
import com.orientalSalad.troubleShot.troubleShooting.mapper.TroubleShootingMapper;
import com.orientalSalad.troubleShot.troubleShooting.repository.TroubleShootingRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TroubleShootingService {
	private final TroubleShootingMapper troubleShootingMapper;
	private final TroubleShootingRepository troubleShootingRepository;
	private final ObjectConverter<TroubleShootingDTO, TroubleShootingEntity> troubleShootingConverter;

	public boolean insertTroubleShooting(TroubleShootingDTO troubleShootingDTO){
		TroubleShootingEntity troubleShootingEntity = troubleShootingConverter.toEntity(troubleShootingDTO);
		troubleShootingRepository.save(troubleShootingEntity);

		return true;
	}

	public TroubleShootingDTO selectTroubleShootingBySeq(long seq) throws Exception {
		TroubleShootingDTO troubleShootingDTO = troubleShootingMapper.selectTroubleShootingBySeq(seq);

		TroubleShootingEntity troubleShootingEntity = troubleShootingRepository.findById(seq).orElse(null);

		if(troubleShootingEntity == null){
			throw new Exception(seq+"번 게시물은 없습니다.");
		}

		troubleShootingEntity.updateViews();

		troubleShootingRepository.save(troubleShootingEntity);

		return troubleShootingDTO;
	}
}
