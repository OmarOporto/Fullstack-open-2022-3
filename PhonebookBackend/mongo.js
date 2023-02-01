const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://Omar_Oporto:${password}@cluster0.qb4tbwm.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length>4) {

  let name = process.argv[3]
  let number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(() => {
    console.log('added ',process.argv[3],' number',process.argv[4],' to phonebook')
    mongoose.connection.close()
  })
  //process.exit(1)
}

if (process.argv.length===4) {

  let name = process.argv[3]
  Person.find({ name }).then(result => {
    console.log(result)
    mongoose.connection.close()
  })
}

if (process.argv.length===3) {

  //let name = process.argv[3]
  console.log('Phonebook:')
  Person
    .find({})
    .then(result => {
      result.map(res => (console.log(res.name, res.number)))
      mongoose.connection.close()
    })
}