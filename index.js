const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
// require('./connection');

const ContactRouter = require('./api/Contact/ContactRouting');
const CareerRouter = require('./api/Career/CareerRouting')

app.use(express.json());
app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({extended : true }));
app.use("/uploads", express.static("uploads"));

app.use('/api/contact-us', ContactRouter);
app.use('/api/career', CareerRouter);

app.get("/", (_,res)=> {
    res.send("Server is running");
})

app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
  });

