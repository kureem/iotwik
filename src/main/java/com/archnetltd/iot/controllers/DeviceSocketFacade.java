package com.archnetltd.iot.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;

import com.archnetltd.iot.Action;
import com.archnetltd.iot.DeviceWrapper;
import com.archnetltd.iot.Instruction;
import com.archnetltd.iot.Parameter;
import com.archnetltd.iot.SocketMessage;
import com.archnetltd.iot.services.IOTRegistryService;
import com.archnetltd.iot.services.IOTService;

@Component
public class DeviceSocketFacade {

	@Autowired
	private IOTService iotService;

	@Autowired
	private IOTRegistryService iotRegistryService;
	
	

	public IOTService getIotService() {
		return iotService;
	}

	public void setIotService(IOTService iotService) {
		this.iotService = iotService;
	}

	public IOTRegistryService getIotRegistryService() {
		return iotRegistryService;
	}

	public void setIotRegistryService(IOTRegistryService iotRegistryService) {
		this.iotRegistryService = iotRegistryService;
	}

	public SocketMessage startDevice(DeviceWrapper wrapper) throws Exception {

		String mac = wrapper.getDevice().getMac();
		iotRegistryService.addNewDevice(wrapper.getDevice());

		for (Action act : wrapper.getActions()) {
			iotRegistryService.addNewAction(act);
		}

		for (Parameter param : wrapper.getParameters()) {
			iotRegistryService.addNewParameter(param);
		}
		iotService.startDevice(mac);

		SocketMessage message = new SocketMessage();
		message.getHeaders().put("success", "true");
		message.getHeaders().put("action", "start");
		
		message.setBody(message.getHeaders());
		return message;

	}

	public SocketMessage acknowledgeInstructions(Map<String, Object> body) {
		String mac = (String) body.get("mac");
		List<Integer> instructionIds = (List<Integer>) body.get("instructions");
		DeviceWrapper d = iotService.acknowledgeInstructions(mac, instructionIds);
		Map<String, String> result = new HashMap<>();
		result.put("code", "0");
		result.put("action", "acknowledge");
		SocketMessage message = new SocketMessage();
		message.setBody("success");
		;
		return message;
	}

	public SocketMessage getMacDevice(String mac) {

		DeviceWrapper w = iotService.getDevice(mac);
		Map<String, String> result = new HashMap<>();
		result.put("code", "0");
		result.put("action", "get-device");

		SocketMessage message = new SocketMessage();
		message.setHeaders(result);
		message.setBody(w);
		return message;
	}

	public SocketMessage addInstruction(@RequestBody Instruction instruction) {
		iotService.addInstruction(instruction);
		Map<String, String> result = new HashMap<>();
		result.put("code", "0");
		result.put("action", "add-instruction");

		SocketMessage message = new SocketMessage();
		message.setHeaders(result);
		message.setBody("success");

		return message;
	}

}
