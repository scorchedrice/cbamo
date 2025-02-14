📌✅

## 🤔 GraphQL이란?

![GraphQL](https://velog.velcdn.com/images/hamjw0122/post/2ccb3928-0f18-4916-bad3-fceee4a56000/image.gif)

2015년 Facebook에서 개발한 데이터 쿼리 언어로, 클라이언트로 하여금 필요한 데이터를 명시적으로 정의하여 서버에 요청할 수 있도록 만들어졌다. API를 위한 쿼리 언어로써 서버는 런타임으로 클라이언트에게 요청한 만큼의 데이터를 제공할 수 있다. 아래에서 더 자세히 설명하겠지만, REST API와 달리 하나의 요청으로 여러 자원을 가져올 수 있으며, 과도하거나 부족한 데이터를 받지 않도록 조정할 수 있다.

- Graph + Q(uery)L(anguage): 그래프 구조로 질의를 하는 식

### 💡 Query Language

데이터베이스나 다른 시스템으로부터 정보를 요청할 때 사용하는 언어로 데이터를 검색, 조작하거나 특정 조건에 맞는 데이터를 추출하는 데 사용된다.

- **Query**: 파일의 내용 등을 알기 위해 몇 개의 코드나 키를 기초로 질의하는 것

> SQL (Structured Query Language)

- 관계형 데이터베이스에서 데이터를 관리, 검색, 삽입, 업데이트, 삭제할 때 사용되는 표준 언어
- 목적: 데이터베이스 시스템에 저장된 데이터를 효율적으로 가져오는 것
- 주로 백엔드 시스템에서 작성하고 호출한다.

```sql
SELECT userID, nickname FROM person WHERE role='admin'
```

> GraphQL

- 목적: 웹 클라이언트가 데이터를 서버로부터 효율적으로 가져오는 것
- 주로 클라이언트 시스템에서 작성하고 호출한다.

```GraphQL
{
  person {
    userId
    nickname
  }
}
```

## ✨ GraphQL의 등장

### 🚨 RESTful API의 한계

GraphQL이 등장하기 전, 그리고 지금까지도 가장 많이 사용되고 있는 방식은 2000년에 만들어진 **RESTful** API이다. 아래 API 패러다임의 비교 부분에서 더 자세히 설명하겠지만, RESTful API는 상태를 유지하지 않는 클라이언트-서버 방식의 캐시 가능한 통신 프로토콜을 기반으로 한다. 다시 말해, REST는 클라이언트와 서버가 서로 상태를 기억하지 않고 독립적으로 동작하며, HTTP를 통해 데이터를 주고 받고, 캐시를 통해 성능을 최적화 할 수 있게 설계된 통신 방식이다.

> 여기서 **RESTful**하다는 것은 무엇을 의미할까?

- HTTP 표준을 따르며, 자원을 명확히 URI로 식별하고, 계층화된 구조 및 일관된 인터페이스를 지향하는 API 설계 원칙을 준수하여 API가 설계되었음을 의미한다.
- 각 자원은 하나의 URI로 고유하게 표현되며, 그 자원에 대한 CRUD 작업은 HTTP 메서드로 구분되어야 한다.
- 예를 들어 GET /users/123은 ID가 123인 사용자를 조회하는 endpoint이고, POST /user란 새로운 사용자를 생성하는 endpoint를 의미한다.
- 그리고 표현 계층이 분리되어 있어 클라이언트는 서버의 내부 구현에 대한 지식 없이도 자원에 접근할 수 있어야 한다.

하지만 실제 개발에서는 이러한 원칙을 모두 지키기에는 어려움이 있었고, 그로 인해 RESTful이지만 RESTful하지 않은 API가 만들어지게 되었다. 예를 들어, 게시물에 '좋아요'를 누르는 기능을 구현한다고 했을 때, 이는 단순 CRUD로 표현하기에 한계가 있으므로 /posts/1111/like와 같은 비표준 endpoint가 생성될 수 있다. 또한 인증 상태 유지 등을 위해 클라이언트의 세션 상태를 서버에 저장하고 사용하는 경우에는 RESTful API의 상태 비저장성에 대한 원칙을 어기게 된다.

이외에도 고정된 구조를 따르는 RESTful API에는 여러 한계점들이 있다. 클라이언트가 원하는 형태로 데이터를 조정하기 위해서는 여러 번의 요청을 보내거나, 불필요한 데이터를 받아와야 할 때가 많았는데 이는 데이터의 Over-fetching 또는 Under-fetching 문제로 이어졌다. 불필요한 데이터가 과도하게 전송되거나, 한 번의 요청으로 충분하지 못한 데이터를 제공하지 못해 다중 요청으로 이어지는 경우가 발생했기 때문이다.

예를 들어, 특정 사용자의 정보를 받아오는 endpoint가 존재한다고 가정해보자.

```
{
  name: "User_A",
  age: 100,
  connected: ["User_B", "User_C"]
}
```

User_A의 정보를 받아온 후 친구로 연결되어 있는 다른 사용자들의 정보를 받으려고 하는 경우 친구들의 정보를 순회하며 개별로 요청을 보내거나 친구인 사용자들의 정보까지 받아올 수 있는 새로운 endpoint를 만들어야 하는 문제가 발생한다.

## 그리고 GraphQL이 탄생!
![](https://velog.velcdn.com/images/hamjw0122/post/4a1b5b13-93dd-4018-8102-f8d97661a3ae/image.png)

만약 위의 RESTful API 설명에서 들었던 예시 상황을 GraphQL을 통해 구현한다면 어떻게 될까?

```
query FindStudent {
  student {
    name
    age
    friends {
      name
      age
    }
  }
}
```

이와 같이 Body에 조건에 맞는 데이터에 대한 쿼리를 담아 HTTP PUT을 통해 단일 endpoint로 요청할 수 있다.

## 🦴 GraphQL의 원리

앞에서도 언급했듯, GraphQL은 API와 통신할 때 조금 더 효율적으로 데이터를 주고 받을 수 있게 도와주는 도구로, 웹/모바일 앱(HTTP client) 개발자가 백엔드 API로부터 필요한 데이터만 정확하게 가져올 수 있도록 설계되었다. 주로 HTTP 상에서 사용되며, 여러 자원을 위해 다른 HTTP endpoint에 접근하는 대신 하나의 endpoint에 쿼리를 POST할 수 있다. 다시 말해, 특정 데이터를 요청할 때마다 각기 다른 endpoint에 접근해야 했던 REST API와는 달리 GraphQL에서는 하나의 endpoint로 모든 요청을 처리하는 것이 가능해졌다.

### GraphQL은 어떻게 동작할까?

> 쿼리 언어로서의 GraphQL

GraphQL은 클라이언트가 서버로부터 필요한 데이터를 요청하는 방식을 정의하는 쿼리 언어로, 원하는 데이터를 구체적으로 지정하여 여러 자원에 대해 불필요한 데이터를 받지 않게 한다. 중첩된 구조로 설계된 쿼리를 통해 관련된 객체를 한 번에 순회하여 데이터를 요청할 수 있다. 사용자 정보와 해당 사용자가 작성한 게시물을 한 번의 요청으로 가져와야 하는 상황을 가정해보자.

```
query {
  user(id: "123") {
    name
    email
    posts {
      title
      content
      createdAt
    }
  }
}
```

GraphQL에서는 쿼리를 중첩시킬 수 있기 때문에 클라이언트는 사용자 정보와 그 사용자가 작성한 게시물의 정보를 한 번의 쿼리를 통해 아래와 같은 JSON 형식으로 가져올 수 있다.

```
{
  "data": {
    "user": {
      "name": "User",
      "email": "user@example.com",
      "posts": [
        {
          "title": "GraphQL Basics",
          "content": "GraphQL이란...??",
          "createdAt": "2024-09-08T12:34:56Z"
        },
        {
          "title": "Advanced GraphQL",
          "content": "GraphQL의 동작 원리",
          "createdAt": "2024-09-09T08:21:34Z"
        }
      ]
    }
  }
}
```

> Type System을 통한 Query 검증

GraphQL Schema는 API의 구조를 정의하는 문서로, 데이터 타입과 쿼리의 형식을 명세한다.

|구분|설명|
|----|----------------|
|Types|데이터의 구조 (User, Post)|
|Query Type|클라이언트가 요청할 수 있는 데이터의 Root Field|
|Mutation Type|데이터를 생성, 수정, 삭제할 수 있는 메서드에 대한 정의|
|Subscription Type|실시간 데이터 업데이트를 위해 클라이언트가 구독할 수 있는 필드에 대한 정의|

```
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}

type Post {
  title: String!
  content: String!
  createdAt: String!
}

type Query {
  user(id: ID!): User
  posts: [Post!]!
}
```

> 선언적 Data Fetching

프로그래밍의 관점에서 선언적(Declarative)이라는 것은 무엇을 원하는지를 명시하는 방식을 의미한다. 이는 어떻게 수행할 것인지를 명시하는 명령적(Imperative) 프로그래밍과 대조된다. 선언적 프로그래밍에서 개발자는 원하는 결과만 명시하고, 컴퓨터가 해당 작업을 어떻게 처리해야 할지에 대한 세부 사항은 직접 명시하지 않는다.

그리고 개발자가 클라이언트에 필요한 데이터를 명시적으로 나열하면, 서버는 그 데이터를 적절하게 제공한다는 점에서 GraphQL은 선언적이라고 할 수 있다. 개발자는 데이터를 어떻게 가져오는지에 대해 고려하지 않고 필요한 데이터에 대해서만 정의하면 서버가 해당 데이터를 찾아 반환하는 작업을 하게 된다.

## 🏃‍♀️ GraphQL의 클라이언트-서버 플로우

아래의 플로우를 통해 클라이언트는 불필요한 데이터 없이 필요한 데이터만 정확하게 요청하고 반환받을 수 있게 된다.

> 1. 클라이언트에서 쿼리를 전송한다.

이 쿼리는 스키마에서 정의한 데이터 타입과 필드에 따라 작성된다.

```
query {
  user(id: "123123") {
    name
    email
    posts {
      title
      content
    }
  }
}
```

GraphQL 쿼리는 JSON이 아니지만, 요청하는 데이터 구조는 JSON과 유사하게 구성되어 있다. 클라이언트가 서버로 GraphQL 쿼리를 보낼때는 아래처럼 string 형태로 전송된다.

```
{
 {
  "query": "query { user(id: \"123123\") { name email posts { title content } } }"
 }
}
```

> 2. 서버에서 쿼리를 처리한다.

서버는 클라이언트에게 전달받은 JSON 객체에서 쿼리 문자열을 추출한다. 이후 GraphQL의 구문과 서버에 정의된 GraphQL 스키마에 따라 이 쿼리를 처리하고 검증한다. 이 단계에서 서버는 쿼리가 올바르게 작성되었고 요청한 데이터 구조가 스키마에 부합하는지 확인한다.

서버는 두 단계에 걸쳐 클라이언트가 전송한 쿼리를 검증한다.
- 구문 검증 (Syntax Validation)
    - 쿼리가 올바른 GraphQL 문법에 맞게 작성되었는지 확인한다.
    - ex) 쿼리에서 올바르지 않은 필드나 문법이 사용되었는지

- 타입 검증 (Type Validation)
    - 쿼리에서 요청한 필드가 스키마에 정의된 타입과 일치하는지 확인한다.
    - ex) posts 필드가 User 타입의 posts 필드에 정의된 대로 Post 배열로 반환되는지

