const connection = require("./config/db");


//index page
let index = (req, res) => {
    res.render('index');
}

//booking form
let form = (req, res) => {
    res.render('form');
}

//checkout cancel page

let checkcancel=(req,res)=>{
    res.render('checkcancel');
}
// for finding empty rooms according to checkin and checkout dates
let emptyroom = (req, res) => {
    let room = [
        1,
        2,
        3,
        4,
        5
    ];
    let check_in = req.body.check_in;
    console.log(check_in);
    let check_out = req.body.check_out;
    console.log(check_out);
    connection.query('SELECT room_num FROM room where status = "booked" and (? >= checkin and ? <= checkout) ', [
        check_in, check_out
    ], (err, result, fields) => {
        if (err) 
            throw err;
        out = []
        let rooms = result.length;
        for (let room of result) {
            out.push(parseInt(room.room_num));
        }

        console.log(out);
        var difference = room.filter(x => !out.includes(x));
        console.log(difference);
        res.send(difference);
    })   
}

//reserving room 
let reserveroom = (req, res) => {
    console.log(req.body)
    var data = req.body;
    connection.query('INSERT INTO customer(f_name,l_name,email,phone) VALUES(?,?,?,?)', [
        data.Fname, data.lname, data.email, data.mob
    ], (err, result, fields) => {
        if (result.affectedRows === 1) {
            connection.query(('select cust_id from customer order by cust_id desc limit 1'), (err, result, fields) => {
                if (err) {
                    throw err;
                }
                console.log(result);

                var cust_id = result[0].cust_id;
                console.log(cust_id);
                connection.query('INSERT INTO bookings(cust_id,room_num,checkin,checkout) VALUES(?,?,?,?)', [
                    cust_id, data.roomno, data.check_in, data.check_out
                ], (err, result, fields) => {
                    if (result.affectedRows === 1) {
                        connection.query(('Select book_id from bookings order by book_id desc limit 1'), (err, result, fields) => {
                            if (err) {
                                throw err;
                            }
                            console.log(result);
                            var book_id = result[0].book_id;
                            // send_id=book_id;
                            console.log(book_id);
                            connection.query('INSERT into room(book_id,room_num,status,checkin,checkout) values(?,?,?,?,?)', [
                                book_id,
                                data.roomno,
                                "booked",
                                data.check_in,
                                data.check_out,
                            ], (err, result, fields) => {
                                if (err) {
                                    throw err;
                                }
                                console.log(result);                                
                                res.render('reserve',{book_id});
                            });
                        })
                    };
                });
            });
        }
    });
}


let checkout=(req,res)=>{
    let book_id=req.body.book_id;
    connection.query('Select checkin from room where book_id=?',[book_id],(err,result,fields)=>{
        if(result.length!=0){
            if((new Date().toISOString().split('T')[0])>=result[0].checkin.toISOString().split('T')[0]){
                connection.query('Delete from room where book_id=?', [book_id], (err, result, fields) => {
                if (err) {
                    throw err;
                }
                console.log(result);
                res.send("You have checkout successfully for booking id "+book_id);
                })
            }
        else{
            res.send("You have not checkin yet");
        }}
        else(res.send("No user with this id"));
    })
}

//cancel
let cancel=(req,res)=>{
    let book_id=req.body.book_id;
    connection.query('Select checkin from room where book_id=?',[book_id],(err,result,fields)=>{
        console.log(result);
        if(result.length!=0){
        if((new Date().toISOString().split('T')[0])<result[0].checkin.toISOString().split('T')[0]){
            connection.query('Delete from room where book_id=?', [book_id], (err, result, fields) => {
                if (err) {
                    throw err;
                }
                connection.query('Update bookings set checkin= NULL ,checkout= NULL where book_id=?',[book_id],(err, result, fields)=>{
                    if (err) {
                        throw err;
                    }
                })
                console.log(result);
                res.send("Booking id "+book_id+" is cancelled");
            })
        }
        else{
            res.send("After checkin you can not cancel the booking");
        }}
        else{
            res.send("No user with this id");
        }
    })
}

module.exports = {
    form,
    index,
    checkcancel,
    emptyroom,
    reserveroom,
    checkout,
    cancel
}
