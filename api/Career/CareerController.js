const connection = require('../../connection');

module.exports = {
    createApplicant : async (req, res) => {
        console.log("inside carrer", req.body);
        const { firstName, lastName, email } = req.body;

        connection.query(`INSERT INTO applicants VALUES ('${firstName}', '${lastName}','${email}')`, (error, result) =>{
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