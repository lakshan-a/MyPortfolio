$('#customerIdTxtOrderPage').val(detailsBig[0].cid);
$('#customerNameTxtOrderPage').val(detailsBig[0].cname);
$('#customerAddressTxtOrderPage').val(detailsBig[0].caddress);
$('#customerSalaryTxtOrderPage').val(detailsBig[0].csalary);
$('#itemCodeTxtOrderPage').val(itemDetailsBig[0].itemCode);
$('#itemNameTxtOrderPage').val(itemDetailsBig[0].itemName);
$('#unitePriceTxtOrderPage').val(itemDetailsBig[0].unitePrice);
$('#itemQtyTxtOrderPage').val(itemDetailsBig[0].qty);

let totalFinal = 0;


function loadCusIds() {
    var optionCus = '';
    for (var i = 0; i < detailsBig.length; i++) {
        optionCus += '<option value="' + detailsBig[i].cid + '">' + detailsBig[i].cid + '</option>';
    }
    $('#customerIdOrder').append(optionCus);
}

function loadItemIds() {
    var optionItem = '';
    for (var i = 0; i < itemDetailsBig.length; i++) {
        optionItem += '<option value="' + itemDetailsBig[i].itemCode + '">' + itemDetailsBig[i].itemCode + '</option>';
    }
    $('#itemOrder').append(optionItem);
}

function generateOrderId(){
    if(orderDetails.length == 0){
        $('#orderIDTxtOrderPage').val(1);
    }else{
        $('#orderIDTxtOrderPage').val(orderDetails.length + 2);
    }
}

$('#customerIdOrder').change(function(){

    for (let i=0; i < detailsBig.length; i++){
        if ($(this).val() == detailsBig[i].cid){
            $('#customerIdTxtOrderPage').val(detailsBig[i].cid);
            $('#customerNameTxtOrderPage').val(detailsBig[i].cname);
            $('#customerAddressTxtOrderPage').val(detailsBig[i].caddress);
            $('#customerSalaryTxtOrderPage').val(detailsBig[i].csalary);
            break;
        }
    }
});

$('#itemOrder').change(function(){

    for (let i=0; i < itemDetailsBig.length; i++){
        if ($(this).val() == itemDetailsBig[i].itemCode){
            $('#itemCodeTxtOrderPage').val(itemDetailsBig[i].itemCode);
            $('#itemNameTxtOrderPage').val(itemDetailsBig[i].itemName);
            $('#unitePriceTxtOrderPage').val(itemDetailsBig[i].unitePrice);
            $('#itemQtyTxtOrderPage').val(itemDetailsBig[i].qty);
            break;
        }
    }
});

$('#btnAddItemOrder').click(function (){
    var code = $('#itemOrder').val();
    var name = $('#itemNameTxtOrderPage').val();
    var qty = $('#itemOrderQtyOrderTxtOrderPage').val();
    var total = parseInt($('#itemOrderQtyOrderTxtOrderPage').val()) * parseInt($('#unitePriceTxtOrderPage').val());


    let tr=$('<tr> <td>'+code+'</td> <td>'+name+'</td> <td>'+qty+'</td> <td>'+total+'</td></tr>');
    $("#tblItemBodyOrderPage").append(tr);

    totalFinal = totalFinal + total;

    $('#orderTotal').text(totalFinal);

    for(let i = 0; i < itemDetailsBig.length; i++){
        if(itemDetailsBig[i].itemCode == code){
            itemDetailsBig[i].qty = parseInt(itemDetailsBig[i].qty) - parseInt(qty);
            $('#itemQtyTxtOrderPage').val(itemDetailsBig[i].qty);
            break;
        }
    }

    $('#itemOrderQtyOrderTxtOrderPage').val("");

});

$("#discountTxtOrderPage").keydown(function (e){
    if(e.keyCode == 13) {
        $('#orderSubTotal').text(totalFinal - parseInt($("#discountTxtOrderPage").val()));
    }
});


$("#cashTxtOrderPage").keydown(function (e){
    if(e.keyCode == 13) {
        $('#balanceTxtOrderPage').val(parseInt($("#cashTxtOrderPage").val()) - parseInt($('#orderSubTotal').text()));
    }
});



$('#btnPlaceOrder').click(function (){

    let totl =parseFloat( $('#orderTotal').text());
    let cash =parseFloat( $('#cashTxtOrderPage').val());
    console.log(totl,cash);
    let result = cash-totl;
    console.log(result);
    $('#balanceTxtOrderPage').val(result);

    var orderId = $('#orderIDTxtOrderPage').val();
    var customerId = $('#customerIdOrder').val();
    var total = $('#orderSubTotal').text();
    var date = $('#dateTxtOrderPage').val();

    totl = 0;


    order = {
        orderId : orderId,
        customerId : customerId,
        total : total,
        date : date
    }

    orderDetails.push(order);

    $('#tblItemBodyOrderPage tr').remove();

    /* $('#orderTotal').text("0");
     $('#orderSubTotal').text("0");
     $('#cashTxtOrderPage').val("");
     $('#discountTxtOrderPage').val("");
     $('#balanceTxtOrderPage').val("");*/



});



