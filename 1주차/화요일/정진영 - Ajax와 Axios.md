# Ajax와 Axios

> 2025.01.22 (wed)  
> **작성자** : 정진영

### 학습 목표

1. 자바스크립트를 통한 웹 페이지에서의 비동기 작업 프로그래밍에 대한 이해
2. 몸으로 부딪혔던 프로젝트에서 작성했던 코드들을 다시 머리로 이해하기

<br>

## Ajax : Asynchronous JavaScript And XML

XMLHttpRequest 기술을 사용해 복잡하고 동적인 웹 페이지를 구성하는 프로그래밍 방식
(흔히 라이브러리라고 생각하는데, 라이브러리가 아니라 기술 방식으로 이해하면 되겠다.)

> - 비동기적인 웹 애플리케이션 개발을 위한 기술
> - 브라우저와 서버 간의 데이터를 비동기적으로 교환하는 기술
> - Ajax를 통해 새로고침을 하지 않아도 동적으로 데이터를 불러와 화면 갱신 가능

<br>
<br>

## 왜 Ajax를 사용하는 걸까?

전체 페이지가 다시 로드되지 않고 HTML 페이지 일부 DOM만 업데이트 하여 비동기식으로 작업이 가능하다.

> **XHR** : XMLHttpRequest 객체
> <br> 서버와 상호작용할 때 사용하는 객체로, 새로고침 없이도 데이터를 가져올 수 있다.

