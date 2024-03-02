# 갤러리

unsplash API를 활용한 갤러리입니다.

## ⚡Stack

<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">

## 🚥How to run

```sh
npm install
npm run dev
```

최상위 경로에 .nev파일 생성 후 UNSPLASH_API_KEY, UNSPLASH_ACCESS_TOKEN 값 선언

## ❗Troubleshooting

#### 쿼리가 없는 이미지 검색과 쿼리가 있는 이미지 검색의 return 데이터가 달라 분리

- 쿼리가 필요한 이미지 API는 이미지의 총 갯수를 return하여 페이지네이션이 가능하나 쿼리가 필요 없는 이미지 API의 경우 이미지의 총 갯수를 알려주지 않아 페이지네이션을 할 수 없어 Infinte Scorll을 구현하여 화면 끝에 있는 DIV를 탐지한다면 API를 호출하는 로직을 추가하였습니다.

#### 무한 스크롤 구현 중 scroll Event의 문제 해결을 위해 Intersection Observer 사용

- 현재 위치가 페이지의 마지막 부분에 있다는 것을 알기하기 위해 스크롤 이벤트를 사용해봤으나 스크롤이 이동할때마다 계속 호출되는 문제가 있어 이를 해결하기 위해 요소를 탐지하는 Intersection Observer API의 IntersectionObserver을 사용하여 스크롤 이벤트 대비 성능을 향상시켰습니다.

#### 상세 정보 모달 화면과 검색 화면의 북마크 동기화 문제

- Recoil의 전역상태관리를 이용하여 상세 정보 모달 화면의 북마크 변경 여부를 동기화 할 수 있는 전역상태를 추가하여 해결하였습니다.

#### 검색 컴포넌트에서 페이지이동시 query string만 변경되고 변경된 query string으로 조회가 되지 않는 문제

- useEffect Hook과 똑같이 컴포넌트가 렌더링 될때마다 실행되지만 최초 렌더링시에는 호출되지 않는 useDidMountEffect customhooks를 만들어 navigate 로직을 넣고 location을 의존성배열로 갖는 useEffect Hook을 사용해 page가 변경될 때마다 URL을 변경하고 URl이 변경되면 page값과 query string 값으로 리스트를 조회하여 문제를 해결하였습니다.