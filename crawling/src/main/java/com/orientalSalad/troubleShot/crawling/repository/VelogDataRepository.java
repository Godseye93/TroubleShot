package com.orientalSalad.troubleShot.crawling.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.orientalSalad.troubleShot.crawling.entity.VelogDataEntity;

@Repository
public interface VelogDataRepository extends JpaRepository<VelogDataEntity,Long> {
	VelogDataEntity findByUrl(String url);
	List<VelogDataEntity> findAllByCrawling(boolean crawling);
}
