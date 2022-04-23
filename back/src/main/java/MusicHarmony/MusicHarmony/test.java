package MusicHarmony.MusicHarmony;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class test {
    @MessageMapping("/hello")
    @SendTo("/topic/toto")
    public String greeting() throws Exception{
        Thread.sleep(500);
        return "SpringServer send~~~";
    }
}
