package com.orientalSalad.troubleShot.troubleShooting.typehandler;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashSet;
import java.util.Set;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedTypes;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.orientalSalad.troubleShot.troubleShooting.dto.AnswerDTO;
import com.orientalSalad.troubleShot.troubleShooting.dto.TroubleShootingReplyDTO;

@MappedTypes(Set.class)
public class AnswerJsonToListTypeHandler extends BaseTypeHandler<Set<AnswerDTO>> {
	private static final ObjectMapper mapper = new ObjectMapper();

	@Override
	public void setNonNullParameter(PreparedStatement ps, int i, Set<AnswerDTO> parameter, JdbcType jdbcType) throws SQLException {
		ps.setString(i, toJson(parameter));
	}

	@Override
	public Set<AnswerDTO> getNullableResult(ResultSet rs, String columnName) throws SQLException {
		Set<AnswerDTO> result = new HashSet<>();

		try{
			result = fromJson(rs.getString(columnName));
			if(result.size() == 1){
				for(AnswerDTO replyDTO : result){
					if(replyDTO.getSeq() == null){
						result = new HashSet<>();
						break;
					}
				}
			}
		}catch (Exception e){
			e.printStackTrace();
		}

		return result;
	}

	@Override
	public Set<AnswerDTO> getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
		return fromJson(rs.getString(columnIndex));
	}

	@Override
	public Set<AnswerDTO> getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
		return fromJson(cs.getString(columnIndex));
	}

	private String toJson(Set<AnswerDTO> objects) throws SQLException {
		try {
			return mapper.writeValueAsString(objects);
		} catch (Exception e) {
			throw new SQLException("Error converting list to JSON", e);
		}
	}

	private Set<AnswerDTO> fromJson(String json) throws SQLException {
		try {
			System.out.println("handler : "+json);
			return mapper.readValue(json, new TypeReference<Set<AnswerDTO>>() {});
		} catch (Exception e) {
			throw new SQLException("Error converting JSON to list", e);
		}
	}
}
