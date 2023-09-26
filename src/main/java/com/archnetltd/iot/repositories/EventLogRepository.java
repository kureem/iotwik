package com.archnetltd.iot.repositories;

import org.springframework.data.repository.CrudRepository;

import com.archnetltd.iot.EventLog;

public interface EventLogRepository extends CrudRepository<EventLog, Integer>{

}
