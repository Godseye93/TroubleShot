package com.orientalSalad.troubleShot.troubleShooting.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingAnswerReplyLikeEntity;

@Repository
public interface TroubleShootingAnswerReplyLikeRepository extends JpaRepository<TroubleShootingAnswerReplyLikeEntity,Long> {
	TroubleShootingAnswerReplyLikeEntity findByAnswerReplySeqEqualsAndUserSeq(long answerReplySeq, long userSeq);
}
