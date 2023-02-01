const mongoose = require('mongoose')
require('dotenv').config()
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URL

console.log('connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3,'Must be at least 3 letters'],
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{2,3}-.*/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true,'Phone number is required']
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


//const error = badBreakfast.validateSync();
module.exports = mongoose.model('Person', personSchema)