package com.orientalSalad.troubleShot.member.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.orientalSalad.troubleShot.member.entity.MemberEntity;

@Repository
public interface MemberRepository extends JpaRepository<MemberEntity,Long> {
	MemberEntity findMemberEntityBySeq(Long seq);
	Long countMemberEntityByEmail(String email);
	Page<MemberEntity> findMemberEntityByNicknameContaining(String nickname, Pageable pageable);
	MemberEntity findMemberEntityByEmailAndPasswordAndDeleteTimeIsNull(String email, String password);
}
