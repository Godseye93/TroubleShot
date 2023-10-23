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
import lombok.ToString;

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
	public MemberEntity(String email, String password, String profileImg, String locale,String nickname){
		this.email = email;
		this.password = password;
		this.nickname = nickname;
		this.locale = locale;
		this.profileImg = profileImg;
	}

	public MemberDTO toMemberDTO(){
		return MemberDTO.builder()
			.seq(getSeq())
			.email(email)
			.nickname(nickname)
			.locale(locale)
			.profileImg(profileImg)
			.createTime(getCreateTime())
			.deleteTime(getDeleteTime())
			.updateTime(getUpdateTime())
			.build();
	}

	@Override
	public String toString() {
		return "MemberEntity{" +
			"email='" + email + '\'' +
			", password='" + password + '\'' +
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
