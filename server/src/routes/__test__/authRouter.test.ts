import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/v1/auth/register')
    .send({
      name: 'awaisshah228',
      account: 'awaisshah228@gmail.com',
      password: "djfflfjdl"
    })
    .expect(201);
});

it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/v1/auth/register')
    .send({
      name: 'awaisshah228',
      account: 'awaisscom',
      password: "djfflfjdl"
    })
    .expect(400);
});

it('returns a 400 with an invalid password', async () => {
  return request(app)
    .post('/v1/auth/register')
    .send({
      name: 'awaisshah228',
      account: 'awaisscom',
      password: "ddl"
    })
    .expect(400);
});

// it('returns a 400 with missing email and password', async () => {
//   await request(app)
//     .post('/api/users/signup')
//     .send({
//       email: 'test@test.com'
//     })
//     .expect(400);

//   await request(app)
//     .post('/api/users/signup')
//     .send({
//       password: 'alskjdf'
//     })
//     .expect(400);
// });

// it('disallows duplicate emails', async () => {
//   await request(app)
//     .post('/api/users/signup')
//     .send({
//       email: 'test@test.com',
//       password: 'password'
//     })
//     .expect(201);

//   await request(app)
//     .post('/api/users/signup')
//     .send({
//       email: 'test@test.com',
//       password: 'password'
//     })
//     .expect(400);
// });

// it('sets a cookie after successful signup', async () => {
//   const response = await request(app)
//     .post('/api/users/signup')
//     .send({
//       email: 'test@test.com',
//       password: 'password'
//     })
//     .expect(201);

//   expect(response.get('Set-Cookie')).toBeDefined();
// });