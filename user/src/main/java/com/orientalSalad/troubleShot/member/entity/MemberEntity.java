package com.orientalSalad.troubleShot.member.entity;

import com.orientalSalad.troubleShot.global.entity.BaseEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name="member")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberEntity extends BaseEntity {
	private String email;
	private String password;
	private String profileImg;
	private String nickname;
	private String locale;


	@Builder
	public MemberEntity(String email, String password, String profileImg, String locale,String nickname){
		this.email = email;
		this.password = password;
		this.nickname = nickname;
		this.locale = locale;
		this.profileImg = profileImg;
	}

	@Override
	public String toString() {
		return "MemberEntity{" +
			"email='" + email + '\'' +
			", profileImg='" + profileImg + '\'' +
			", nickname='" + nickname + '\'' +
			", locale='" + locale + '\'' +
			", seq='" + getSeq() + '\'' +
			", createTime='" + getCreateTime() + '\'' +
			", updateTime='" + getUpdateTime() + '\'' +
			", deleteTime='" + getDeleteTime() + '\'' +
			'}';
	}
}
