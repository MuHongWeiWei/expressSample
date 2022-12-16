const express = require('express')
const app = express()

//for multipart/form-data
const multer  = require('multer')
const upload = multer()

app.use(express.json());

app.post('/rawJson', (req, res) => {
    let formData = req.body
    formData.contentType = req.headers['content-type']
    console.log('form data', formData)
    console.log('form data', formData.person.name)
    console.log('form data', formData.person.age)
    res.status(200).send(formData)
});

app.post('/formData', upload.array(),(req, res) => {
    let formData = req.body
    formData.contentType = req.headers['content-type']
    const person = JSON.parse(formData.person)
    console.log('form data', person)
    console.log('form data', person.name)
    console.log('form data', person.age)
    formData.person = person
    res.status(200).send(formData)
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))


// POSTMAN
// 127.0.0.1:3000/rawJson
// Body raw JSON
/*
{
    "person" : {
        "name": "wade",
        "age": "20"
    }
}
**/

// POSTMAN
// 127.0.0.1:3000/formData
// Body form-data
/*
KEY      VALUE
person   {"name": "wade", "age": "20"}
**/