package com.orientalSalad.troubleShot.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.orientalSalad.troubleShot.member.entity.MemberEntity;

@Repository
public interface MemberRepository extends JpaRepository<MemberEntity,Long> {
	MemberEntity findMemberEntityBySeq(Long seq);
	Long countMemberEntityByEmail(String email);
	MemberEntity findMemberEntityByEmailAndPassword(String email, String password);
}
