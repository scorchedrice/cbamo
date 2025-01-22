# JS 동기와 비동기 처리

> 2025.01.22 (wed)  
> **작성자** : 정진영

### 학습 목표

1. 동기와 비동기 작업의 차이점과 사용 이유
2. 자바스크립트에서의 비동기 작업에 대한 이해

<br>

## 동기적 작업 vs 비동기적 작업

![동기 비동기 작업 이미지](https://wikidocs.net/images/page/228265/iShot_2024-01-22_19.02.06.png)
_자료 참고 : Do it! Node,js_

### 동기 Synchronous

프로그램의 실행 흐름이 순차적으로 진행  
하나의 작업이 완료된 후에 다음 작업이 실행되는 방식

> 🔑 서버에서 요청을 보낸 후 **응답을 받아야** 다음 동작을 **순차적으로** 진행하는 **직렬적인** 테스크 방식

### 비동기 Asynchronous

프로그램의 실행 흐름이 순차적이지 않다.  
즉, 이전 작업의 응답을 기다리지 않고 다음 작업의 요청이 실행되는 방식

> 🔑 작업의 완료 여부를 신경 쓰지 않고 동시에 다른 작업들을 수행할 수 있다.

> 🔑 서버에서 요청을 보냈을 때 **응답 여부를 기다리지 않고** 다음 동작을 수행할 수 있는 **병렬적인** 테스크 방식

> 🔑 응답이 빨리 오는 작업 부터 처리할 수 있다.

<br>

![동기 비동기 작업 2](https://i.imgur.com/hh3Mawr.png)
_자료 참고 : 벨로퍼트와 함께 하는 모던 자바스크립트_

## 싱글 스레드인 자바스크립드에서 비동기 작업은 어떻게 일어날까?

![싱글 스레드와 멀티 스레드](https://velog.velcdn.com/images/devmag/post/d84c2dee-fe27-426d-b1b1-430e826bad2d/image.png)
_참고 : [자료 블로그](https://velog.io/@devmag/Javascript-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%8A%94-%EC%8B%B1%EA%B8%80-%EC%8A%A4%EB%A0%88%EB%93%9C%EC%9D%B8%EA%B0%80)_

<br>

자바스크립트는 싱글 스레드로 한 번에 하나의 코드만 실행시킬 수 있다.

> _thread_ : 작업을 처리할 때 실제로 작업을 수행하는 주체

따라서 자바스크립트가 비동기 처리를 할 수 있도록 **도와주는 환경**이 필요하다.

> 비동기와 관련된 작업은 **"브라우저"** 또는 **"Node"** 와 같은 환경에서 처리된다.

![자바 스크립트 런타임 환경](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F999DB3485C3214E122)
브라우저 환경에서의 자바스크립트 런타임 환경을 표현한 이미지  
_참고 : [자료 블로그](https://new93helloworld.tistory.com/358)_

위의 그림을 통해 알 수 있듯이, 브라우저에서 제공되는 **이벤트 루브** 덕분에 싱글 스레드인 자바스크립트에서 병렬적인 작업 처리가 가능하게 된다.

> 자바스크립트 비동기 런타임 과정
>
> 1. Call Stack: 자바스크립트의 싱글 스레드 작업을 순차적으로 처리하는 단일 호출 스택 (LIFO)
> 2. Wep APIs : 브라우저에서 제공되는 런타임 환경. <br>DOM 이벤트, HTTP 요청, setTimeout과 같은 비동기 함수들을 처리 <br> <u>Call Stack 으로 바로 보내는 것이 아니라 Callback Queue로 응답을 보낸다.</u>
> 3. Callback Queue(Task Queue): 비동기 처리된 콜백 함수가 대기하는 Queue (FIFO)
> 4. Event Loop : Call Stack 과 Task Queuefmf wlthrwjrdmfh ah
>    <br> 태스크가 있으면 처리하고, 없을 경우 잠드는 <u>자바스크립트 내 루프</u> > <b
>    <br> Call Stack 이 비어 있다면 Queue에서 가장 오래된 작업을 Push
