# WebSocket

> 목차
>
> 1. Sokcet Programming
> 2. WebSocket
> 3. 한계 및 해결 방법

<br>

## 1. Socket Programming

### Socket 이란?

소켓(socket)이란 **네트워크를 통해 데이터를 주고 받기 위한 통신 끝점(Endpoint)**을 의미한다.  
클라이언트와 서버가 서로 데이터를 송수신할 수 있도록 연결을 관리하는 역할을 한다.

- 소켓 통신 방식에는 TCP와 UDP가 있다.

### Socket Programming

프로세스 간 통신에 사용되는 Socket을 이용한 통신 프로그래밍을 Socket Programming이라고 한다.  
통신 연결 오쳥을 보내는 **Client Socket** 과 통신 연결 요청을 받는 **Server Socket**이 있다.
통신을 하기 위해선 양쪽의 Socket이 모두 열려있어야 한다.(open)

---

### 클라이언트 소켓 처리 흐름

| 단계                             | 설명                                    |
| -------------------------------- | --------------------------------------- |
| 1. Client Socket 생성            | 연결 대상 정보 없이 소켓을 생성         |
| 2. 연결 요청(Connection)         | IP 주소와 Port 번호로 서버에 연결 요청  |
| 3. 데이터 송수신 (Send, Receive) | 요청을 보내고 응답을 받을 때까지 대기   |
| 4. 소켓 닫기                     | 더 이상 통신이 필요 없을 때 소켓을 닫음 |

### 서버 소켓 처리 흐름

데이터 통신에 있어서 가장 중요한 것은 **보안**이다.  
요청한 데이터를 송신할 때 정확하게 해당 위치로 무사히 보내는 것이 중요하다.

따라서, 데이터를 받을 호스트의 특정 프로세스를 식별하는 것이 필요하고 이때 **Port**를 활용한다.  
\*\*Port란 네트워크를 통해 데이터를 주고 받을 때, 프로세스를 식별하기 위해 호스트 내부적으로 <u>프로세스가 할당받은 고유한 값이다.</u>

| 단계                              | 설명                                                                                                                                                                        |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Server Socket 생성             | 연결 대상 정보 없이 소켓을 생성                                                                                                                                             |
| 2. Server Socket 바인딩 (bind)    | `소켓과 특정 Port 번호를 결합  `                                                                                                                                            |
|                                   | 하나의 프로세스는 같은 Port를 가진 여러 개의 Socket을 열 수 있다. <Br> (예시) '진영' Port에 socket1, 2, 3 을 열어 socket 1은 지웅이랑, socket2로는 희진이랑 대화할 수 있다. |
| 3. Client 연결 요청 대기 (listen) | 클라이언트 연결 요청을 대기 <br> **소켓 생성 후 연결 요청을 기다리고 있는다. `아직 연결이 된 것은 아니다`.**                                                                |
| 4. Client 연결 수립 (accept)      | 클라이언트 요청을 받아들이고 새 소켓 생성                                                                                                                                   |
| 5. 데이터 송수신 (Send, Receive)  | 데이터를 주고받는 단계                                                                                                                                                      |
| 6. 소켓 닫기                      | 더 이상 연결이 필요하지 않으면 소켓을 닫음                                                                                                                                  |

<br>

## 2. WebSocket

WebSocket은 웹 환경에서 양방향 실시간 통신을 가능하게 하는 프로토콜이다.  
웹 브라우저는 `HTTP 프로토콜`을 통해 클라이언트와 서버 간의 통신을 진행하는데, 이때 통신은 `단방향 통신`으로 진행되기 때문에 데이터 전성의 한계가 있다.

이러한 한계를 극복하기 위해 WebSocket을 사용하면, 웹 브라우저에서도 Socket 통신을 하는 것 처럼 실시간 데이터를 주고 받을 수 있다.  
Socket 통신 처럼 IP와 Port 통신을 한다는 점에서 비슷하지만 차이가 있는데, WebSocket 처리 흐름을 보면서 이해해보자!

<br>

### WebSocket 통신 처리 흐름

> 1. 핸드셰이크(Handshake)
> 2. 데이터 전송
> 3. 연결 종료

<br>

1. 핸드셰이크(Handshake)

