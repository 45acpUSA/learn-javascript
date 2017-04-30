# Sequelize One-to-Many Relationships
sequelize model:create --name Contact --attributes name:string,email:string,dob:date
sequelize model:create --name Phone --attributes number:string,description:string

* Note order is important.  We'll be referencing Contact when we setup Phone, so Contact needs to exist first



