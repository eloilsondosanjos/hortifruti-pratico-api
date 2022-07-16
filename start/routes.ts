/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/login', 'AuthController.login')
  Route.post('/logout', 'AuthController.logout')

  Route.post('/clients', 'ClientsController.store')

  Route.get('/cities', 'CitiesController.index')
  Route.get('/cities/:id/establishments', 'CitiesController.establishmentsListByCity')

  Route.get('/establishments/:id', 'EstablishmentsController.show')

  Route.group(() => {
    Route.get('/auth/me', 'AuthController.me')
    Route.put('/clients', 'ClientsController.update')

    Route.resource('/addresses', 'AddressesController').apiOnly()

    Route.get('/establishments/requests', 'EstablishmentsController.requests')

    Route.post('/requests', 'RequestsController.store')
    Route.get('/requests', 'RequestsController.index')
    Route.get('/requests/:hash_id', 'RequestsController.show')
  }).middleware('auth')

  Route.post('/users', 'UsersController.store')
}).prefix('/api')
