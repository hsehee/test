const startButton = document.querySelector(".start_btn");
const openButton = document.querySelector(".modal_btn");
const closeButton = document.querySelector(".close_btn");
const shareButton = document.querySelector(".share_btn");
const loading = document.querySelector(".result_loading");
const result = document.querySelector(".result");
const modal = document.querySelector("#modal");

function calculator() {
  const fieldValue = document.querySelector("#field_value");
  let timeValue = document.querySelector("#time_value");
  let timeValue_int = Number(timeValue.value);

  const fieldResult = document.querySelector(".field_result");
  const timeResult = document.querySelector(".time_result");

  if (fieldValue.value === "") {
    alert("입력되지 않았습니다.");
    fieldValue.focus();
    return false; /*이 의미에 제대로 이해하기*/
  } else if (timeValue.value === "") {
    /*null 값이나 숫자가 아닌 값이 들어오면 다른 메시지를 출력*/
    alert(
      "입력되지 않았습니다."
    ); /*이쪽과 위쪽은 리팩토링으로 묶을 수 있는거 아님? 둘중하나라도 참이아닌경우(입력되지 않은 경우)에 and 조건으로 묶어서 하나라도 참이 아니면 return false 주고 묶어놓은 if문 안에서 만약 time_value가 입력되지 않았는지 field가 입력되지 않았는지를 파악해서 그쪽으로 focus주면되지않나? */
    timeValue.focus();
    return false;
  } else if (timeValue_int > 24) {
    alert("잘못된 값입니다. 24이하의 값을 입력해 주세요.");
    return false;
  } else if (timeValue_int < 1) {
    alert("잘못된 값입니다. 1이상의 값을 입력해 주세요.");
    return false;
  } else if (timeValue.value == NaN) {
    /* 문자로 값이 들어왔을 때 예외처리 해주려면 어떻게해야함 ? 계속 입력되지 않았습니다. 만 뜸 /위에서 굳이 number로 받는이유가 저기서 number가 아닌것이 들어오면 1차적으로 차단할 수 없는거? */
    alert("숫자를 입력해주세요.");
    fieldValue.focus();
    return false;
  }

  //위에 해당하지 않고 정상적으로 값을 입력받는 경우
  result.style.display = "none"; //이미 none인데 명시적으로 선언
  loading.style.display = "flex";

  setTimeout(function () {
    loading.style.display = "none";
    result.style.display = "flex";
    fieldResult.innerText = fieldValue.value;
    timeResult.innerText = parseInt(10000 / timeValue_int, 10); //여기서 ,10은 왜주는거임? parseInt 걸어주는건 소수점 빼기 위함 10은 10진수로 주겠다는 의미
  }, 1800);
}

function openModal() {
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}

window.onclick = function (event) {
  //onclick 하게되면 정의된 함수가 바로 실행됌
  //이해잘안감 언제 세미콜론 붙여야하는지도. function에 event가 들어오는데 그 타깃이 모달영역이면 closeModal 함수를 실행시켜서 modal영역의 display 값을 none으로 변경
  if (event.target == modal) {
    closeModal();
  }
};

function copyUrl() {
  let url = window.location.href;
  let tmp = document.createElement("input"); //이해잘안감

  document.body.appendChild(tmp);
  tmp.value = url;
  tmp.select();
  document.execCommand("copy");
  document.body.removeChild(tmp);

  alert("URL이 복사되었습니다.");
}

startButton.addEventListener("click", calculator);
openButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);
shareButton.addEventListener("click", copyUrl);
