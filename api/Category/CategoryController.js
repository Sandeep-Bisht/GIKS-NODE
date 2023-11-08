// const { Module } = require("module");
// const connection = require("../../connection");
// const fs = require("fs");

// module.exports = {
//  createCategory: async (req, res) => {
//     const { name, description } = req.body;
//     console.log(req.body, "check the data");
//     const categoryImage = req.files[0];
//     const categoryTable = 'SHOW TABLES LIKE "category"';

//     connection.query(categoryTable, (error, result) => {
//         if (error) {
//             res.json({
//                 status: 400,
//                 message: "Something went wrong"
//             });
//         } else if (result.length === 0) {
//             const createTable =
//                 "CREATE TABLE category (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(100) NOT NULL, description VARCHAR(200), categoryImage JSON, PRIMARY KEY (id)";
//             connection.query(createTable, (error) => {
//                 if (error) {
//                     console.error(error);
//                     return res.status(500).send("Error creating table");
//                 }
//                 insertData();
//             });
//         } else {
//             insertData();
//         }
//     });

//     function insertData() {
//         fs.readFile(categoryImage.path, (error, data) => {
//             if (error) {
//                 console.error(error);
//                 return res.status(500).send("Error reading image file");
//             }
//             const imageObject = {
//                 fieldname: categoryImage.fieldname,
//                 originalname: categoryImage.originalname,
//                 encoding: categoryImage.encoding,
//                 mimetype: categoryImage.mimetype,
//                 destination: categoryImage.destination,
//                 filename: categoryImage.filename,
//                 path: categoryImage.path,
//                 size: categoryImage.size,
//             };

//             const insertSql =
//                 "INSERT INTO category (name, description, categoryImage) VALUES (?,?,?)";
//             const values = [
//                 name,
//                 description,
//                 JSON.stringify(imageObject),
//             ];
//             connection.query(insertSql, values, async (error, result) => {
//                 if (error) {
//                     console.error(error);
//                     return res.status(500).send("Error inserting category");
//                 }
//                 res.status(200).send("Category added to the database");
//             });
//         });
//     }
//  },
//  getAllCategory: async (req,res)=>{
//   const allCategoryQuery="SELECT * FROM category"
//   connection.query(allCategoryQuery,(error,result)=>{
//     if(error){
//         res.JSON({
//             status:400,
//             message:"somthing wrong"
//         })
//     }
//     const categories=result.map((category)=>{
//         const categoryImage=JSON.parse(category.categoryImage);
//         return {
//             ...category,
//             categoryImage
//         }
//     })
//     res.status(200).json(categories);
//   })
//  },
//  deleteCategoryById: async (req, res) => {
//     const { id } = req.body;
//     const deleteQuery = `DELETE FROM category WHERE id = ${id}`;
//     connection.query(deleteQuery, (error, result) => {
//       if (error) {
//         console.error(error);
//         return res.status(500).send("Error in deleting Category");
//       }
//       res.status(200).json({
//         data: result,
//         message: "Category deleted successfully",
//       });
//     });
//   },
// }
