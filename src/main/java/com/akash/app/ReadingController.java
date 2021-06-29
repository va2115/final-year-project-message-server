package com.akash.app;


import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ReadingController {
	
	@MessageMapping("/send-reading") // end-point where the producer will produce messages
	@SendTo("/topic/readings") // the topic to which data must be sent
	public ReadingMessage sendReading(ReadingMessage incomingReadingMessage) {
		System.out.println("Message received from poducer: " + incomingReadingMessage);
		System.out.println("Broadcasting " + incomingReadingMessage + "to all subscribers");
		return incomingReadingMessage;
	}

}
