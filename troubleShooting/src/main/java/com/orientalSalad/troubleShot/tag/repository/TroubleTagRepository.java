package com.orientalSalad.troubleShot.tag.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.orientalSalad.troubleShot.tag.entity.TroubleTagEntity;

@Repository
public interface TroubleTagRepository extends JpaRepository<TroubleTagEntity,Long> {
	List<TroubleTagEntity> findByTroubleSeq(Long troubleSeq);
	TroubleTagEntity findByTroubleSeqAndTagSeq(Long troubleSeq, Long tagSeq);
}
