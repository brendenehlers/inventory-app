# Instructions for setting up the server

1. Install and setup PostgreSQL
2. Navigate to psql terminal
3. Run `create database inventoryapp`
4. Navigate to the server folder
5. Run `yarn run start`
6. Database **should** automatically setup tables
 
# Checking database setup
1. Go to psql and open the `inventoryapp` database
2. Run `\d` to get database info
3. There should be 4 entries:
  - `orders`
  - `orders_id_seq`
  - `products`
  - `products_id_seq`