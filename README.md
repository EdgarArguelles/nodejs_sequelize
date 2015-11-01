# nodejs_sequelize
Example developing a Rest Server using NodeJs, Restifity, MySQL and Sequelize ORM

# Frameworks
 - Restifity
 - Sequelize

# Engines
 - node: 0.10.x
 - npm: 1.4.x
 
# Install
$ npm install
 
# Run
$ node src/app/app.js

# Test
$ mocha src/ --recursive

# Usage
 - Set up MySQL and create an empty database called sequelize
      (the app is going to create the tables (init-db.js))
 - Configure MySQL connection on DataBase section (app.js)
 - You can access to all Resources (users, personals, permissions, roles)
   with the format:
   <br>GET http://localhost:3000/api/[resource]
   <br>GET http://localhost:3000/api/[resource]/[id]
   <br>POST http://localhost:3000/api/[resource]/new
   <br>PUT http://localhost:3000/api/[resource]/[id]
   <br>example GET http://localhost:3000/api/users