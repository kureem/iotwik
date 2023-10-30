package com.archnetltd.iot.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.archnetltd.iot.DeviceWrapper;
import com.archnetltd.iot.Instruction;
import com.archnetltd.iot.services.IOTService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/iot")
public class DeviceController {

	@Autowired
	private IOTService iotService;

	public IOTService getIotService() {
		return iotService;
	}

	public void setIotService(IOTService iotService) {
		this.iotService = iotService;
	}

	@PostMapping("/ping")
	public List<Instruction> ping(HttpServletRequest request, @RequestBody Map<String, String> body) throws Exception {

		String mac = body.get("mac");
		return iotService.getLatestInstructions(mac);

	}
	
	@PostMapping("/start")
	public Map<String,Object> startDevice(HttpServletRequest request, @RequestBody Map<String, String> body) throws Exception {
		System.out.println("starting device:" + body);
		String mac = body.get("mac");
		return startDevice(mac);
	}
	
	public Map<String,Object> startDevice(String mac) throws Exception {
		 iotService.startDevice(mac);
		 DeviceWrapper wrapper = iotService.getDevice(mac);
		 Map<String,Object> result = new HashMap<>();
		 result.put("code", "0");
		 result.put("device", wrapper);
		 return result;

	}
	
	@PostMapping("/acknowledge")
	public Map<String,Object> acknowledgeInstructions(HttpServletRequest request, @RequestBody Map<String,Object> body){
		return acknowledgeInstructions(body);
	}
	
	public Map<String,Object> acknowledgeInstructions(Map<String,Object> body){
		String mac = (String)body.get("mac");
		List<Integer> instructionIds = (List<Integer>)body.get("instructions");
		DeviceWrapper d = iotService.acknowledgeInstructions(mac, instructionIds);
		Map<String, Object> result = new HashMap<>();
		result.put("code", "0");
		result.put("device", d);
		return result;
	}

	@GetMapping("/get-device")
	public Map<String, Object> getDevice(@RequestParam("mac") String mac) {

		DeviceWrapper w = iotService.getDevice(mac);
		Map<String, Object> result = new HashMap<>();
		result.put("device", w.getDevice());
		result.put("actions", w.getActions());
		result.put("params", w.getParameters());
		result.put("code", "0");
		result.put("message", "success");

		return result;
	}
	
	public Map<String, Object> getMacDevice(String mac) {

		DeviceWrapper w = iotService.getDevice(mac);
		Map<String, Object> result = new HashMap<>();
		result.put("device", w);
		//result.put("actions", w.getActions());
		//result.put("params", w.getParameters());
		result.put("code", "0");
		result.put("message", "success");

		return result;
	}

	@PostMapping("/add-instruction")
	public Map<String, Object> addInstruction(@RequestBody Instruction instruction) {
		iotService.addInstruction(instruction);
		Map<String, Object> result = new HashMap<>();
		result.put("instruction", instruction);
		result.put("code", "0");
		result.put("message", "success");
		return result;
	}

	public static String getClientIpAddress(HttpServletRequest request) {
		String xForwardedForHeader = request.getHeader("X-Forwarded-For");
		if (xForwardedForHeader == null) {
			return request.getRemoteAddr();
		} else {
			return new StringTokenizer(xForwardedForHeader, ",").nextToken().trim();
		}
	}

}
