package com.archnetltd.iot.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.archnetltd.iot.Instruction;

public interface InstructionRepository extends CrudRepository<Instruction, Integer>{

	public List<Instruction> findByMacAndStatusOrderByCreatedDateDesc(String mac, String status);
	
	public List<Instruction> findByIdInOrderByCreatedDateDesc(List<Integer> ids);
}
