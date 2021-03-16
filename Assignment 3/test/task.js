
let chai = require('chai');
// var mongoose = require('mongoose');
let chaiHttp = require('chai-http');
let server = require('../src/app');
let express = require('express');
const app = express();

app.use(express.json());


//Assertion style
chai.should();

chai.use(chaiHttp);


describe("Task Api", () => {
    //before(function () {
    //    mongoose.createConnection("mongodb://localhost:27017/studentsapi", {
    //        useCreateIndex: true,
    //        useNewUrlParser: true,
    //        useUnifiedTopology: true,
    //        useFindAndModify: false
    //    })
    //});

    //test the get route
    describe('GET /students', () => {
        it("it should get all the students", (done) => {
            chai.request('http://localhost:8000')
                .get("/students")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.be.equal(2);
                    done();
                })
        })


//         it("it should NOT get all the students", (done) => {
//             chai.request('http://localhost:8000')
//                 .get("/student")
//                 .end((err, response) => {
//                     response.should.have.status(404);
//                     done();
//                 })
//         })

    })

    //test the get by id route
    describe('GET /students/:_id', () => {
        it("it should get a student by id", (done) => {
            const taskId = "6050759af72e43407ca35391";
            chai.request('http://localhost:8000')
                .get("/students/" + taskId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('name');
                    response.body.should.have.property('email');
                    response.body.should.have.property('phone');
                    response.body.should.have.property('address');
                    response.body.should.have.property('_id').eq("6050759af72e43407ca35391");
                    done();
                });
        });


        //    it("It should NOT GET a task by ID", (done) => {
        //        const taskId = "6050719af72e43407ca35311;"
        //        chai.request('http://localhost:8000')
        //            .get("/students/" + taskId)
        //            .end((err, response) => {
        //                response.should.have.status(200);
        //                response.body.should.have.property('name');
        //                response.body.should.have.property('email');
        //                response.body.should.have.property('phone');
        //                response.body.should.have.property('address');
        //                response.text.should.be.eq("The task with the provided ID does not exist.");
        //             done();
        //            });
        //    });

        //});



        //test the post operation
        describe('POST /students', () => {
            it("it should POST a student ", (done) => {
                const student = {
                    name: "Manglam",
                    email: "manglam11@gmail.com",
                    phone: 7529427465,
                    address: "Agra"
                };
                chai.request('http://localhost:8000')
                    .post("/students/")
                    .send(student)
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('object');

                        response.body.should.have.property('name').eq("Manglam");
                        done();
                    });
            });
            it("it should  not POST a student ", (done) => {
                const student = {
                    email: "ma2glam11@gmail.com",
                    phone: 7529427465,
                    address: "Agra"
                };
                chai.request('http://localhost:8000')
                    .post("/students/")
                    .send(student)
                    .end((err, response) => {
                        response.should.have.status(400);
                        response.body.should.be.a('object');
                        done();
                    });
            });
        });


        //test the patch operation

        describe("PATCH /students/:_id", () => {
            it("It should PATCH an existing student", (done) => {
                const taskId = "604e2bd6189ad8587c9622ff";
                const task = {
                    email: "himanshuSach13@gmail.com"
                };
                chai.request('http://localhost:8000')
                    .patch("/students/" + taskId)
                    .send(task)
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('object');
                        response.body.should.have.property('_id').eq("604e2bd6189ad8587c9622ff");
                        response.body.should.have.property('email').eq("himanshuSach13@gmail.com");
                        done();
                    });
            });




            //test the delete ope.

            describe("DELETE /students/:_id", () => {
                it("It should delete an existing student", (done) => {
                    const taskId = "605075b3f72e43407ca35392";

                    chai.request('http://localhost:8000')
                        .delete("/students/" + taskId)
                        .send(taskId)
                        .end((err, response) => {
                            response.should.have.status(200);

                            done();
                        });
                });

            });
        });
    });
});
