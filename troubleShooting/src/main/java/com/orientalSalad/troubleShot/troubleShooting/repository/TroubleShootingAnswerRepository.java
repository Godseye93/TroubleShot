package com.orientalSalad.troubleShot.troubleShooting.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingAnswerEntity;

@Repository
public interface TroubleShootingAnswerRepository extends JpaRepository<TroubleShootingAnswerEntity,Long> {
	TroubleShootingAnswerEntity findBySeq(Long seq);
}
