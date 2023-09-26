package com.archnetltd.iot.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.archnetltd.iot.Action;
import com.archnetltd.iot.Device;
import com.archnetltd.iot.Parameter;
import com.archnetltd.iot.services.IOTRegistryService;

@RestController
@RequestMapping("/registry")
public class RegistryController {
	
	@Autowired
	private IOTRegistryService iotRegistryService;

	public IOTRegistryService getIotRegistryService() {
		return iotRegistryService;
	}

	public void setIotRegistryService(IOTRegistryService iotRegistryService) {
		this.iotRegistryService = iotRegistryService;
	}
	
	@PostMapping("/add-device")
	public Map<String,Object> addNewDevice(@RequestBody Device device) {
		return iotRegistryService.addNewDevice(device);
	}
	
	@PostMapping("/add-action")
	public Map<String,Object> addNewAction(@RequestBody Action action) {
		
		return iotRegistryService.addNewAction(action);
	}

	
	@PostMapping("/add-parameter")
	public Map<String,String> addNewParameter(@RequestBody Parameter param){
		return iotRegistryService.addNewParameter(param);
	}
	
	@PostMapping("/aquire-device")
	public Map<String,String> aquireDevice(@RequestBody Map<String,String> params) {
		String mac = params.get("mac");
		String owner = params.get("owner");
		return iotRegistryService.aquireDevice(mac, owner);
		
	}
}
