var btnSaveItem = $("#btnSaveItem");
var btnUpdateItem = $("#btnUpdateItem");
var btnRemoveItem = $("#btnRemoveItem");
var btnGetAllItem = $("#btnGetAllItem");

itemGetAll();

$("#itemCodeTxt, #itemNameTxt, #unitePriceTxt, #itemQtyTxt").keydown(function (e){
    if(e.key == "Tab"){
        e.preventDefault();
    }
});



$("#itemCodeTxt").keyup(function (e){
    if(regexItemCode.test($("#itemCodeTxt").val())){
        $("#itemCodeTxt").css("border-color",  "transparent");
    }else{
        $("#itemCodeTxt").css("border-color",  "red");
    }
});


$("#itemCodeTxt").keydown(function (e){
    if(e.keyCode == 13 && regexItemCode.test($("#itemCodeTxt").val())) {
        $("#itemNameTxt").focus();
    }
});



$("#itemNameTxt").keyup(function (e){
    if(regexItemName.test($("#itemNameTxt").val())){
        $("#itemNameTxt").css("border-color",  "transparent");
    }else{
        $("#itemNameTxt").css("border-color",  "red");
    }
});

$("#itemNameTxt").keydown(function (e){
    if(e.keyCode == 13 && regexItemName.test($("#itemNameTxt").val())){
        $("#unitePriceTxt").focus();
    }
});




$("#unitePriceTxt").keyup(function (e){
    if(regexItemUnitePrice.test($("#unitePriceTxt").val())){
        $("#unitePriceTxt").css("border-color",  "transparent");
    }else{
        $("#unitePriceTxt").css("border-color",  "red");
    }
});

$("#unitePriceTxt").keydown(function (e){
    if(e.keyCode == 13 && regexItemUnitePrice.test($("#unitePriceTxt").val())){
        $("#itemQtyTxt").focus();
    }
});




$("#itemQtyTxt").keyup(function (e){
    if(regexItemQty.test($("#itemQtyTxt").val())){
        $("#itemQtyTxt").css("border-color",  "transparent");
    }else{
        $("#itemQtyTxt").css("border-color",  "red");
    }
});

$("#itemQtyTxt").keydown(function (e){
    if(e.keyCode == 13 && regexItemQty.test($("#itemQtyTxt").val())){
        itemSave();
    }
});




function itemSave(){

    if(regexItemCode.test($("#itemCodeTxt").val()) && regexItemName.test($("#itemNameTxt").val()) && regexItemUnitePrice.test($("#unitePriceTxt").val()) && regexItemQty.test($("#itemQtyTxt").val())){
        var is = false;

        for(let i = 0; i < itemDetailsBig.length; i++){
            if(itemDetailsBig[i].itemCode == $("#itemCodeTxt").val()){
                is = true;
            }
        }

        if(is == false){

            var tblBody = $("#itemTblBody");

            var itemCode = $("#itemCodeTxt").val();
            var itemName = $("#itemNameTxt").val();
            var unitePrice = $("#unitePriceTxt").val();
            var qty = $("#itemQtyTxt").val();

            item = {
                itemCode : itemCode,
                itemName : itemName,
                unitePrice : unitePrice,
                qty : qty
            }

            itemDetailsBig.push(item);

            let tr=$('<tr> <td>'+itemDetailsBig[itemDetailsBig.length-1].itemCode+'</td> <td>'+itemDetailsBig[itemDetailsBig.length-1].itemName+'</td> <td>'+itemDetailsBig[itemDetailsBig.length-1].unitePrice+'</td> <td>'+itemDetailsBig[itemDetailsBig.length-1].qty+'</td></tr>');
            $("#itemTblBody").append(tr);

            itemClearFields();

        }else{
            alert("Item Code Already Used")
        }
    }


    $("#itemTblBody>tr").click(function (e){

        $("#itemCodeTxt").val($(this).children().eq(0).text());
        $("#itemNameTxt").val($(this).children().eq(1).text());
        $("#unitePriceTxt").val($(this).children().eq(2).text());
        $("#itemQtyTxt").val($(this).children().eq(3).text());

    });

}


btnSaveItem.click(function(){

    itemSave();
    itemClearFields();
    itemGetAll();

});


function itemGetAll(){

    $('#itemTblBody').empty();

    for(var i = 0; i < itemDetailsBig.length; i++){

        var itemCode = itemDetailsBig[i].itemCode;
        var itemName = itemDetailsBig[i].itemName;
        var unitePrice = itemDetailsBig[i].unitePrice;
        var qty = itemDetailsBig[i].qty;

        let row = `<tr><td>${itemCode}</td><td>${itemName}</td><td>${unitePrice }</td><td>${qty}</td></tr>`

        $('#itemTblBody').append(row);

    }
    ItembindEvents();

}


btnGetAllItem.click(function (){

    itemGetAll();

});


btnRemoveItem.click(function(event){

    var itemCode = $("#itemCodeTxt").val();

    for(var i = 0; i < itemDetailsBig.length; i++){

        if(itemDetailsBig[i].itemCode == itemCode){
            itemDetailsBig.splice(i, 1);
            itemGetAll();
            itemClearFields();
            break;
        }

    }

});



btnUpdateItem.click(function(){

    var itemCode = $("#itemCodeTxt").val();
    var itemName = $("#itemNameTxt").val();
    var unitePrice = $("#unitePriceTxt").val();
    var qty = $("#itemQtyTxt").val();

    for(var i = 0; i < itemDetailsBig.length; i++){

        if(itemDetailsBig[i].itemCode == itemCode){

            itemDetailsBig[i].itemCode = itemCode;
            itemDetailsBig[i].itemName = itemName;
            itemDetailsBig[i].unitePrice = unitePrice;
            itemDetailsBig[i].qty = qty;

            itemGetAll();
            itemClearFields();

            break;

        }

        if(i == itemDetailsBig.length - 1){
            alert("No")
        }

    }

    itemGetAll();

});


function itemClearFields(){
    $("#itemCodeTxt").val("");
    $("#itemNameTxt").val("");
    $("#unitePriceTxt").val("");
    $("#itemQtyTxt").val("");

    $("#itemCodeTxt").focus();
}


ItembindEvents();


function ItembindEvents(){
    $('#itemTblBody>tr').click(function () {
        // console.log(this);//tr -> this will return tr html element
        // console.log($(this));//jquery ob //if we want to access jQuery method we have to convert it to a jquery object
        // console.log($(this).text()); // now here it will return all the text of tr

        let itemCode = $(this).children(':nth-child(1)').text();
        let itemName = $(this).children(':nth-child(2)').text();
        let unitePrice = $(this).children(':nth-child(3)').text();
        let qty = $(this).children(':nth-child(4)').text();

        setItemTextFieldValues(itemCode,itemName,unitePrice,qty);
    });
}
//check this out.?


function setItemTextFieldValues(itemCode, itemName, unitePrice, qty) {
    $("#itemCodeTxt").val(itemCode);
    $("#itemNameTxt").val(itemName);
    $("#unitePriceTxt").val(unitePrice);
    $("#itemQtyTxt").val(qty);
}
