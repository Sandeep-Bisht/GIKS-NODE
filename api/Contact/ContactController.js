const connection = require('../../connection');

module.exports = {
    createUser : async (req, res) => {
        console.log("inside createTable", req.body);
        const { firstName, lastName, email, phoneNumber, subject, message } = req.body;

        connection.query(`INSERT INTO user VALUES ('${firstName}', '${lastName}','${email}','${phoneNumber}','${subject}','${message}')`, (error, result) =>{
            if(error){
                console.log(error, "error")
                return res.status(500).json({ error: "Error in inserting data"});
            }
            res.status(200).json({
                success : 200,
                 message: "Data Saved" 
                });
        })
    }
}