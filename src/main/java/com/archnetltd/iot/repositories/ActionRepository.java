package com.archnetltd.iot.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.archnetltd.iot.Action;

public interface ActionRepository extends CrudRepository<Action, Integer>{
	
	public List<Action> findByMac(String mac);
	
	public List<Action> findByOwner(String owner);
	
	public List<Action> findByMacAndName(String mac, String name);

}
 