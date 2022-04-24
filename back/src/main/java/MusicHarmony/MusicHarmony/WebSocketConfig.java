package MusicHarmony.MusicHarmony;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {


        registry.enableSimpleBroker("/sub");
        //메시지 매핑 컨트롤러로 전달할 주소의 프리픽스
        registry.setApplicationDestinationPrefixes("/pub");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        //setAllowedOriginPatterns("*") <- CORS 회피 코드. 스프링 Stomp 소켓 통신 시, 여기서 설정해줘야함 중요
        //소켓 핸드쉐이크 커넥션 경로.
        registry.addEndpoint("/music-harmony").setAllowedOriginPatterns("*").withSockJS();
    }
}