> 3. 서버는 DB나 외부 서비스에 요청을 보낸다.

두 번째 단계를 통해 쿼리에 대한 검증이 완료되면 일반적인 API 서버처럼 GraphQL 서버도 데이터베이스나 다른 외부 서비스에 요청을 보낸다. 이때 Resolver는 클라이언트가 요청한 각 필드에 대한 데이터를 어떻게 가져올지 정의하고, 필드별 로직을 처리한다. 해당 필드의 데이터들은 Resolver에 의해 조회되거나 계산된다.

예를 들어, 게시물의 제목을 가져오는 title 필드에 대한 요청이 있었다면 Resolver는 게시물의 제목을 데이터베이스에 조회하여 반환하게 된다.

> 4. 서버에서 클라이언트로 응답을 반환한다.

서버는 Resolver를 사용하여 가져온 데이터를 처리한 뒤 이를 JSON 객체의 형태로 클라이언트에 반환한다. 자세히 설명하자면, Resolver는 이 과정에서 데이터의 통합 및 변형 과정을 거친다. 각각 다른 데이터베이스에서 가져온 데이터 소스들을 조합하여 응답을 생성하고, 원시 데이터들을 GraphQL 스키마에 맞는 형태로 변형할 수 있다. 이후 Resolver가 요청된 데이터에 대한 준비를 완료하면 서버는 이를 JSON 형식으로 직렬화하여 클라이언트에게 응답한다. 이를 통해 클라이언트는 자신이 요청한 데이터만 정확하게 받을 수 있게 된다.

![](https://velog.velcdn.com/images/hamjw0122/post/d134c3be-8096-4df1-9cbb-730e5d886685/image.png)

## 🤼 GraphQL vs RESTful API vs gRPC

![](https://velog.velcdn.com/images/hamjw0122/post/f4ae7a06-2e0d-4a54-9dea-36e56c3dd5ca/image.png)