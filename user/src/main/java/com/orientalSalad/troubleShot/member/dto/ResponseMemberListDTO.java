package com.orientalSalad.troubleShot.member.dto;

import java.util.List;

import com.orientalSalad.troubleShot.global.dto.ResultDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@ToString
public class ResponseMemberListDTO extends ResultDTO {
	private List<MemberDTO> memberList;
}
