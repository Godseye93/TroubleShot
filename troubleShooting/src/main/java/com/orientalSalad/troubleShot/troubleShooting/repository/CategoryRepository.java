package com.orientalSalad.troubleShot.troubleShooting.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.orientalSalad.troubleShot.troubleShooting.entity.CategoryEntity;
import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingEntity;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity,Long> {
	CategoryEntity findByUserSeqAndName(Long userSeq,String name);
	CategoryEntity findBySeq(Long seq);
	List<CategoryEntity> findByUserSeq(Long userSeq);
}
