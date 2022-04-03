# 어떻게 통신을 할 것인가?

## web rtc

- WebRTC는 서버를 최대한 거치지 않고 P2P(Peer-to-Peer Network)로 브라우저나 단말 간에 데이터를 주고받는 기술의 웹 표준
- 웹 브라우저 간에 플러그인의 도움 없이 서로 통신할 수 있도록 설계된 API
- 음성통화, 영상 통화, P2 파일 공유등으로 활용될 수 있다.
  - EX. 디스코드
- 근데 라우터(공유기), 방화벽에 의해 막힐 수 있어 우회 통로가 필요하다
- webrtc의 경의 외부 소스를 가지고 스트리밍은 불가능 하니 데이터 채널을 통해 별도로 전송 되어야 하고 디코딩 또한 우회적인 방법으로 해야 하는 문제 발생
- web socket 과의 차이
  - Web Socket은 TCP 프로토콜 사용하지만, WEB TRC는 UDP 사용
  - 양방향 통신이 가능하긴 한데 그만큼 효율적이진 않음

### STUN 서버

- Session Traversal Utilities for NAT
- NAT 환경에서는 private IP를 별도로 가지고 있기 때문에 P2P 통신이 불가능하다.
  - 클라이언트는 자신의 Public IP를 확인하기 위해 STUN 서버로 요청을 보내고, 서버로부터 자신의 PUBLIC IP를 받는다.
  - 이 때부터 클라이언트는 자신이 받은 PUBLIC IP를 이용하여 시그널링을 할 때 받은 그 정보를 이용해서 시그널링한다
- 하지만 두 Client 가 같은 네트워크에 존재하고 있을때는 이것으로 해결이 되지 않는다.
- NAT 환경에서는 Symmetirc NAT의 경우는 어플리케이션이 달라지면 NAT의 매핑 테이블이 달라짐

### TURN 서버

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2f46f5ff-ee1d-49e8-8305-86bfc6f41823/Untitled.png)

- 클라이언트들이 통신할 때 PUBLIC 망에 존재하는 TURN 서버를 경유하여 통신한다.
  - 클라이언트는 자신의 Private IP가 포함된 TURN 메세지를 턴서버로 보낸다.
  - 그러면 TURN 서버는 메세지에 포함된 Network Layer IP 주소와 Transport Layer의 UDP 포트 넘버와의 차이를 확인하고 클라이언트의 Public IP로 응답하게 된다.
  - 이때 NAT는 NAT 매핑테이블에 기록되어 있는 정보에 따라서 내부 네트워크에 있는 클라이언트의 Private IP 로 메세지를 전송한다.

## parsec

## ffmpeg

- 모든 동영상, 음악, 사진 포맷들의 디코딩과 인코딩을 목표로 만들어지고 있는 LGPL과 GPL 라이선스를 따르는 오픈 소스 프로젝트
- 추가적인 코덱 설치 필요 없이 인코딩 디코딩이 가능하다.
- 프리셋도 다양함.

## grpc

- HTTP/2 기반
  - 헤더 압축, 단일 TCP Connection의 병렬 처리, 보안 기능
- Protocol Buffer 사용해 데이터 압축율 향상 가능
- 제한 사항
  - 데이터가 바이너리 인코딩됨
  - 브라우저 지원이 제한적
  - 프로토콜 변환을 위한 프록시 서버가 필요함

### Reference

- [gRPC realtime Streaming](https://www.youtube.com/watch?v=Naonb2XD_2Q)
- [gRPC Data Streaming](https://www.youtube.com/watch?v=CcbwRBT8vnI)



## QUIC

- Quick Udp Internet Connections
- 전달 속도 개선과 더불어 클라이언트와 서버의 연결 수를 최소화
- 대역폭을 예상하여 패킷 혼잡 회피
- 게임, 스트리밍 미디어, VoIP서비스에 자주 쓰이며, 지연시간이 적은 인터넷 전송 프로토콜입니다.

### 특징

- 전송 속도 향상
  - TCP는 연결을 위해 3방향 핸드 쉐이크가 필요함
  - QUIC은 UDP 위에 구축되므로 TLS 포함한 연결에서 1개의 패킷이 필요하다

## 추가 검색어

- Rocket(러스트)
  - 러스트 기반으로 만들어져서 빠르다넹
- 스트리밍 원리
- 
