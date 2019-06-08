import User from './routes/user/userModel'

User.deleteMany({}).then(() => {
  let seedUsers = [
    {
      firstName: 'Ima',
      lastName: 'Patient',
      email: 'patient@test.com',
      role: 'patient',
      password: 'patient'
    },
    {
      firstName: 'Ima',
      lastName: 'Doctor',
      email: 'doctor@test.com',
      role: 'doctor',
      password: 'doctor'
    },
    {
      firstName: 'Todd',
      lastName: 'Biggums',
      email: 'todd.biggums@askjeeves.com',
      role: 'patient',
      password: 'pass1'
    },
    {
      firstName: 'Sleve',
      lastName: 'McDichael',
      email: 'sleve@askjeeves.com',
      role: 'patient',
      password: 'pass2'
    },
    {
      firstName: 'Bobson',
      lastName: 'Bonzalez',
      email: 'bonzo@askjeeves.com',
      role: 'patient',
      password: 'pass3'
    },
    {
      firstName: 'Amy',
      lastName: 'Smorin',
      email: 'amy@askjeeves.com',
      role: 'patient',
      password: 'pass4'
    },
    {
      firstName: 'Sky',
      lastName: 'Isblue',
      email: 'sky@askjeeves.com',
      role: 'patient',
      password: 'pass5'
    }
  ]

  seedUsers.forEach((seedUser) => {
    let user = new User(seedUser);
    User.register(user, seedUser.password)
  })

})
