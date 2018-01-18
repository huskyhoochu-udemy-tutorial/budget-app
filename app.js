// 예산 컨트롤러
var budgetController = (function () {


})();

// UI 컨트롤러
var UIController = (function () {

    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn'
    };

    return {
        getInput: function () {

            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).valueAsNumber
            };
        },
        
        getDOMStrings: function () {
            return DOMStrings;
        }
    };

})();

// 글로벌 앱 컨트롤러
var controller = (function (budgetCtrl, UICtrl) {

    // UIController에 정의해 둔 CSS 선택자를 꺼낸다
    var DOM = UICtrl.getDOMStrings();

    // HTML 문서에서 필요한 DOM 객체만 가져와 item으로 가공하는 함수
    var ctrlAddItem = function () {

        //    1. input data를 item에  담기
        var input = UICtrl.getInput();
        console.log(input);

        //    2. item을 budget controller에 넘기기

        //    3. item을 UI에 추가하기

        //    4. 예산을 계산하기

        //    5. 예산을 UI에 띄우기


    };

    // 이벤트 리스너 1. 체크 버튼을 누를 경우
    document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

    // 이벤트 리스너 2. enter 키를 누를 경우
    document.addEventListener('keypress', function (event) {

        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });

})(budgetController, UIController);