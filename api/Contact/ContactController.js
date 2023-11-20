const connection = require('../../connection');
const nodemailer = require("nodemailer");

module.exports = {
    createUser : async (req, res) => {
        const { firstName, lastName, email, phoneNumber, subject, message } = req.body;

        connection.query(`INSERT INTO user VALUES ('${firstName}', '${lastName}','${email}','${phoneNumber}','${subject}','${message}')`, async (error, result) =>{
            if(error){
                console.log(error, "error")
                return res.status(500).json({ error: "Error in inserting data"});
            } else{
                let response = await sendEmailViaSmtp(firstName,lastName,phoneNumber, email,subject, message );
                if (response.messageId) {    
                    emailSendStatus = true;
                    res.status(200).json({
                      emailSendStatus,
                      message:
                        "Data Saved Successfully.",
                    });
                    }         
                   else {
                    emailSendStatus = false;
                    res.status(200).json({
                      emailSendStatus,
                      message:
                        "Try again.",
                    });
                  }
                
            }          
        })
        
    }

    
}

let sendEmailViaSmtp = async (firstName,lastName,phoneNumber, email,subject, message ) => {
    try {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "info.giks@gmail.com",
          pass: "zapgryhngolaaujr",
        },
        tls: { rejectUnauthorized: false },
      });
  
      let info = await transporter.sendMail({
        from: "info.giks@gmail.com",
        to: "nitin@giksindia.com",
        cc: "info.giks@gmail.com",
        subject: `${subject}`,
        html: `
              <div>
              <P>Hi,<br>                 
                  <p>
                  ${firstName} ${lastName} has tried contacting GIKS INDIA.</br>
                  contact no : ${phoneNumber} </br>
                  email : ${email}
                  </P>
                  <p>${message}</p>
              </P>             
             
           </div>
           <div>
              <p>
              Thanks & Regards,<br>
                  GIKS INDIA<br>                  
              </p>
           </div>
               `,
      });
  
      if (info.messageId) {
        let mailToUser = await transporter.sendMail({
          from: "info.giks@gmail.com",
          to: email,
          subject: `${firstName} ${lastName} thanks for contacting GIKS INDIA ✔`,
          html: `
              <div>
              <P>
                  Dear ${firstName} ${lastName},<br>
                  <p>
                  We have received your request, we will get back to you shortly.
                  </p>
                  <p>
                  Thanks for showing interest in GIKS INDIA
                  </p>
              </P>             
             
           </div>
           <div>
              <p>
              Thanks & Regards,<br>
                  GIKS INDIA<br>
                  Dehradun
              </p>
           </div>
               `
        }) 
        if(mailToUser){
          return info;
        }        
      }
    } catch (err) {
      return err;
    }
  };




