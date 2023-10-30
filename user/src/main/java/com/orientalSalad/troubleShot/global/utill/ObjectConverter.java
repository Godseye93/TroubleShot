package com.orientalSalad.troubleShot.global.utill;

public interface ObjectConverter<D,E> {
	public E toEntity(D d);
	public D toDTO(E e);
}