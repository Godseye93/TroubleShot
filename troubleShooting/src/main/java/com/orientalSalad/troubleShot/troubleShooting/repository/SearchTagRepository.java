package com.orientalSalad.troubleShot.troubleShooting.repository;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.orientalSalad.troubleShot.troubleShooting.entity.FavoriteEntity;
import com.orientalSalad.troubleShot.troubleShooting.entity.SearchTagEntity;

@Repository
public interface SearchTagRepository extends JpaRepository<SearchTagEntity,Long> {
	FavoriteEntity findByUserSeqAndTag(Long userSeq, String tagName);
}
