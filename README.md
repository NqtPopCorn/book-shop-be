## Command Line

- **Tạo model từ folder migration**
  ```bash
  npx sequelize-cli db:migrate
- **Tạo data từ seed:**
  ```bash
  npx sequelize db:seed:all
- **Tạo model từ db có sẵn:**
  ```bash
  npx sequelize-cli db:migrate
- **Tạo model**
  ```bash
  npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string  