![기존 통신 방식](https://velog.velcdn.com/images/ung6860/post/69c85a08-fc01-4ed6-8bb7-b204ec1df453/image.png)
기존 HTTP 방식에 따라 요청에 응답을 처리하는 과정  
_참고 : [자료 블로그](https://velog.io/@ung6860/AJAX-%EA%B8%B0%EB%B3%B8%EA%B0%9C%EB%85%90%EC%9E%A1%EA%B8%B0)_

> <기존 통신 방식>
>
> 1. 클라이언트에서 form 을 채우고 서버로 제출
> 2. 서버는 요청 내용에 따라 데이터 처리 후 새로운 웹페이지를 작성(html)하여 응답으로 전달

위의 과정에서 알 수 있는 것 처럼 , 결과적으로 모든 요청에 따라 새로운 페이지를 응답 받기 때문에 계속해서 **새로고침이 발생**한다.  
기존 페이지와 **중복된 코드를 다시 전송 받음**으로써 낭비하게 되는 경우가 발생할 수 있다.

<br>

![기존 통신 방식](https://velog.velcdn.com/images/ung6860/post/05ce054a-55fb-423f-b5e4-170431ac571f/image.png)
AJAX를 통한 요청에 대한 응답 처리 과정
_참고 : [자료 블로그](https://velog.io/@ung6860/AJAX-%EA%B8%B0%EB%B3%B8%EA%B0%9C%EB%85%90%EC%9E%A1%EA%B8%B0)_

> < Ajax 방식 >
>
> 1. 클라이언트 : XHR 객체 생성 및 요청
> 2. 서버 : 새로운 페이지를 응답으로 생성하지 않고, 필요한 부분에 대한 데이터만 처리 후 응답 (Json 및 기타 데이터)

즉 Ajax 방식을 통해 비동기로 처리하면 기존 페이지에서 새로고침 하지 않고 **일부를 수정**할 수 있게 된다.
이 과정을 통해 교환되는 데이터량과 처리량을 감소할 수 있다.

<br>

### XMLHttpRequest 가 정확하게 뭐지 ?

> XMLHttpRequest란 자바스크립트를 사용하여 **서버에 HTTP 요청을 할 수 있는 객체**이다.
> XML 데이터 타입 뿐만 아니라 모든 종류의 데이터를 가져올 수 있다.

해당 객체를 통해 브라우저와 서버 간의 네트워크 요청을 전송할 수 있다.  
사용자의 작업을 방해하지 않고 페이지의 일부만 업데이트 할 수 있다.

## Axios

![axios logo](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Axios_logo_%282020%29.svg/150px-Axios_logo_%282020%29.svg.png)

자바스크립트에서 사용되는 HTTP 클라이언트 라이브러리

> 서버와 클라이언트 간의 HTTP 요청과 응답을 만들고 응답을 처리할 수 있도록 도아주는 도구
>
> 1. 브라우저를 위한 XML 객체를 생성 후 서버에 전송
> 2. 간편한 API 제공
> 3. Promise 기반의 비동기 요청 처리

### Axios를 사용한, Ajax 클라이언트 서버 간 동작

겹치는 부분이 많은데 과정을 살펴보면 이해하기 쉽다.

---

1. Axios 라이브러리를 활용해 XML 객체 생성 및 http 요청
2. 서버 : Ajax 요청 처리 및 응답 데이터 셍성
3. Json 데이터로 응답 -> 클라이언트
4. 이 과정에서 Axios가 Promise 객체로 응답 데이터를 제공
5. 클라이언트 : 응답 데이터를 활용해 DOM 조작

---

<br>

### 개발 과정에서 비동기 처리에 대해 절망한 적이 있습니까?

비동기 처리의 핵심은 Wep API로 들어오는 순서가 아니라 작업이 완료된 순서이다.  
개발자 입장에서는 **코드의 실행 순서가 불명확하기 때문에** 실행 결과를 예상하면서 코드를 작성할 수 없게 된다.

## 비동기 콜백(callback)

비동기적으로 처리되는 작업이 완료되었을 때 실행되는 함수  
연쇄적으로 발생하는 비동기 작업을 순차적으로 동작할 수 있게 하여 작업의 순서 및 동작을 제어하거나 결과를 처리하는데 사용한다.

![콜백지옥함수](https://blog.kakaocdn.net/dn/oyMen/btssCtHeLSA/t7CqwQgzqIxseqvZXq6Iu0/img.png)

> 비동기 코드를 작성하다 보면 콜백 함수로 인한 콜백 지옥이 발생하게 되어 코드의 가독성을 해치고 유지 보수가 어려워진다.
> <u>콜백 지옥 문제를 해결하기 위한 비동기 처리 객체가 필요하다</u>

## Promise 객체

![promise 객체](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/promises.png)
_참고 : [JavaScript MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise)_

자바스크립트에서 비동기 작업의 결과를 나타내는 객체
비동기 작업이 완료되었을 때 결과 값을 반환하거나, 실패 시 에러를 처리할 수 있는 기능을 제공한다.

> Axios : Promise 기반의 HTTP 클라이언트 라이브러리
> 성공 : then(callback) => callback == response
> 실패 : catch(callback) => callback == error

```javascript
// 예시 코드
axios({})
    .then(response1)
    .then(response2)
    ...
    .catch(error)
```

> then 과 catch의 chaining
> then 과 catch는 모두 항상 promise 객체를 반환한다.  
> then을 계속 이어서 작성할 수 있다.(chaining)  
> <u>호출 순서를 보장할 수 있다.(Promise의 장점)</u>

<br>

### 근본적인 질문, 왜 비동기 처리가 필요할까? : 사용자 경험

> 네 가지 키워드로 생각해보자  
> (1)웹 페이지의 반응성 향상, (2)네트워크 통신, (3)병렬 처리, (4)에러 처리

1. **웹 페이지 반응성 향상** : 사용자가 요청한 작업이 완료될 때 까지 빈 페이지만 보며 기다리는 것은 사용자 경험을 저해시킨다. 비동기 처리를 통해 빠르게 반응할 수 있도록 해야 한다.

2. **네트워크 통신** : 동기적인 처리를 하게 되면 서버에서 응답을 기다리는 동안 다른 작업을 수행할 수 없다. 따라서 비동기적으로 데이터를 받아 오는 것이 성능 향상에 도움이 된다.

3. **병렬 처리** : promise를 공부하며 가장 중요한 부분인 비동기 처리를 원하는 순서로 동적으로/병렬적으로 처리할 수 있게 된다.

4. **에러 처리** : 에러를 처리할 수 있는 콜백 함수를 실행하여 프로그램의 안전성을 높일 수 있다.

## Async와 Await

먼저 정의를 보자.

> async와 await는 ES2017(ECMAScript 8)부터 추가된 자바스크립트의 비동기 처리 방식 중 하나이다.  
> async와 await를 사용하면 비동기 코드를 동기 코드처럼 작성할 수 있어, 가독성이 좋아지고 에러 처리가 간단해진다.

<br>

**async**는 함수의 앞에 붙여 해당 함수가 비동기 함수임을 나타내며, **await**는 비동기 함수의 실행 결과를 기다리는 키워드이다.  
async 함수 안에 await 키워드를 사용하여 해당 <u>비동기 작업이 완료 될 때 까지 코드 실행을 일시 중단하고</u> 결과를 기다린 다음 해당 결과를 반환한다.  
**try.. catch** 를 통해 axios와 마찬가지로 병렬적 처리를 할 수 있게 된다.

<br><br>

## 프로젝트 회고

사실 프로젝트를 진행할 때 axios와 async/await을 기준 없이 입맛대로 사용했던 것 같다.
서로 다른 개념이지만. 웹 개발에서 비동기 작업을 수행할 때 함께 사용되는 경우가 있으니 비교하며 정리해보자.

<br>

---

| 항목      | async/await                                     | axios                                   |
| --------- | ----------------------------------------------- | --------------------------------------- |
| 개념      | JavaScript의 비동기 처리 방식 (ES8)             | HTTP 요청을 위한 라이브러리             |
| 작동 방식 | Promise 기반의 코드 흐름 제어                   | HTTP 요청을 간편하게 수행하는 기능 제공 |
| 주요 역할 | 비동기 코드의 가독성 향상, 동기적 코드처럼 작성 | AJAX 요청을 더 쉽고 강력하게 수행       |
| 사용법    | async function 및 await 키워드 사용             | axios.get(), axios.post() 등 사용       |
| 예외 처리 | try...catch 블록으로 예외 처리                  | .catch()로 오류 처리 가능               |

---

1. 예시 코드 (가독성 )
   > async 와 await를 사용하면 비동기 처리를 더 간결하게 작성할 수 있다. (가독성 향상)

```js
// 예시 코드 1 : axios
axios
  .get("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

```js
// 예시 코드 2 : axios + await/async
async function fetchData() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error:", error);
  }
}
fetchData();
```

<br>

2. 비교 : 언제 무엇을 사용할까?

   | 상황                       | async/await 사용 추천 | axios 사용 추천     |
   | -------------------------- | --------------------- | ------------------- |
   | 비동기 흐름이 복잡할 때    | ✅                    | ❌                  |
   | 간단한 HTTP 요청을 보낼 때 | ❌                    | ✅                  |
   | 병렬 요청이 필요할 때      | ✅                    | ✅ (axios.all)      |
   | 에러 핸들링이 중요한 경우  | ✅ (try...catch)      | ✅ (.catch())       |
   | 가독성을 높이고 싶을 때    | ✅                    | ✅ (함께 사용 가능) |
