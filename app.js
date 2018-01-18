// 예산 컨트롤러
var budgetController = (function () {


})();

// UI 컨트롤러
var UIController = (function () {

})();

// 글로벌 앱 컨트롤러
var controller = (function (budgetCtrl, UICtrl) {

    // HTML 문서에서 필요한 DOM 객체만 가져와 item으로 가공하는 함수
    var ctrlAddItem = function () {

        //    1. input data를 item에  담기
        var type = document.querySelector('.add__type');
        var select = type.options[type.selectedIndex].text;

        var description = document.querySelector('.add__description').value;

        var value = document.querySelector('.add__value').valueAsNumber;


        //    2. item을 budget controller에 넘기기

        //    3. item을 UI에 추가하기

        //    4. 예산을 계산하기

        //    5. 예산을 UI에 띄우기

        console.log(select + " " + description + " " + value);

    };

    // 이벤트 리스너 1. 체크 버튼을 누를 경우
    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    // 이벤트 리스너 2. enter 키를 누를 경우
    document.addEventListener('keypress', function (event) {

        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });

})(budgetController, UIController);