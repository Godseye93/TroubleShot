package com.orientalSalad.troubleShot.troubleShooting.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingEntity;

@Repository
public interface TroubleShootingRepository extends JpaRepository<TroubleShootingEntity,Long> {
	TroubleShootingEntity findBySeq(Long seq);
}
