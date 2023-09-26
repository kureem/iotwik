package com.archnetltd.iot.services;

import java.util.Map;

import com.archnetltd.iot.Action;
import com.archnetltd.iot.Device;
import com.archnetltd.iot.Parameter;

public interface IOTRegistryService {
	
	public Map<String,String> addNewParameter( Parameter param);
	
	public Map<String,String> aquireDevice(String mac, String owner);
	
	public Map<String,Object> addNewAction( Action action);
	
	public Map<String,Object> addNewDevice( Device device);

}
