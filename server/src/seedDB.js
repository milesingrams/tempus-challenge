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
      password: 'patient'
    },
    {
      name: 'Ima Doctor',
      age: 22 + Math.ceil(Math.random() * 40),
      address: '10 10th street, Atlantis, Antartica 11111',
      phone: '555-666-7777',
      role: 'doctor',
      email: 'doctor@test.com',
      password: 'doctor'
    },
    {
      name: 'Todd Biggums',
      age: 22 + Math.ceil(Math.random() * 40),
      address: '10 10th street, Atlantis, Antartica 11111',
      phone: '555-666-7777',
      role: 'patient',
      email: 'todd.biggums@askjeeves.com',
      password: 'pass1'
    },
    {
      name: 'Sleve McDichael',
      age: 22 + Math.ceil(Math.random() * 40),
      address: '10 10th street, Atlantis, Antartica 11111',
      phone: '555-666-7777',
      role: 'patient',
      email: 'sleve@askjeeves.com',
      password: 'pass2'
    },
    {
      name: 'Bobson Bonzalez',
      age: 22 + Math.ceil(Math.random() * 40),
      address: '10 10th street, Atlantis, Antartica 11111',
      phone: '555-666-7777',
      role: 'patient',
      email: 'bonzo@askjeeves.com',
      password: 'pass3'
    },
    {
      name: 'Amy Smorin',
      age: 22 + Math.ceil(Math.random() * 40),
      address: '10 10th street, Atlantis, Antartica 11111',
      phone: '555-666-7777',
      role: 'patient',
      email: 'amy@askjeeves.com',
      password: 'pass4'
    },
    {
      name: 'Sky Isblue',
      age: 22 + Math.ceil(Math.random() * 40),
      address: '10 10th street, Atlantis, Antartica 11111',
      phone: '555-666-7777',
      role: 'patient',
      email: 'sky@askjeeves.com',
      password: 'pass5'
    }
  ]

  seedUsers.forEach((seedUser) => {
    let user = new User(seedUser);
    User.register(user, seedUser.password)
  })

})
