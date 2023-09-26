package com.archnetltd.iot.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.archnetltd.iot.Action;
import com.archnetltd.iot.Device;
import com.archnetltd.iot.Parameter;
import com.archnetltd.iot.repositories.ActionRepository;
import com.archnetltd.iot.repositories.DeviceRepository;
import com.archnetltd.iot.repositories.InstructionRepository;
import com.archnetltd.iot.repositories.ParameterRepository;

@Service
public class IOTRegistryServiceImpl implements IOTRegistryService{
	
	
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

	public InstructionRepository getInstructionRepository() {
		return instructionRepository;
	}

	public void setInstructionRepository(InstructionRepository instructionRepository) {
		this.instructionRepository = instructionRepository;
	}

	@Autowired
	private DeviceRepository deviceRepository;

	@Autowired
	private ActionRepository actionRepository;

	@Autowired
	private ParameterRepository parameterRepository;
	
	@Autowired
	private InstructionRepository instructionRepository;

	@Override
	public Map<String, String> addNewParameter(Parameter param) {
		Map<String, String> result = new HashMap<>();
		if(param.getMac() != null) {
			List<Parameter> ps = parameterRepository.findByMacAndName(param.getMac(), param.getName());
			if(ps.size() > 0) {
				result.put("code", "-4");
				result.put("message", "Parameter " + param.getName() + " mac:" + param.getMac() + " already registered");
				if(ps.size() > 1) {
					parameterRepository.deleteAll(ps.subList(1, ps.size()-1));
				}
				return result;
			}
			Device device = deviceRepository.findByMac(param.getMac());
			if(device != null) {
				if(device.getOwner().equals("creator")) {
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
			result.put("code", "-2");
			result.put("message", "mac address in not specified");
		}
		return result;
	}

	@Override
	public Map<String, String> aquireDevice(String mac, String owner) {

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

	@Override
	public Map<String, Object> addNewAction(Action action) {
		Map<String, Object> result = new HashMap<>();
		List<Action> acts = actionRepository.findByMacAndName(action.getMac(), action.getName());
		
		if(action.getMac() != null) {
			if(acts.size() > 0) {
				result.put("code", "-4");
				result.put("message", "Action: name :" + action.getName() + " mac:" + action.getMac() + " already registered");
				
				if(acts.size() > 1) {	
					actionRepository.deleteAll(acts.subList(1, acts.size()-1));
					
				}
				result.put("action", acts.get(0));
				return result;
			}
			Device device = deviceRepository.findByMac(action.getMac());
			if(device != null) {
				if(device.getOwner().equals("creator")) {
					action.setOwner("creator");
					
					actionRepository.save(action);
					result.put("code", "0");
					result.put("message", "success");
					result.put("action", action);
				}else {
					result.put("code", "-1");
					result.put("message", "Device found, but already owned by another user");
				}
			}else {
				result.put("code", "-3");
				result.put("message", "Device not found");
			}
		}else {
			result.put("code", "-2");
			result.put("message", "mac address in not specified");
		}
		return result;
	}

	@Override
	public Map<String,Object> addNewDevice(Device device) {
		Map<String,Object> result = new HashMap<>();
		Device d = deviceRepository.findByMac(device.getMac());
		if(d == null) {
			device.setStatus("New");
			device.setOwner("creator");
			deviceRepository.save(device);
			result.put("code", "0");
			result.put("message", "success");
			result.put("device", device);
		}else {
			result.put("code", "-1");
			result.put("message", "device:" + device.getMac() + " already registered");
			result.put("device", d);
		}
		
		return result;
	}

}
