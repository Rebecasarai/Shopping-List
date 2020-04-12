'use strict';

var lastShoppingList, lastRemovedList;
var index =0;


$(document).ready(function () {

    $("#addBtn").prop('disabled', true);
    $("#addBtn").on('click', addElement);
    $("#itemToAdd").on("change keyup paste", disableAddBtn);

    let shoppingList = new MyList();
    let removedList = new MyList();
    lastShoppingList=[...shoppingList.items];
    

    function addElement(e) {
        let text = $('#itemToAdd').val();
        shoppingList.addItem(text);

        refresh('#shoppingList', false, text);
        $('#itemToAdd').val('');
        $("#addBtn").prop('disabled', true);
    }

    function disableAddBtn(e) {
        if($('#itemToAdd').val()){
            $("#addBtn").prop('disabled', false);
        }else{
            $("#addBtn").prop('disabled', true);
        }
    }

    function removeElement() {
        shoppingList.removeItem(event.target.parentNode.id);
        let textValue = event.target.parentNode.childNodes[0].textContent;
        removedList.addItem(textValue);
        refresh('#shoppingList', true, this); 
        
        
    }

    function restoreElement() {
        removedList.removeItem(event.target.parentNode.id);
        let textValue = event.target.parentNode.childNodes[0].textContent;
        shoppingList.addItem(textValue);

        refresh('#removedList', true, this); 
        
    }

    function refresh(listName, move, elemento) {
        let htmlList = listName == "#shoppingList" ?
            $('#shoppingList') : $('#removedList');

        let dataList = listName == "#shoppingList" ?
            shoppingList : removedList;
        
        console.log(elemento);
        console.log(move);

        if(move!== true){
            let item = $('<li>', {
                'id': index++,
                'text': elemento,
                'class': 'list-group-item list-group-item-success'
            });
            item.on('click',  removeElement);
            htmlList.append(item);
        }else{

            if(dataList ==shoppingList){
                $(elemento).on('click', restoreElement);
                $(elemento).attr("class","list-group-item list-group-item-secondary");
                $(elemento).appendTo('#removedList'); 

                
            }else{

                $(elemento).on('click', removeElement);
                $(elemento).attr("class","list-group-item list-group-item-success");
                $(elemento).appendTo('#shoppingList'); 
            }
            
        }

        


    }
});