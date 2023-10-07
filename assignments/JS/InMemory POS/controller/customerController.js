var btnSave = $("#btnSave");
var btnRemove = $("#btnRemove");
var btnGetAll = $("#btnGetAll");
var btnUpdate = $("#btnUpdate");

getAll();


$("#customerIdText, #customerNameText, #customerAddressText #customerSalaryText").keydown(function (e){
    if(e.key == "Tab"){
        e.preventDefault();
    }
});


$("#customerIdText").keyup(function (e){
    if(regexId.test($("#customerIdText").val())){
        $("#customerIdText").css("border-color",  "transparent");
    }else{
        $("#customerIdText").css("border-color",  "red");
    }
});


$("#customerIdText").keydown(function (e){
    if(e.keyCode == 13 && regexId.test($("#customerIdText").val())) {
        $("#customerNameText").focus();
    }
});



$("#customerNameText").keyup(function (e){
    if(regexName.test($("#customerNameText").val())){
        $("#customerNameText").css("border-color",  "transparent");
    }else{
        $("#customerNameText").css("border-color",  "red");
    }
});

$("#customerNameText").keydown(function (e){
    if(e.keyCode == 13 && regexName.test($("#customerNameText").val())){
        $("#customerTelText").focus();
    }
});

$("#customerAddressText").keyup(function (e){
    if(regexAddress.test($("#customerAddressText").val())){
        $("#customerAddressText").css("border-color",  "transparent");
    }else{
        $("#customerAddressText").css("border-color",  "red");
    }
});

$("#customerAddressText").keydown(function (e){
    if(e.keyCode == 13 && regexAddress.test($("#customerAddressText").val())){
        save();
    }
});




$("#customerSalaryText").keyup(function (e){
    if(regexSalary.test($("#customerSalaryText").val())){
        $("#customerSalaryText").css("border-color",  "transparent");
    }else{
        $("#customerSalaryText").css("border-color",  "red");
    }
});

$("#customerSalaryText").keydown(function (e){
    if(e.keyCode == 13 && regexSalary.test($("#customerSalaryText").val())){
        $("#customerSalaryText").focus();
    }
});








function save(){

    if(regexId.test($("#customerIdText").val()) && regexName.test($("#customerNameText").val()) && regexAddress.test($("#customerAddress").val()) && regexSalary.test($("#customerSalaryText").val())){
        var is = false;

        for(let i = 0; i < detailsBig.length; i++){
            if(detailsBig[i].cid == $("#customerIdText").val()){
                is = true;
            }
        }

        if(is == false){

            var tblBody = $("#tblBody");

            var id = $("#customerIdText").val();
            var name = $("#customerNameText").val();
            var address = $("#customerAddressText").val();
            var salary = $("#customerSalaryText").val();

            customer = {
                cid : id,
                cname : name,
                caddress : address,
                csalary : salary
            }

            detailsBig.push(customer);

            let tr=$('<tr> <td>'+detailsBig[detailsBig.length-1].cid+'</td> <td>'+detailsBig[detailsBig.length-1].cname+'</td> <td>'+detailsBig[detailsBig.length-1].caddress+'</td> <td>'+detailsBig[detailsBig.length-1].csalary+'</td></tr>');
            $("#tblBody").append(tr);

        }else{
            alert("Customer ID Already Used")
        }
    }


    $("#tblBody>tr").click(function (e){

        $("#customerIdText").val($(this).children().eq(0).text());
        $("#customerNameText").val($(this).children().eq(1).text());
        $("#customerAddress").val($(this).children().eq(2).text());
        $("#customerSalaryText").val($(this).children().eq(3).text());

    });

}


btnSave.click(function(){

    save();
    clearFields();
    getAll();

});



function getAll(){

    $('#tblBody').empty();

    for(var i = 0; i < detailsBig.length; i++){

        var id = detailsBig[i].cid;
        var name = detailsBig[i].cname;
        var address = detailsBig[i].caddress;
        var salary = detailsBig[i].csalary;

        let row = `<tr><td>${id}</td><td>${name}</td><td>${address}</td><td>${salary}</td></tr>`

        $('#tblBody').append(row);

    }
}


btnGetAll.click(function (){

    getAll();

});



btnRemove.click(function(event){

    var id = $("#customerIdText").val();

    for(var i = 0; i < detailsBig.length; i++){

        if(detailsBig[i].cid == id){
            detailsBig.splice(i, 1);
            console.log(detailsBig.length);
            getAll();
            clearFields();
            break;
        }

    }

});


btnUpdate.click(function(){

    var id = $("#customerIdText").val();
    var name = $("#customerNameText").val();
    var salary = $("#customerSalaryText").val();
    var address = $("#customerAddressText").val();

    for(var i = 0; i < detailsBig.length; i++){

        if(detailsBig[i].cid == id){

            detailsBig[i].cid = id;
            detailsBig[i].cname = name;
            detailsBig[i].caddress = address;
            detailsBig[i].csalary = salary;


            getAll();
            clearFields();

            break;

        }

        if(i == detailsBig.length - 1){
            alert("No")
        }

    }

    getAll();

});


function clearFields(){
    $("#customerIdText").val("");
    $("#customerNameText").val("");
    $("#customerAddressText").val("");
    $("#customerSalaryText").val("");

    $("#customerIdText").focus();
}
