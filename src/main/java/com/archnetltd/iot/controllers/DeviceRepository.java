package com.archnetltd.iot.controllers;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface DeviceRepository extends CrudRepository<Device, String>{
	
	public List<Device> findByOwner(String owner);
	
	public Device findByMac(String mac);

}
