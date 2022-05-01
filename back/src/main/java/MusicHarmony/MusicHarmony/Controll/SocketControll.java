package MusicHarmony.MusicHarmony.Controll;

import MusicHarmony.MusicHarmony.VO.Message;
import MusicHarmony.MusicHarmony.VO.Offer;
import com.fasterxml.jackson.core.JsonParser;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.stereotype.Controller;

@RequiredArgsConstructor
@Controller
public class SocketControll {
    private final SimpMessageSendingOperations messagingTemplate;
    String roomid=null;

    @MessageMapping("/musicRoom")
    public void message(Message message){
        System.out.println("ChatController.message");
        System.out.println(message);
        messagingTemplate.convertAndSend("/sub/musicRoom/"+ message.getRoomID(), message);
    }

    @MessageMapping("/musicRoom/enter")
    public void enter(Message message){
        System.out.println("ChatController.message");
        System.out.println(message);
        messagingTemplate.convertAndSend("/sub/musicRoom/"+ message.getRoomID(), message);
    }

    @MessageMapping("/musicRoom/offer")
    public void offer(Message offer){
        System.out.println("ChatController.message");
        System.out.println(offer);
        messagingTemplate.convertAndSend("/sub/musicRoom/"+ offer.getRoomID(), offer);
    }
}
