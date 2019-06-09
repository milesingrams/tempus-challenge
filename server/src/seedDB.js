import User from './routes/user/userModel'

User.deleteMany({}).then(() => {
  let seedUsers = [
    {
      name: 'Ima Patient',
      age: 22 + Math.ceil(Math.random() * 40),
      address: '10 10th street, Atlantis, Antartica 11111',
      phone: '555-666-7777',
      role: 'patient',
      email: 'patient@test.com',
      location: [40.730610, -73.935242],
      password: 'patient'
    },
    {
      name: 'Ima Doctor',
      age: 22 + Math.ceil(Math.random() * 40),
      address: '10 10th street, Atlantis, Antartica 11111',
      phone: '555-666-7777',
      role: 'doctor',
      email: 'doctor@test.com',
      location: [32.799576, -97.269180],
      password: 'doctor'
    },
    {
      name: 'Todd Biggums',
      age: 22 + Math.ceil(Math.random() * 40),
      address: '10 10th street, Atlantis, Antartica 11111',
      phone: '555-666-7777',
      role: 'patient',
      email: 'todd.biggums@askjeeves.com',
      location: [39.022846, -94.715187],
      password: 'pass1'
    },
    {
      name: 'Sleve McDichael',
      age: 22 + Math.ceil(Math.random() * 40),
      address: '10 10th street, Atlantis, Antartica 11111',
      phone: '555-666-7777',
      role: 'patient',
      email: 'sleve@askjeeves.com',
      location: [37.005783, -121.568275],
      password: 'pass2'
    },
    {
      name: 'Bobson Bonzalez',
      age: 22 + Math.ceil(Math.random() * 40),
      address: '10 10th street, Atlantis, Antartica 11111',
      phone: '555-666-7777',
      role: 'patient',
      email: 'bonzo@askjeeves.com',
      location: [34.496212, -93.057220],
      password: 'pass3'
    },
    {
      name: 'Amy Smorin',
      age: 22 + Math.ceil(Math.random() * 40),
      address: '10 10th street, Atlantis, Antartica 11111',
      phone: '555-666-7777',
      role: 'patient',
      email: 'amy@askjeeves.com',
      location: [14.703580, 120.986542],
      password: 'pass4'
    },
    {
      name: 'Sky Isblue',
      age: 22 + Math.ceil(Math.random() * 40),
      address: '10 10th street, Atlantis, Antartica 11111',
      phone: '555-666-7777',
      role: 'patient',
      email: 'sky@askjeeves.com',
      location: [38.978443, -76.492180],
      password: 'pass5'
    }
  ]

  seedUsers.forEach((seedUser) => {
    let user = new User(seedUser);
    User.register(user, seedUser.password)
  })

})
