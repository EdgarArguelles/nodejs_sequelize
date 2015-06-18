# nodejs_sequelize
Example developing a Rest Server using NodeJs, Restifity, MySQL and Sequelize ORM

# Frameworks
 - Restifity
 - Sequelize

# Engines
 - node: 0.10.x
 - npm: 1.4.x
 
# Run
$ node src/app/app.js

# Test
$ mocha src/ --recursive

# Usage
 - Set up MySQL and create an empty database called sequelize
      (the app is going to create the tables (init-db.js))
 - Configure MySQL connection on DataBase section (app.js)