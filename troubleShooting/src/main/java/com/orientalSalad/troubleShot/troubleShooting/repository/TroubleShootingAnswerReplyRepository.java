package com.orientalSalad.troubleShot.troubleShooting.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingAnswerEntity;
import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingAnswerReplyEntity;

@Repository
public interface TroubleShootingAnswerReplyRepository extends JpaRepository<TroubleShootingAnswerReplyEntity,Long> {
	TroubleShootingAnswerReplyEntity findBySeq(Long seq);
}
