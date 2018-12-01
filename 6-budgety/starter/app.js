var budgetController = (function(){

    var Expense = function(id,description,value){

        this.id = id;

        this.description = description;

        this.value = value;

       

    };

   

    var Income = function(id,description,value){

        this.id = id;

        this.description = description;

        this.value = value;

    };

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

        testing: function(){

            console.log(allItems);

        }

    };

   

    return{

        addItem: function(type,des,val){

            var newItem,ID;

           

           

            if(type === 'exp'){

                newItem = new Expense(ID,des,val);

            }

            else if (type === 'inc'){

                newItem = new Income(ID,des,val);

            }

           

            if(data.allItems[type].length > 0){

                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;

            }

            else{

                ID = 0;

            }

           

            data.allItems[type].push(newItem);

            return newItem;

        }

    }

   

   

})();

var UIController = (function(){

    var DOMstrings = {

        inputType: '.add__type',

        inputDescription: '.add__description',

        inputValue: '.add__value',

        inputBtn: '.add__btn'

       

    };

    return {

        getInput: function(){

            return{

                type: document.querySelector(DOMstrings.inputType).value,

                description: document.querySelector(DOMstrings.inputDescription).value,

                value: document.querySelector(DOMstrings.inputValue).value

            };

        },

        getDOMstrings: function(){

            return DOMstrings;

        }

    };

   

})();



var controller = (function(budgetCntrl,UICntrl){

   

       

    var cntrlAddItem = function(){

        var inputt, newItem2;

        inputt = UICntrl.getInput();

       

        newItem2 = budgetCntrl.addItem(inputt.type,inputt.description,inputt.value);

   

    }

   



    var setupEventListeners = function() {

        var DOM = UICntrl.getDOMstrings();

       

        document.querySelector(DOM.inputBtn).addEventListener('click',cntrlAddItem);

        document.addEventListener('keypress', function(event){

        if(event.keyCode === 13 || event.which === 13)

            cntrlAddItem();

    });   

       

    }

    return{

        init: function(){

            console.log('App has started.');

            setupEventListeners();

        }

    }

   

   

})(budgetController,UIController);