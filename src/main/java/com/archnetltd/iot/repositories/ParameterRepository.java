package com.archnetltd.iot.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.archnetltd.iot.Parameter;

public interface ParameterRepository extends CrudRepository<Parameter, Integer>{
	
	public List<Parameter> findByMac(String mac);
	
	public List<Parameter> findByOwner(String owner);
	
	public List<Parameter> findByMacAndName(String mac, String name);
	

}