![핸드셰이크](https://ko.javascript.info/article/websocket/websocket-handshake.svg)  
_출처 [모던 자바스크립트](https://ko.javascript.info/websocket)_

- 웹 브라우저와 서버의 `연결`을 시작하는 단계를 `핸드셰이크`라고한다.

![핸드셰이크 요청 과정](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fco655s%2FbtrdeYoPPyx%2FgsBBGuuaOo4YVNCrWckmE1%2Fimg.png)  
_출처: [블로그](https://mingule.tistory.com/60)_

- 클라이언트는 서버에 HTTP 요청을 보내며, 헤더에 Upgrade: websocket과 Connection: Upgrade를 포함시켜 `프로토콜 업그레이드`를 요청한다.
  - WebSocket은 HTTP와 다르지만 호환이 가능하다.
  - 이런 호환을 위해 헤더에 `HTTP Upgrade header`를 사용해 HTTP Protocol 내의` WebSocket Protocol`로 변경된다.
- 서버는 이를 수락하면 `응답 코드 101 Switching Protocols`와 함께 웹소켓 연결을 수립한다.

<br>

2. 데이터 전송 (Data Transfer)

- 연결이 되면 클라이언트와 서버는 `프레임`단위로 데이터를 주고받을 수 있다.
- 프레임은 텍스트, 바이너리 데이터, 연결 유지 확인을 위한 핑/퐁(ping/pong) 등으로 구성된다.

<br>

3. 연결 종료 (Close Handshake)

- 데이터 전송이 완료되거나 연결을 종료하고자 할 때, 클라이언트나 서버는 `Close 프레임`을 전송하여 연결을 종료한다.

## 3. WebSocket의 한계와 대안

웹소켓은 실시간 양방향 통신이라는 강력한 기능을 제공하지만, 다음과 같은 한계가 있다.

- 구현의 복잡성: 기존의 HTTP 기반 통신에 비해 구현이 복잡하다.
- 브라우저 호환성: 일부 구형 브라우저에서는 웹소켓을 지원하지 않을 수 있다.
- 상태 유지: 웹소켓은 상태를 유지해야 하므로, 연결 관리에 추가적인 노력이 필요하다.
  - WebSocket은 Stateful Protocol 이기 때문에 연결을 항상 유지 하기 위해 이전 상태를 확인해야 한다.

HTML 5 이전의 기술에 적용이 어렵다는 문제에 대한 해결책을 알아보자.

### Socket.io

[https://socket.io/](https://socket.io/)

Socket.io는 `Node.js` 기반으로 만들어진 기술로 Javascript를 이용해 **브라우저의 종류에 상관없이 실시간 통신을 구현**할 수 있도록 한 라이브러리이다.

브라우저가 WebSocket을 지원하면 그대로 WebSocket 방식으로 동작하고, 지원하지 않는 브라우저면 HTTP Protocol을 이용해 실시간 통신을 흉내낸다.

> 참고
>
> Node.js를 기반으로 만들어진 기술이기 때문에, Server는 다른 대안 없이 Node.js를 사용해야 한다.

<br>

---

### Sock.js

[http://sockjs.org/](http://sockjs.org/)

- Socket.io와 마찬가지로 브라우저의 종류와 관계 없이 실시간 통신을 구현할 수 있도록 한 라이브러리이다.
- Sokcet.io 와 다른 점은 `Spring Framework`에서 WebSocket을 사용할 때의 대비책으로 사용된다는 것이다.

---

### Stomp

[https://stomp.github.io/](https://stomp.github.io/)

WebSocket을 통해 메시지(Text / Binary)를 주고 받을 수 있다.  
하지만 WebSocket 자체에서 해당 메시지가 어떤 요청으로 어떤 포맷으로 오는지 정해져 있지 않기 때문에 각각 정해주어야 한다.

이러한 메시지 전송의 불편함을 해소하기 위해 Stomp를 사용할 수 있다.

Stomp는 WebSocket 상에서 동작하며 Client와 Server가 서로 통신하는 데 있어서 메시지의 형식, 유형, 내용 등을 정의해주는 Protocol이라고 할 수 있다.

> 참고
> Stomp JS 라이브러리를 통해 쉽게 해당 프로토콜을 사용할 수 있다.

## (비교) 웹소켓과 HTTP 기반 실시간 통신 비교

웹소켓이 등장하기 전에, HTTP를 이용한 실시간 통신 방식으로는 폴링(Polling), 롱 폴링(Long Polling), 스트리밍(Streaming) 등이 있었다..

![폴링(Polling)](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbFy36p%2FbtrdeYvBrzB%2FTXGOoj8u6LK9anJkwdoYik%2Fimg.png)

폴링(Polling)  
: 클라이언트가 일정 주기마다 서버에 요청을 보내 새로운 데이터가 있는지 확인하는 방식으로, 실시간성이 떨어지고 서버 부하가 증가합니다.

![롱폴링(Long Polling)](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FyvDnZ%2FbtrdfHAlNRp%2FbjUGG2HbC5MeN4K1qTanO1%2Fimg.png)

롱 폴링(Long Polling)  
: 클라이언트가 서버에 요청을 보내고, 서버는 새로운 데이터가 생길 때까지 연결을 유지한 후 응답을 보내는 방식으로, 폴링에 비해 효율적이지만 여전히 서버 부하가 발생할 수 있습니다.

![스트리밍(Streaming)](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FblIzMM%2Fbtrdd4JOwxW%2FHtH11Y266YCcgxmvdi6tkk%2Fimg.png)

스트리밍(Streaming)  
: 클라이언트가 서버와의 연결을 유지하면서 지속적으로 데이터를 수신하는 방식으로, 실시간 데이터 전송에 적합하지만 구현이 복잡합니다.

웹소켓은 이러한 방식들의 단점을 보완하여, 보다 효율적이고 실시간성이 높은 통신을 제공한다.
