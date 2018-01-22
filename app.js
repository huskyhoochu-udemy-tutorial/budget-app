// 예산 컨트롤러
const budgetController = (() => {
  function Expense(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  }

  function Income(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  }

  const allExpenses = [];
  const allIncomes = [];
  const totalExpenses = 0;

  const data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0,
    },
  };

  return {
    addItem: (type, des, val) => {
      let newItem;
      let ID;

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
  };
})();

// UI 컨트롤러
const UIController = (() => {
  const DOMStrings = {
    expenseContainer: '.expenses__list',
    incomeContainer: '.income__list',
    inputButton: '.add__btn',
    inputDescription: '.add__description',
    inputType: '.add__type',
    inputValue: '.add__value',
  };

  return {
    getInput: () => ({
      description: document.querySelector(DOMStrings.inputDescription).value,
      type: document.querySelector(DOMStrings.inputType).value,
      value: document.querySelector(DOMStrings.inputValue).valueAsNumber,
    }),

    addListItem: (obj, type) => {
      let html;
      let newHtml;
      let element;

      // placeholder text를 만든다
      if (type === 'inc') {
        html = '<div class="item clearfix" id="income-%id%">' +
          '<div class="item__description">%description%</div>' +
          '<div class="right clearfix"><div class="item__value">%value%</div>' +
          '<div class="item__delete">' +
          '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
          '</div></div></div>';
        element = DOMStrings.incomeContainer;
      } else if (type === 'exp') {
        html = '<div class="item clearfix" id="expense-%id%">' +
          '<div class="item__description">%description%</div>' +
          '<div class="right clearfix"><div class="item__value">%value%</div>' +
          '<div class="item__percentage">21%</div><div class="item__delete">' +
          '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
          '</div></div></div>';
        element = DOMStrings.expenseContainer;
      }

      // placeholder text를 실제 객체로 바꾼다
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      // 값을 HTML 위에 띄운다
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    clearFields: () => {
      const fields = document.querySelectorAll(`${DOMStrings.inputDescription}, ${DOMStrings.inputValue}`);

      const fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach((element) => {
        element.value = '';
      });
    },

    getDOMStrings: () => DOMStrings,
  };
})();

// 글로벌 앱 컨트롤러
const controller = ((budgetCtrl, UICtrl) => {
  // 총 예산 업데이트 함수
  const updateBudget = () => {
    //    1. 예산을 계산하기

    //    2. 예산을 리턴하기

    //    3. 예산을 UI에 띄우기

  };

  // HTML 문서에서 필요한 DOM 객체만 가져와 item으로 가공하는 함수
  const ctrlAddItem = () => {
    //    1. input data를 item에  담기
    const input = UICtrl.getInput();

    // NaN 값이 들어오는 걸 방지하기 위해 조건문 설정
    // description 값이 들어와야 하며, value가 isNaN이어서는 안 되며, value는 0보다 커야 한다
    if (input.description !== '' && !Number.isNaN(input.value) && input.value > 0) {
      //    2. item을 budget controller에 넘기기
      const newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      //    3. item을 UI에 추가하기
      UICtrl.addListItem(newItem, input.type);

      //    4. input 창을 지우기
      UICtrl.clearFields();

      //    5. 예산을 계산하고 업데이트하기
      updateBudget();
    }
  };

  // 이벤트 리스너 함수
  const setupEventListeners = () => {
    // UIController에 정의해 둔 CSS 선택자를 꺼낸다
    const DOM = UICtrl.getDOMStrings();

    // 이벤트 리스너 1. 체크 버튼을 누를 경우
    document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

    // 이벤트 리스너 2. enter 키를 누를 경우
    document.addEventListener('keypress', (event) => {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  return {
    init() {
      setupEventListeners();
    },
  };
})(budgetController, UIController);

// 컨트롤러 함수를 초기화
controller.init();
