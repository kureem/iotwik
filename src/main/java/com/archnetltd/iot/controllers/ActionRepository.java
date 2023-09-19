package com.archnetltd.iot.controllers;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface ActionRepository extends CrudRepository<Action, Integer>{
	
	public List<Action> findByMac(String mac);
	
	public List<Action> findByOwner(String owner);

}
 