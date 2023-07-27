const connection = require('../../connection');
const nodemailer = require("nodemailer");

module.exports = {
    createApplicant : async (req, res) => {
        const { fullName,  email, qualification, experience, lastCompany } = req.body;    
        const  file  = req.file; 

        connection.query(`INSERT INTO applicants VALUES ('${fullName}', '${email}','${qualification}','${experience}','${lastCompany}', '${file}')`, async (error, result) =>{
            if(error){
                console.log(error, "error")
                return res.status(500).json({ error: "Error in inserting data"});
            } else{
                let response = await sendEmailViaSmtp(fullName,email, file );
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

let sendEmailViaSmtp = async (fullName,email, file  ) => { 
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
        subject: "CV",
        html: `
              <div>
              <P>Hi,<br>                 
                  <p>
                  ${fullName} has tried contacting GIKS INDIA.</br>                  
                  email : ${email}
                  </P>
                  <p>This email contains an attachment.</p>
              </P>             
             
           </div>
           <div>
              <p>
              Thanks & Regards,<br>
                  GIKS INDIA<br>                  
              </p>
           </div>
               `,
        attachments: [
                {
                  filename: file.filename,   // Replace with the actual filename
                  path: file.path,    // Replace with the actual file path
                },
              ],
      });
  
      if (info.messageId) {
        let mailToUser = await transporter.sendMail({
          from: "info.giks@gmail.com",
          to: email,
          subject: `${fullName} thanks for contacting GIKS INDIA ✔`,
          html: `
              <div>
              <P>
                  Dear ${fullName},<br>
                  <p>
                  We have recived your request, we will get back to you shortly.
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
