const express = require('express')

const User = require('../models/user')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.cookie('token', token, { expires: new Date(Date.now() + 900000), httpOnly: true}).status(201).redirect('/')
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        if (!user) {
            return res.status(404).send({ error: 'Please check your username or password and try again.' })
        }
        const token = await user.generateAuthToken()
        res.cookie('token', token, { expires: new Date(Date.now() + 900000), httpOnly: true}).redirect('/')
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token != req.token)
        await req.user.save()
        res.clearCookie('token').send()
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router