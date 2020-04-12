'use strict';


$(document).ready(function () {

    $("#addBtn").prop('disabled', true);
    $("#addBtn").on('click', addElement);
    $("#itemToAdd").on("change keyup paste", disableAddBtn);

    let shoppingList = new MyList();
    let removedList = new MyList();
    

    /**
     * Añade elemento
     * @param {*} e 
     */
    function addElement(e) {
        let text = $('#itemToAdd').val();
        shoppingList.addItem(text);

        // Refrescará la lista de "Necesito", se especifica que no es un movimiento entre listas y se pasa el texto a añadir
        refresh('#shoppingList', false, text);   

        $('#itemToAdd').val('');

        // Desahabilitamos el botón de añadir de nuevo
        $("#addBtn").prop('disabled', true);
    }

    /**
     * Función que desabilita el botón de añadir dependiendo de si hay valor escrito en el input de elemento a añadir.
     */
    function disableAddBtn() {
        if($('#itemToAdd').val()){
            $("#addBtn").prop('disabled', false);
        }else{
            $("#addBtn").prop('disabled', true);
        }
    }

    /**
     * Se elimina elemento de la lista "Necesito" 
     * y se pasa a la lista "Comprado"
     */
    function removeElement() {
        shoppingList.removeItem(event.target.parentNode.id);
        let textValue = event.target.parentNode.childNodes[0].textContent;
        removedList.addItem(textValue);

        // Actualizamos lista, esta vez si es un movimiento de elementos entre listas y pasamos elemento a mover (De Necesito a Comprado)
        refresh('#shoppingList', true, this);  
        
    }

    /**
     * Se pasa elemento de "Comprado" a "Necesito"
     */
    function restoreElement() {
        removedList.removeItem(event.target.parentNode.id);
        let textValue = event.target.parentNode.childNodes[0].textContent;
        shoppingList.addItem(textValue);

        // Actualizamos lista, esta vez si es un movimiento de elementos entre listas y pasamos elemento a mover (De Comprado a Necesito)
        refresh('#removedList', true, this); 
        
    }


    /**
     * Función que actualiza las listas añadirendo un nuevo elemento o realizando movimientos entre la lista Necesito y Comprado
     * 
     * @param {String} listName ID de la lista a la que añadir elemento o origen de movimiento
     * @param {Boolean} move Si se trata de un movimiento de elementos entre listas
     * @param {*} elemento Elemento a añadir o mover de lista
     */
    function refresh(listName, move, elemento) {
        let htmlList = listName == "#shoppingList" ?
            $('#shoppingList') : $('#removedList');

        let dataList = listName == "#shoppingList" ?
            shoppingList : removedList;

        if(move!== true){   // Si no es un intercambio entre listas, entonces es crear elemento
            var index =0;
            let item = $('<li>', {
                'id': index++,
                'text': elemento,
                'class': 'list-group-item list-group-item-success'
            });
            item.on('click',  removeElement);       // Evento de click en el propio elemento li
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