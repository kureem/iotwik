package com.archnetltd.iot.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.archnetltd.iot.Device;

public interface DeviceRepository extends CrudRepository<Device, String>{
	
	public List<Device> findByOwner(String owner);
	
	public Device findByMac(String mac);

}
