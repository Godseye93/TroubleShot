package com.orientalSalad.troubleShot.member.entity;

import java.time.LocalDateTime;

import com.orientalSalad.troubleShot.global.entity.BaseEntity;
import com.orientalSalad.troubleShot.member.dto.MemberDTO;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name="member")
@DiscriminatorValue("member")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberEntity extends BaseEntity {
	private String email;
	private String password;
	private String profileImg;
	private String nickname;
	private String locale;

	@Builder
	public MemberEntity(String email, String password, String profileImg, String locale,Long seq,String nickname,
		LocalDateTime createTime, LocalDateTime updateTime, LocalDateTime deleteTime){
		this.email = email;
		this.password = password;
		this.nickname = nickname;
		this.locale = locale;
		this.profileImg = profileImg;
		this.createTime = createTime;
		this.updateTime = updateTime;
		this.deleteTime = deleteTime;
	}

	public MemberDTO toMemberDTO(){
		return MemberDTO.builder()
			.email(email)
			.password(password)
			.nickname(nickname)
			.locale(locale)
			.profileImg(profileImg)
			.createTime(createTime)
			.deleteTime(deleteTime)
			.updateTime(updateTime)
			.build();
	}
}
