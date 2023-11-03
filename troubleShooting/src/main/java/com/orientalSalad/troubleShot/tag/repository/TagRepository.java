package com.orientalSalad.troubleShot.tag.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.orientalSalad.troubleShot.tag.entity.TagEntity;
import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingEntity;

@Repository
public interface TagRepository extends JpaRepository<TagEntity,Long> {
	TagEntity findByName(String name);
}
