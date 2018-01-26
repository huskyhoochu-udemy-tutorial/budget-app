/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 예산 컨트롤러
var budgetController = function () {
  function Expense(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  }

  Expense.prototype.calcPercentage = function (totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round(this.value / totalIncome * 100);
    } else {
      this.percentage = -1;
    }
  };

  Expense.prototype.getPercentage = function () {
    return this.percentage;
  };

  function Income(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  }

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  };

  var calculateTotal = function calculateTotal(type) {
    var sum = 0;
    data.allItems[type].forEach(function (cur) {
      sum += cur.value;
    });
    data.totals[type] = sum;
  };

  return {
    addItem: function addItem(type, des, val) {
      var newItem = void 0;
      var ID = void 0;

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
    deleteItem: function deleteItem(type, id) {
      // allItems.type array의 요소마다 콜백 함수를 적용해 새로운 array를 반환한다
      // ids는 allItems.type의 각 요소들의 id 값으로 이루어진 array가 된다
      var ids = data.allItems[type].map(function (current) {
        return current.id;
      });

      // id 값으로 이루어진 array에서 id 값에 해당하는 index를 찾는다
      var index = ids.indexOf(id);

      // 아이템이 존재하기면 하면 작동하도록 함(index는 0부터 시작되는 양의 정수니까)
      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
    },
    calculateBudget: function calculateBudget() {
      //  총 수입 / 지출 계산
      calculateTotal('exp');
      calculateTotal('inc');

      //  총 예산 계산: 수입 - 지출
      data.budget = data.totals.inc - data.totals.exp;

      //  총 수입 대비 지출율 계산
      if (data.totals.inc > 0) {
        data.percentage = Math.round(data.totals.exp / data.totals.inc * 100);
      } else {
        data.percentage = -1;
      }
    },
    calculatePercentages: function calculatePercentages() {
      data.allItems.exp.forEach(function (cur) {
        cur.calcPercentage(data.totals.inc);
      });
    },
    getPercentages: function getPercentages() {
      return data.allItems.exp.map(function (cur) {
        return cur.getPercentage();
      });
    },

    getBudget: function getBudget() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      };
    }
  };
}();

// UI 컨트롤러
var UIController = function () {
  var DOMStrings = {
    expenseContainer: '.expenses__list',
    incomeContainer: '.income__list',
    inputButton: '.add__btn',
    inputDescription: '.add__description',
    inputType: '.add__type',
    inputValue: '.add__value',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
    expensesPercLabel: '.item__percentage',
    dateLabel: '.budget__title--month'
  };

  // 숫자 포맷을 정하는 함수
  var formatNumber = function formatNumber(num, type) {
    var numAbs = Math.abs(num);
    var numFixed = numAbs.toFixed(2);
    var numSplit = numFixed.split('.');
    var int = numSplit[0];
    if (int.length > 3) {
      int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
    }
    var dec = numSplit[1];
    return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
  };

  // 각 노드 요소에 대해 콜백 함수를 적용하기 위한 함수
  var nodeListForEach = function nodeListForEach(list, callback) {
    for (var i = 0; i < list.length; i += 1) {
      callback(list[i], i);
    }
  };

  return {
    // input 값을 DOM 객체로 만드는 함수
    getInput: function getInput() {
      return {
        description: document.querySelector(DOMStrings.inputDescription).value,
        type: document.querySelector(DOMStrings.inputType).value,
        value: document.querySelector(DOMStrings.inputValue).valueAsNumber
      };
    },

    // DOM 객체를 이용해 HTML 아이템을 만들어 리스트에 띄우는 함수
    addListItem: function addListItem(obj, type) {
      var html = void 0;
      var newHtml = void 0;
      var element = void 0;

      // placeholder text를 만든다
      if (type === 'inc') {
        html = '<div class="item clearfix" id="inc-%id%">' + '<div class="item__description">%description%</div>' + '<div class="right clearfix"><div class="item__value">%value%</div>' + '<div class="item__delete">' + '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' + '</div></div></div>';
        element = DOMStrings.incomeContainer;
      } else if (type === 'exp') {
        html = '<div class="item clearfix" id="exp-%id%">' + '<div class="item__description">%description%</div>' + '<div class="right clearfix"><div class="item__value">%value%</div>' + '<div class="item__percentage">21%</div><div class="item__delete">' + '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' + '</div></div></div>';
        element = DOMStrings.expenseContainer;
      }

      // placeholder text를 실제 객체로 바꾼다
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

      // 값을 HTML 위에 띄운다
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    // HTML 아이템을 삭제하는 함수
    deleteListItem: function deleteListItem(selectorID) {
      // 삭제하려는 요소의 부모 요소를 지정한다
      var element = document.getElementById(selectorID);
      // 부모 요소의 자식 요소를 삭제하는데, 그 인자는 부모 요소가 된다
      element.parentNode.removeChild(element);
    },

    // 입력이 끝난 뒤 input fields를 초기화시키는 함수
    clearFields: function clearFields() {
      var fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);

      var fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function (element) {
        var result = element;
        result.value = '';
      });
    },

    // 총 예산 현황을 HTML 요소에 대입해 띄우는 함수
    displayBudget: function displayBudget(obj) {
      var type = void 0;
      if (obj.budget > 0) {
        type = 'inc';
      } else {
        type = 'exp';
      }
      document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
      document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
      document.querySelector(DOMStrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');

      if (obj.percentage > 0) {
        document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
      } else {
        document.querySelector(DOMStrings.percentageLabel).textContent = '---';
      }
    },

    // percentage를 계산해서 화면에 띄우는 함수
    displayPercentages: function displayPercentages(percentages) {
      var fields = document.querySelectorAll(DOMStrings.expensesPercLabel);

      nodeListForEach(fields, function (current, index) {
        var result = current;
        if (percentages[index] > 0) {
          result.textContent = percentages[index] + '%';
        } else {
          result.textContent = '---';
        }
      });
    },

    // 화면 위에 몇 월인지 보여주는 함수
    displayMonth: function displayMonth() {
      var now = new Date();
      var year = now.getFullYear();
      var month = '' + ('0' + (now.getMonth() + 1)).slice(-2);
      document.querySelector(DOMStrings.dateLabel).textContent = year + '-' + month;
    },

    // 수입/지출 타입을 바꾸는 함수
    changedType: function changedType() {
      var fields = document.querySelectorAll(DOMStrings.inputType + ',' + DOMStrings.inputDescription + ',' + DOMStrings.inputValue);

      nodeListForEach(fields, function (cur) {
        cur.classList.add('red-focus');
      });
      document.querySelector(DOMStrings.inputButton).classList.toggle('red');
    },

    // DOMStrings object를 호출하는 함수
    getDOMStrings: function getDOMStrings() {
      return DOMStrings;
    }
  };
}();

