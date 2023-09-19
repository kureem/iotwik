package com.archnetltd.iot.controllers;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface ParameterRepository extends CrudRepository<Parameter, Integer>{
	
	public List<Parameter> findByMac(String mac);
	
	public List<Parameter> findByOwner(String owner);
	
	public List<Parameter> findByMacAndActionName(String mac, String actionName);

}
