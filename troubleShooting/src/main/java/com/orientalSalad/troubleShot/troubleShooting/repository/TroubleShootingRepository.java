package com.orientalSalad.troubleShot.troubleShooting.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingEntity;

@Repository
public interface TroubleShootingRepository extends JpaRepository<TroubleShootingEntity,Long> {
	TroubleShootingEntity findBySeq(Long seq);
	List<TroubleShootingEntity> findTop10ByTagedOrderBySeq(boolean taged);
	@Query("select ts from TroubleShootingEntity ts where ts.taged = false order by length(ts.context)")
	List<TroubleShootingEntity> findTop10ByLength();
}
