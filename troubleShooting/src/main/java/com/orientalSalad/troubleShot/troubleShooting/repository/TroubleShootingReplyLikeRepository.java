package com.orientalSalad.troubleShot.troubleShooting.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingReplyEntity;
import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingReplyLikeEntity;

@Repository
public interface TroubleShootingReplyLikeRepository extends JpaRepository<TroubleShootingReplyLikeEntity,Long> {
	TroubleShootingReplyLikeEntity findByTroubleSeqEqualsAndReplySeqAndUserSeq(
		long troubleSeq, long replySeq, long userSeq
	);
}
