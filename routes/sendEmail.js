`use strict`

const nodemailer = require('nodemailer');

module.exports = function(appointment, email) {

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'tothtomi7@gmail.com',
           pass: 'Yasakamukk91'
       }
   });

   let hall = appointment.bigHall ? 'Nagy Terem':'Kis Terem';
  // send mail with defined transport object
  let mailOptions = {
      from: '"BVSC Asztalitenisz"', // sender address
      to: 'tothtomi7@gmail.com', // list of receivers
      subject: 'Sikeres foglalás', // Subject line
      html: `
      <b>Üdvözöljük</b>
      <br>
      <p>Sikeresen lefoglalta a pingpong asztalt<p>
      <br>
      <p>Adatok:<p>
      <p>Dátum: ${appointment.from.toISOString().split('T')[0]}</p>
      <p>Kezdési időpont: ${appointment.from.getUTCHours()}:00</p>
      <p>Befejezés: ${appointment.to.getUTCHours()}:00</p>
      <p>Terem: ${hall}</p>
      <p>Asztalok: ${appointment.table}</p>
      <p>kinek megy: ${email}</p>
      <b>BVSC Asztalitenisz csapata!<b>
      ` 
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
 });
}

