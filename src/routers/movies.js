const express = require('express')

const Movie = require('../models/movie')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/movies', auth, async (req, res) => {
    const movie = new Movie({
        ...req.body,
        owner: req.user._id
    })
    try {
        await movie.save()
        res.status(201).json({ id: movie.id })
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/movies', async (req, res) => {
    if (!req.query.movie) {
        return res.status(400).send("Please provide a movie name")
    }
    try {
        let loggedIn = false
        if (req.cookies.token) {
            loggedIn=true
        }
        const movie = await Movie.getMovieDetails(req.query.movie)
        if (!movie) {
            return res.render('results', {
                title: req.query.movie,
                movies: false,
                loggedIn
             })
        }
        res.render('results', {
           title: req.query.movie,
           movies: [movie],
           loggedIn
        })
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/movies/me', auth, async (req, res) => {
    try {
        let loggedIn = false
        if (req.cookies.token) {
            loggedIn = true
        }
        await req.user.populate('movies')
        if (req.user.movies.length == 0) {
            return res.render('list', {
                title: req.query.movie,
                movies: false,
                loggedIn
             })
        }
        res.render('list', {
            title: req.query.movie,
            movies: req.user.movies,
            loggedIn
         })
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/movies/me/:id', auth, async (req, res) => {
    try{
        const movie = await Movie.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        if (!movie) {
            return res.status(404).send({error:'Movie not found'})
        }
        res.send(movie)
    } catch(e){
        res.status(400).send(e)
    }
})

module.exports = router