// 글로벌 앱 컨트롤러
var controller = function (budgetCtrl, UICtrl) {
  // 총 예산 업데이트 함수
  var updateBudget = function updateBudget() {
    //    1. 예산을 계산하기
    budgetCtrl.calculateBudget();

    //    2. 예산을 리턴하기
    var budget = budgetCtrl.getBudget();

    //    3. 예산을 UI에 띄우기
    UICtrl.displayBudget(budget);
  };

  // 수입 대비 지출 계산 함수
  var updatePercentages = function updatePercentages() {
    //    1. percentage 계산
    budgetCtrl.calculatePercentages();

    //    2. budget controller에서 percentage 읽기
    var percentages = budgetCtrl.getPercentages();

    //    3. UI에 업데이트하기
    UICtrl.displayPercentages(percentages);
  };

  // HTML 문서에서 필요한 DOM 객체만 가져와 item으로 가공하는 함수
  var ctrlAddItem = function ctrlAddItem() {
    //    1. input data를 item에  담기
    var input = UICtrl.getInput();

    // NaN 값이 들어오는 걸 방지하기 위해 조건문 설정
    // description 값이 들어와야 하며, value가 isNaN이어서는 안 되며, value는 0보다 커야 한다
    if (input.description !== '' && !Number.isNaN(input.value) && input.value > 0) {
      //    2. item을 budget controller에 넘기기
      var newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      //    3. item을 UI에 추가하기
      UICtrl.addListItem(newItem, input.type);

      //    4. input 창을 지우기
      UICtrl.clearFields();

      //    5. 예산을 계산하고 업데이트하기
      updateBudget();

      //    6. percentage 계산하고 업데이트하기
      updatePercentages();
    }
  };

  // DOM 객체를 삭제하는 함수
  var ctrlDeleteItem = function ctrlDeleteItem(event) {
    var itemID = event.target.parentNode.parentNode.parentNode.id;
    if (itemID) {
      var splitID = itemID.split('-');
      var type = splitID[0];
      var ID = parseInt(splitID[1], 10); // 10진수 정수로 변환

      //  1. item을 자료구조에서 삭제
      budgetCtrl.deleteItem(type, ID);

      //  2. item을 UI에서 삭제
      UICtrl.deleteListItem(itemID);

      //  3. 예산을 업데이트하고 새로운 예산을 보여줌
    }
  };

  // 이벤트 리스너 함수
  var setupEventListeners = function setupEventListeners() {
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

    // 이벤트 리스너 3. delete 버튼을 누를 경우
    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

    // 이벤트 리스너 4. 드롭다운 버튼을 선택했을 경우
    document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
  };

  return {
    init: function init() {
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      UICtrl.displayMonth();
      setupEventListeners();
    }
  };
}(budgetController, UIController);

// 컨트롤러 함수를 초기화
controller.init();

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map