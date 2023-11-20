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
import com.orientalSalad.troubleShot.troubleShooting.dto.TroubleShootingAnswerDTO;

@MappedTypes(Set.class)
public class AnswerJsonToListTypeHandler extends BaseTypeHandler<Set<TroubleShootingAnswerDTO>> {
	private static final ObjectMapper mapper = new ObjectMapper();

	@Override
	public void setNonNullParameter(PreparedStatement ps, int i, Set<TroubleShootingAnswerDTO> parameter, JdbcType jdbcType) throws SQLException {
		ps.setString(i, toJson(parameter));
	}

	@Override
	public Set<TroubleShootingAnswerDTO> getNullableResult(ResultSet rs, String columnName) throws SQLException {
		Set<TroubleShootingAnswerDTO> troubleShootingAnswerDTOSet = new HashSet<>();
		try{
			troubleShootingAnswerDTOSet = fromJson(rs.getString(columnName));
			System.out.println("result: "+troubleShootingAnswerDTOSet);
			if(troubleShootingAnswerDTOSet.size() == 1){
				for(TroubleShootingAnswerDTO answerDTO : troubleShootingAnswerDTOSet){
					if(answerDTO.getSeq() == null){
						troubleShootingAnswerDTOSet = new HashSet<>();
						break;
					}
				}
			}
		}catch (Exception e){
			e.printStackTrace();
		}

		return troubleShootingAnswerDTOSet;
	}

	@Override
	public Set<TroubleShootingAnswerDTO> getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
		return fromJson(rs.getString(columnIndex));
	}

	@Override
	public Set<TroubleShootingAnswerDTO> getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
		return fromJson(cs.getString(columnIndex));
	}

	private String toJson(Set<TroubleShootingAnswerDTO> objects) throws SQLException {
		try {
			return mapper.writeValueAsString(objects);
		} catch (Exception e) {
			throw new SQLException("Error converting list to JSON", e);
		}
	}

	private Set<TroubleShootingAnswerDTO> fromJson(String json) throws SQLException {
		try {
			System.out.println("handler : "+json);
			return mapper.readValue(json, new TypeReference<Set<TroubleShootingAnswerDTO>>() {});
		} catch (Exception e) {
			throw new SQLException("Error converting JSON to list", e);
		}
	}
}
