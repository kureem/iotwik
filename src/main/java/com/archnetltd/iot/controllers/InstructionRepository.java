package com.archnetltd.iot.controllers;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface InstructionRepository extends CrudRepository<Instruction, Integer>{

	public List<Instruction> findByMacAndStatus(String mac, String status);
}
