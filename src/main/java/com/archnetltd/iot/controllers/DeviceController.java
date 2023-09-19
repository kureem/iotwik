package com.archnetltd.iot.controllers;

import java.io.InputStream;
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

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/iot")
public class DeviceController {

	@Autowired
	private DeviceRepository deviceRepository;

	@Autowired
	private ActionRepository actionRepository;

	@Autowired
	private ParameterRepository parameterRepository;

	public DeviceRepository getDeviceRepository() {
		return deviceRepository;
	}

	public void setDeviceRepository(DeviceRepository deviceRepository) {
		this.deviceRepository = deviceRepository;
	}

	public ActionRepository getActionRepository() {
		return actionRepository;
	}

	public void setActionRepository(ActionRepository actionRepository) {
		this.actionRepository = actionRepository;
	}

	public ParameterRepository getParameterRepository() {
		return parameterRepository;
	}

	public void setParameterRepository(ParameterRepository parameterRepository) {
		this.parameterRepository = parameterRepository;
	}

	@PostMapping("/ping")
	public String ping(HttpServletRequest request, @RequestBody String body) throws Exception {
		Map<String, String> map = new HashMap<>();
		map.put("request.getRemoteAddr()", request.getRemoteAddr());
		InputStream in = request.getInputStream();
		byte[] buf = new byte[in.available()];
		in.read(buf);

		map.put("mac", new String(buf));
		return map.toString();
		// request.getRemoteAddr()
	}

	@PostMapping("/add-device")
	public Device addNewDevice(@RequestBody Device device) {
		device.setStatus("New");
		device.setOwner("creator");
		deviceRepository.save(device);
		return device;
	}
	
	@GetMapping("/get-device")
	public Map<String,Object> getDevice(@RequestParam("mac") String mac){
		Device d = deviceRepository.findByMac(mac);
		List<Action> actions = actionRepository.findByMac(mac);
		List<Parameter> params = parameterRepository.findByMac(mac);
		Map<String,Object> result = new HashMap<>();
		result.put("device", d);
		result.put("actions", actions);
		result.put("params", params);
		result.put("code", "0");
		result.put("message", "success");
		
		return result;
	}
	
	@PostMapping("/add-action")
	public Map<String,String> addNewAction(@RequestBody Action action) {
		
		Map<String, String> result = new HashMap<>();
		if(action.getMac() != null) {
			Device device = deviceRepository.findByMac(action.getMac());
			if(device != null) {
				if(!device.getOwner().equals("creator")) {
					action.setOwner("creator");
					actionRepository.save(action);
					result.put("code", "0");
					result.put("message", "success");
				}else {
					result.put("code", "-1");
					result.put("message", "Device found, but already owned by another user");
				}
			}else {
				result.put("code", "-3");
				result.put("message", "Device not found");
			}
		}else {
			result.put("code", "-1");
			result.put("message", "mac address in not specified");
		}
		return result;
	}
	
	@PostMapping("/add-parameter")
	public Map<String,String> addNewParameter(@RequestBody Parameter param){
		Map<String, String> result = new HashMap<>();
		if(param.getMac() != null) {
			Device device = deviceRepository.findByMac(param.getMac());
			if(device != null) {
				if(!device.getOwner().equals("creator")) {
					param.setOwner("creator");
					parameterRepository.save(param);
					result.put("code", "0");
					result.put("message", "success");
				}else {
					result.put("code", "-1");
					result.put("message", "Device found, but already owned by another user");
				}
			}else {
				result.put("code", "-3");
				result.put("message", "Device not found");
			}
		}else {
			result.put("code", "-1");
			result.put("message", "mac address in not specified");
		}
		return result;
	}

	@PostMapping("/aquire-device")
	public Map<String,String> aquireDevice(@RequestBody Map<String,String> params) {
		String mac = params.get("mac");
		String owner = params.get("owner");
		Map<String,String> result = new HashMap<>();
		Device d = deviceRepository.findByMac(mac);
		List<Action> actions = actionRepository.findByMac(mac);
		List<Parameter> parameters = parameterRepository.findByMac(mac);
		if(d != null) {
			if(d.getOwner().equals("creator")) {
				if(d.getStatus().equals("New")) {
					d.setOwner(owner);
					for(Action action : actions) {
						action.setOwner(owner);
					}
					
					for(Parameter param: parameters) {
						param.setOwner(owner);
					}
					
					deviceRepository.save(d);
					actionRepository.saveAll(actions);
					parameterRepository.saveAll(parameters);
					result.put("code", "0");
					result.put("message", "success");
				}else {
					result.put("code", "-2");
					result.put("message", "Device found, but wrong status");
				}
			}else {
				result.put("code", "-1");
				result.put("message", "Device found, but already owned by another user");
			}
		}else {
			result.put("code", "-3");
			result.put("message", "Device not found");
		}
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
