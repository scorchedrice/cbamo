### Yarn berry란 ?

yarn Berry는 기존 Yarn보다 더 빠르고 효율적으로 패키지를 관리하는 방식이다.

---

## Yarn Berry의 주요 최적화 기능

### Zero-Install

- 기존 Yarn은 `node_modules/`에 패키지를 저장
- Yarn Berry는 `.yarn/cache/`에 저장하여, **node_modules/ 없이 동작 가능**
- `.yarn/cache/` 폴더만 있으면, 별도 설치 없이 즉시 실행이 가능하다.

<br>

git clone 후 바로 실행 가능 : `.yarn/cache`가 있으면 yarn install 없이 바로 실행이 가능하다.

CI/CD 빌드 속도가 빨라진다. : 패키지를 다시 다운로드할 필요가 없기 때문이다.

### Plug'n'Play (PnP, node_modules 제거)

- node_modules/ 폴더를 완전히 제거하고, 대신 .pnp.cjs라는 파일에서 패키지를 직접 관리
- node_modules/가 없으므로 디스크 용량 절약 및 yarn install 속도 향상

<br>

- 기존 방식 : node_modules/에 저장된 패키지를 하나씩 탐색 → 속도 느림
- PnP 방식 : .pnp.cjs에서 바로 참조 → 속도 빠름

### Workspace 개선(모노레포 최적화)

- 더 효율적으로 workspace르르 관리할 수 있게 된다.
- 패키지를 중복 설치하지 않고 공유하여 속도를 높이기 때문이다.
- 여러 프로젝트에서 공통 패키지를 공유 -> 설치 속도 & 용량 최적화

### Offline Cache (오프라인 캐시)

- 한 번 설치한 패키지는 .yarn/cache/에 저장되어, 인터넷이 없어도 재사용 가능
- yarn install --offline 실행 시, 캐시에서 패키지를 가져와 빠르게 설치 가능
