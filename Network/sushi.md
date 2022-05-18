# What is sushi

- Elk os를 작동시키는 핵심 오디오 엔진이다
- 작은 daw라고 생각해주세요
  - vst 플러그인을 설정하고 실행하기만 하면 다양한 플러그인 실행이 가능하다
- json으로 파일을 구성할 것
- 런타임 중에는 네트워크를 통해 gRPC와 OSC를 통해 제어된다

## 의문 사항

- raspa는 무엇인가
  - 낮은 지연 시간 오디오 프레임워크라는데?
  - 스시는 이를 이용해 동기화 되도록 만들어짐
- twine은 무엇인가
  - 타사 플러그인을 사용할 수 있다는데?
- Jack은 무엇인가?
  - 리눅스에서 가장 보편적으로 사용하는 오디오 프레임 워크라 하긴함

## Reference

[ELk Docs sens](https://elk-audio.github.io/elk-docs/html/documents/sensei_configuration_format.html?highlight=sushi)
