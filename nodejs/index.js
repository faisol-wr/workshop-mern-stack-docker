const express = require('express')

// MongoDB Config
const MongoClient = require("mongodb").MongoClient
const db_user = process.env.DATABASE_USER
const db_pass = process.env.DATABASE_PASSWORD
const db_host = process.env.DATABASE_HOST
const db_port = 27017

const url = `mongodb://${db_user}:${db_pass}@${db_host}:${db_port}`
console.log(url)

const app = express()

app.use(function(req, resp, next) {
	// Website 
	resp.setHeader("Access-Control-Allow-Origin", "*");
	// Request Method
	resp.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	// Request Header
	resp.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-type");
	next();
})


app.get("/api/products", (req, resp) => {

	MongoClient.connect(
		url,
		(err, client) => {
			if (err) throw err
			console.log("Database connected!")

			const db = client.db("products")
			db.collection("products")
				.find()
				.toArray((err, result) => {
					if (err) throw err;
					resp.status(200).send(result)
                    client.close()
				})
		}
	)
})


app.listen(3000, () => {
    console.log('Server listening on port 3000')
})