const express = require("express");
const app = express();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const request = require('supertest')
const router = require('../../routes/admin');


app.use(express.urlencoded({ extended: false}))
app.use('/', router)


describe('testing get endpoints', () => {
    test('should post to login page', (done) => {
     request(app).get('/')
    //  .expect('Content-Type', /json/)
        // .send({email: 'godwillonyewuchii@gmail.com', password: 'comfort9'})
        .expect(200)
        .end((err, res) => {
            if (err) return done(err)
            return done();
        })
        
    },30000)
})
