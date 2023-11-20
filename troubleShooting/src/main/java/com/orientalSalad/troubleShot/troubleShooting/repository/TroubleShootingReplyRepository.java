package com.orientalSalad.troubleShot.troubleShooting.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingReplyEntity;

@Repository
public interface TroubleShootingReplyRepository extends JpaRepository<TroubleShootingReplyEntity,Long> {
}
