package com.orientalSalad.troubleShot.troubleShooting.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingEntity;
import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingLikeEntity;
import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingReplyLikeEntity;

@Repository
public interface TroubleShootingLikeRepository extends JpaRepository<TroubleShootingLikeEntity,Long> {
	TroubleShootingLikeEntity findByTroubleSeqEqualsAndUserSeq(
		long troubleSeq, long userSeq);
}
