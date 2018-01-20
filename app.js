// 예산 컨트롤러
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var allExpenses = [];
    var allIncomes = [];
    var totalExpenses = 0;

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function (type, des, val) {
            var newItem, ID;

            // 아이디는 배열 마지막 아이템의 아이디 +1 이다
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // 수입 지출을 구분하는 조건문
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }


            data.allItems[type].push(newItem);
            return newItem;
        },

        testing: function () {
            console.log(data);
        }
    };

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

    // 이벤트 리스너 함수
    var setupEventListeners = function () {
        // UIController에 정의해 둔 CSS 선택자를 꺼낸다
        var DOM = UICtrl.getDOMStrings();
        // 이벤트 리스너 1. 체크 버튼을 누를 경우
        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

        // 이벤트 리스너 2. enter 키를 누를 경우
        document.addEventListener('keypress', function (event) {

            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };

    // HTML 문서에서 필요한 DOM 객체만 가져와 item으로 가공하는 함수
    var ctrlAddItem = function () {
        var input, newItem;

        //    1. input data를 item에  담기
        input = UICtrl.getInput();
        console.log(input);

        //    2. item을 budget controller에 넘기기
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        console.log(newItem);

        //    3. item을 UI에 추가하기

        //    4. 예산을 계산하기

        //    5. 예산을 UI에 띄우기


    };

    return {
        init: function () {
            console.log('app has started.');
            setupEventListeners();
        }
    }

})(budgetController, UIController);

// 컨트롤러 함수를 초기화
controller.init();