package com.cherepanov.fullstack;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.event.EventListener;
import org.springframework.test.annotation.DirtiesContext;

@SpringBootTest
class FullstackApplicationTests {

	@Test
	void contextLoads() {
		Assertions.fail("Test fail!");
	}
}
