# 해결해야할 에러 집합소

## audio hat 없이 소리를 직접 뽑자

- sushi에서는 로컬에서 그냥 파일을 재생할 수 있다.
  - 실제로 진행 했더니 해당 디렉터리가 없다고 뜬다.
  - 대응 방안
    1. sushi를 따로 vm에서 다시 build 하는 것이다.정확히는 커널에 맞는 드라이버가 기본 이미지에 깔려있지 않음.
       - 예상가는거라면 elk os의 경우 sushi를 사용하고 있긴 하지만 리얼 타임용임
       - 그래서 파일 재생을 지원하지 않을 수도 있음, 설정이 되어 있지 않거나
    2. sushi -o -i input_file.wav -c /home/mind/config_files/config_offline_mode_play.json 
        - local에서 파일을 재생시키는 명령어이다.
        - 위의 커맨드를 칠 경우 앞 서 말했다시피 디렉터리가 없다고 뜬다 ---> 확인해보니 rtdm 드라이버가 안깔려 있음
          - rtdm 드라이버란 elk os 전용 오디오 드라이버임
        - 그래서 elk os sdk 설치 --> rtdm 오디오 드라이버 재설치 --> 성공!?
- 이론적으로는 aconnect로 input 과 output을 지정해주면 소리를 바로 재생할 수 있다.
  - 악기가 없는 경우 그냥 vmpk(가상의 키보드를 설치하여 사용하면 된다.)
  - 하지만 VM에서 테스트 할 경우 오히려 설정하는데 애를 먹을 수 있으니까 그냥 라즈베리파이로 직접 해보는게 좋은 방법이다.
  - aconnect가 json 파일을 읽어서 input과 output을 맵핑 해주는지 알아야한다.
    - 이어폰 꽂아보니까 안됨
- 소리를 출력하려면 JACK 라이브러리 사용법을 알아야한다.
  - 현재 문제는 1차적으로 sushi가 실행되지 않음

- 결론적으로 input과 output을 관장하는건 sushi이다. 하지만 현재 elk os 기본적으로 깔린 sushi가 실행되지 않아서 삽질 중임

## REFERENCE

[Elk audio os Forum](https://forum.elk.audio/)
