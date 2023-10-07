function allOrders(){
    $('#tblBodyAllOrders').empty();

    for(var i = 0; i < orderDetails.length; i++){

        var itemCode = orderDetails[i].orderId;
        var itemName = orderDetails[i].customerId;
        var unitePrice = orderDetails[i].total;
        var date = itemDetailsBig[i].date;

        let row = `<tr><td>${itemCode}</td><td>${itemName}</td><td>${unitePrice }</td><td>${date}</td></tr>`

        $('#tblBodyAllOrders').append(row);

    }
}