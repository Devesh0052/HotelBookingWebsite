function validatedate() {


    let checkInValue = document.getElementById("checkIn").value;
    console.log(checkInValue);
    let CheckOutvalue = document.getElementById("checkOut").value;
    console.log(CheckOutvalue);

    if (CheckOutvalue < checkInValue) {
        console.log("invalid");
        document.getElementById("validate").innerHTML = "Checkout date should be greater than checkin";
    } else {
        let xhr;
        let dynamicroom = document.getElementById("dynamicroom");

        let checkInValue = document.getElementById("checkIn").value;
        console.log(checkInValue);
        let checkOutValue = document.getElementById("checkOut").value;
        console.log(checkOutValue);
        // let checkIn=document.getElementById("checkIn").value;
        xhr = new XMLHttpRequest();
        xhr.open("POST", '/search-vacant/');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send("check_in=" + checkInValue + "&check_out=" + checkOutValue);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let options = xhr.responseText;

                console.log(options);
                if (options.length <= 2) {
                    document.getElementById("error").innerHTML += "No room available";

                } else {
                    for (option of options) {
                        if (isNaN(option) === false) {
                            let dynamicoption = document.createElement("option");
                            dynamicoption.setAttribute("value", option);
                            dynamicoption.innerHTML = option;
                            dynamicroom.appendChild(dynamicoption);
                        }
                    }
                }

            }
        }
    }


}
function submitForm() {
    return false;
}
function Checkout() {
    var book_id = document.getElementById("book_id").value;
    if(book_id == undefined || book_id == ''){
      alert("Please enter booking id");
    }
    else{
    var req = new XMLHttpRequest();
    req.open('post', '/checkout');
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    req.send('book_id='+book_id);
    console.log(book_id);
    req.onreadystatechange = function () {
        if (req.status == 200 && req.readyState == 4) {
            alert(req.responseText);
            book_id.value = "";
        }
    }
}}

function Cancel() {
    var book_id = document.getElementById("book_id").value;
    if(book_id == undefined || book_id == ''){
      alert("Please enter booking id");
    }
    else{
    var req = new XMLHttpRequest();
    req.open('post', '/cancel');
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    req.send('book_id='+book_id);
    console.log(book_id);
    req.onreadystatechange = function () {
        if (req.status == 200 && req.readyState == 4) {
            alert(req.responseText);
            book_id.value = "";
        }
    }}
}



