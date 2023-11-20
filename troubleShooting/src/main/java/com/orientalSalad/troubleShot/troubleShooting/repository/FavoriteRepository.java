package com.orientalSalad.troubleShot.troubleShooting.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.orientalSalad.troubleShot.troubleShooting.entity.FavoriteEntity;
import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingEntity;

@Repository
public interface FavoriteRepository extends JpaRepository<FavoriteEntity,Long> {
	FavoriteEntity findByUserSeqAndTroubleSeq(Long userSeq, Long troubleSeq);
}
