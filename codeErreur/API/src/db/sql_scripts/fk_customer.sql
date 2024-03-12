USE db_librairie;

ALTER TABLE books
ADD CONSTRAINT fk_books_customer_id
FOREIGN KEY (customers_id)
REFERENCES Customer(id)
ON DELETE CASCADE;