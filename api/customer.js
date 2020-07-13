const express = require('express')
const bodyParser = require('body-parser');
const app = express.Router()
app.use(bodyParser.json())
 
// getting user of telephone directory

app.get('/all', (req, res) => {
    let dir_db = req["dir_db"]

    var records = {
        "selector": {
            "name": {
                "$eq": req.body.name
            }

        },
        fields: ['name', 'tel', 'city']
    }
    
        dir_db.find(records).then((doc) => {
            console.log(req.body)
            res.send(doc.docs)
        }).catch((error) => {
            console.log(error)
        })
    
})

// adding a new user in telephone directory

app.post('/new', (req, res) => {
    let dir_db = req["dir_db"]

    var new_user = {
        name: req.body.name,
        tel: Number(req.body.tel),
        city: req.body.city
    }
    console.log(new_user)
    dir_db.insert(new_user, function (err, data) {
        if (err) return res.status(400).send("Error has occurred \n" + err)
        res.send(new_user)
    })

})

// updating user's info

app.put('/update', (req, res) => {
    let dir_db = req["dir_db"]
    var name = req.body.name
    var user = {
        "selector": {
            "name": {
                "$eq": name
            }
        },
        fields: ['name', 'tel', 'city', '_id', '_rev']
    }

    dir_db.find(user).then((doc) => {
        if (!doc) return res.status(400).send("user not found")
        let new_user = {
            name: doc.docs[0].name,
            tel: req.body.tel,
            city: req.body.city
        }

        dir_db.destroy(doc.docs[0]._id, doc.docs[0]._rev, () => {

            dir_db.insert(new_user, function (err, content) {
                if (!content) return res.status(400).send({ "message": err.message })
                res.send('user updated successfully')
            })
        })
    }).catch((error) => {
        console.log(error)
    })
})

// deleting a user from telephone directory

app.delete('/del', (req, res) => {
    let dir_db = req["dir_db"]
    console.log(req.body.name)
    var user = {
        "selector": {
            "name": {
                "$eq": req.body.name
            }
        },
        fields: ['name', '_id', '_rev']
    }

    dir_db.find(user).then((doc) => {

        if (!doc) return res.status(400).send("user not found")

        dir_db.destroy(doc.docs[0]._id, doc.docs[0]._rev, function () {
            res.send("user " + doc.docs[0].name + " is deleted successfully")
        })
    }).catch((error) => {
        console.log(error)
    })
})

module.exports = app