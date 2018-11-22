
// All of these IIFEs are the module pattern i.e. immediately invoked on page load
// and expose properties and functions that need to be publicly available once the form
// has been loaded. By returning objects, they make their contents public - their inner contents
// remain private.
// So don't get confused with the outer functions - just think of them like a wrapper

var budgetController = function () {
    var Expense = function (id, value, description) {
        this.id = id;
        this.value = value;
        this.description = description;
    };
    var Income = function (id, value, description) {
        this.id = id;
        this.value = value;
        this.description = description;
    };

    var nextId = function () {
        data.lastId++;
        return data.lastId;
    };
    
    var data = {
        allItems: {
            expense: [],
            income: []
        },
        totals: {
            expense: 0,
            income: 0
        },
        lastId: 0,
        budget: 0
    };

    return {
        addItem: function (type, desc, val) {
            var newItem;

            if (type === 'expense') {
                newItem = new Expense(nextId(), val, desc);
            }

            else {
                newItem = new Income(nextId(), val, desc);
            }
            data.allItems[type].push(newItem);
            data.totals[type] += parseFloat(val);
            return newItem;
        },
        print: function () {
            console.log(data);
        },
        calcBudget: function(){
            data.budget = data.budget.income + data.totals.expense;
            return data.budget;
        }
    }

}();

//UI CONTROLLER
var UIController = function () {
    var DOMStrgs = {
        incExp: '.add__type',
        desc: '.add__description',
        amount: '.add__value',
        addBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budget: '.budget__value'
    };
    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMStrgs.incExp).value,
                description: document.querySelector(DOMStrgs.desc).value,
                value: document.querySelector(DOMStrgs.amount).value
            }
        },
        DOMStrgs,
        addListItem: function (item, type) {
            var html, newHtml, element;
            // Create HTML string with placeholder text
            
            if (type === 'income') {
                element = DOMStrgs.incomeContainer;

                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else {
                element = DOMStrgs.expensesContainer;

                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', item.id);
            newHtml = newHtml.replace('%description%', item.description);
            newHtml = newHtml.replace('%value%', item.value);

            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        showBudget: function(budg){

        }
    }
}();

//APP CONTROLLER
// This controls communication between the budgetController and the UI Controller
// as these are used when the module is immediately executed on page load
var controller = function (budgCtrl, UICtrl) {

    var setupEventListeners = function () {
        var DOMStrgs = UICtrl.DOMStrgs;
        document.querySelector(DOMStrgs.addBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function (event) {
            //'which' is for older browsers that don't have keyCode
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        })
    };

    var ctrlAddItem = function () {
        console.log('Add');
        var input, newItem, budget;
        //1.  Get the field input data
        input = UICtrl.getInput();
        //2.  Add the item to the budget controller
        newItem = budgCtrl.addItem(input.type, input.description, input.value);
        //3.  Add the item to the UI
        UICtrl.addListItem(newItem, input.type);
        //4.  Calculate the budget
        budget = budgCtrl.calcBudget();
        //5.  Display the budget on the UI
        document.querySelector(DOMStrgs.budget).value = budget;
    }
    return {
        init: function () {
            console.log('App has started');
            setupEventListeners();
        }
    }
}(budgetController, UIController);

//INITIALISE THE APP
controller.init();