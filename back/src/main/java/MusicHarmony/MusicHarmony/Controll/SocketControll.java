package MusicHarmony.MusicHarmony.Controll;

import MusicHarmony.MusicHarmony.VO.Message;
import com.fasterxml.jackson.core.JsonParser;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@RequiredArgsConstructor
@Controller
public class SocketControll {
    private final SimpMessageSendingOperations messagingTemplate;

    @MessageMapping("/musicRoom")
    public Message message(Message message){
        System.out.println("ChatController.message");
        System.out.println(message.getMessage());
        System.out.println(message.getRoomID());
        System.out.println(message.getUserName());
        messagingTemplate.convertAndSend("/sub/musicRoom/"+ message.getRoomID(), message);
        Message message1 = new Message(message.getRoomID(), message.getMessage(), message.getMessage());

        return message1;
    }
}
