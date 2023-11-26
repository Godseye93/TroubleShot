package com.orientalSalad.troubleShot.troubleShooting.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingAnswerLikeEntity;

@Repository
public interface TroubleShootingAnswerLikeRepository extends JpaRepository<TroubleShootingAnswerLikeEntity,Long> {
	TroubleShootingAnswerLikeEntity findByAnswerSeqEqualsAndUserSeq(long answerSeq, long userSeq);
}
