package com.orientalSalad.troubleShot.troubleShooting.service;

import org.springframework.stereotype.Service;

import com.orientalSalad.troubleShot.global.utill.ObjectConverter;
import com.orientalSalad.troubleShot.troubleShooting.converter.TroubleShootingConverter;
import com.orientalSalad.troubleShot.troubleShooting.dto.TroubleShootingDTO;
import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingEntity;
import com.orientalSalad.troubleShot.troubleShooting.mapper.TroubleShootingMapper;
import com.orientalSalad.troubleShot.troubleShooting.repository.TroubleShootingRepository;

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
}
