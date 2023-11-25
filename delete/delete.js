//import modules
const express = require('express')
let mongodb = require('mongodb')
//import url
const url = require('../url')
//create mongoclient
let mcl = mongodb.MongoClient
//create router instance
let router = express.Router()
//database name
let dbName = 'miniprj'
//create restapi
router.post("/", (req, res) => {
    let obj = {
        "p_id": req.body.p_id
    }
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db(dbName)
            db.collection('products').deleteOne(obj, (err, result) => {
                if (err)
                    res.json({ 'delete': 'Error ' + err })
                else {
                    if (result.deletedCount != 0) {
                        console.log("Data deleted ")
                        res.json({ 'delete': 'success' })
                    } else {
                        console.log("Data Not deleted ")
                        res.json({ 'delete': 'Record Not found' })
                    }
                    conn.close()
                }
            })
        }
    })
})
//Delete product from cart
router.post("/deleteCart", (req, res) => {
    let obj = {
        "p_id": req.body.p_id,
        "uname": req.body.uname
    }
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db(dbName)
            db.collection('cart').deleteOne(obj, (err, result) => {
                if (err)
                    res.json({ 'cartDelete': 'Error ' + err })
                else {
                    if (result.deletedCount != 0) {
                        console.log(`Cart data from ${obj.uname} deleted`)
                        res.json({ 'cartDelete': 'success' })
                    }
                    else {
                        console.log('Cart Data Not deleted')
                        res.json({ 'cartDelete': 'Record Not found' })
                    }
                    conn.close()
                }
            })
        }
    })
})

router.post("/updateUsers", (req, res) => {
    let uname = req.body.uname
    
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db(dbName)
            db.collection('users').deleteOne({uname},(err, result) => {
                    if (err)
                        res.json({ 'userdeleted': 'Error ' + err })
                    else {
                        if (result.matchedCount != 0) {
                            console.log(`delete data for ${uname} updated`)
                            res.json({ 'userdelete': 'success' })
                        }
                        else {
                            console.log(`Record not updated`)
                            res.json({ 'userdelete': 'Record Not found' })
                        }
                        conn.close()
                    }
                })
        }
    })
})


//export router
module.exports = router
