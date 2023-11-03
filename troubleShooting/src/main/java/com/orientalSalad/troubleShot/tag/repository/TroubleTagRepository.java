package com.orientalSalad.troubleShot.tag.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.orientalSalad.troubleShot.tag.entity.TroubleTagEntity;

@Repository
public interface TroubleTagRepository extends JpaRepository<TroubleTagEntity,Long> {
}
