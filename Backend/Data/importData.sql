-- Création de la table categories
CREATE TABLE categories (
    id INT PRIMARY KEY,
    created DATE,
    category VARCHAR(255)
);

-- Insertion des données dans la table categories
INSERT INTO categories (id, created, category)
VALUES 
    (1, '2015-03-10', 'Dystopie'),
    (2, '2012-07-21', 'Fantasy'),
    (3, '2018-11-05', 'Roman classique'),
    (4, '2014-09-18', 'Littérature jeunesse'),
    (5, '2016-04-30', 'Roman historique'),
    (6, '2013-10-12', 'Aventure');

-- Création de la table users
CREATE TABLE users (
    id INT PRIMARY KEY,
    pseudo VARCHAR(255),
    date_entree DATE,
    mot_de_passe VARCHAR(255)
);

-- Insertion des données dans la table users
INSERT INTO users (id, pseudo, date_entree, mot_de_passe)
VALUES 
    (0, 'jeanLucRichman', '2006-09-24', 'jdedded'),
    (1, 'alberZweiTime', '2006-09-24', 'jdedded'),
    (2, 'MeonardoDicarpacio', '2006-09-24', 'jdedded'),
    (3, 'elgroundo', '2006-09-24', 'jdedded'),
    (4, 'McMa', '2006-09-24', 'jdedded'),
    (5, 'SaladTomate', '2006-09-24', 'jdedded'),
    (6, 'MMMMMMMMa', '2006-09-24', 'jdedded');

-- Création de la table books
CREATE TABLE books (
    id INT PRIMARY KEY,
    price DECIMAL(10, 2),
    created DATE,
    title VARCHAR(255),
    image VARCHAR(255),
    categories_id INT,
    users_id INT,
    page_count INT,
    summary TEXT,
);

-- Insertion des données dans la table books
INSERT INTO books (id, price, created, title, image, categories_id, users_id, page_count, summary)
VALUES 
    (1, 9.99, '2018-06-21', '1984', 'https://th.bing.com/th/id/OIP.Z5KLQbybGAxlM5JdjOWeWwAAAA?rs=1&pid=ImgDetMain', 1, 1, 328, 'Dans un monde totalitaire, Winston Smith tente de s''élever contre le contrôle oppressif du Parti.'),
    (2, 14.99, '2012-05-14', 'Le Seigneur des Anneaux : La Communauté de l''Anneau', 'https://media.senscritique.com/media/000006844185/source_big/Le_Seigneur_des_Anneaux_La_Communaute_de_l_anneau.jpg', 2, 2, 423, 'Frodon Sacquet entreprend un voyage périlleux pour détruire un anneau maléfique et sauver la Terre du Milieu.'),
    (3, 12.99, '2019-08-30', 'Harry Potter à l''école des sorciers', 'https://th.bing.com/th/id/OIP.TY4VTNCbLsWleOyoWQVA9QAAAA?rs=1&pid=ImgDetMain', 2, 2, 320, 'Harry Potter découvre qu''il est un sorcier et commence son apprentissage à Poudlard, une école de magie.'),
    (4, 8.49, '2013-12-17', 'Orgueil et Préjugés', 'https://th.bing.com/th/id/R.780479fec68a1ed711e3a0355596e900?rik=R01DJ%2bHJ4NzgFQ&pid=ImgRaw&r=0', 3, 3, 384, 'L''histoire de l''orgueilleuse Elizabeth Bennet et du hautain Mr. Darcy dans l''Angleterre du XIXe siècle.'),
    (5, 6.99, '2011-09-02', 'Le Petit Prince', 'https://media.s-bol.com/qwE49mk1MV7/796x1200.jpg', 4, 4, 96, 'Un conte philosophique sur l''amitié et l''amour, racontant les aventures d''un petit prince venu d''une autre planète.'),
    (6, 19.99, '2017-11-11', 'Les Misérables', 'https://d28hgpri8am2if.cloudfront.net/book_images/cvr9781451686005_9781451686005_hr.jpg', 5, 5, 1488, 'L''histoire de Jean Valjean, un ancien bagnard, et de son parcours pour la rédemption dans la France du XIXe siècle.');

-- Création de la table comments
CREATE TABLE comments (
    id INT PRIMARY KEY,
    created DATE,
    comment TEXT,
    books_id INT,
    users_id INT,
);

-- Insertion des données dans la table comments
INSERT INTO comments (id, created, comment, books_id, users_id)
VALUES 
    (0, '2018-09-15', 'Vraiment nul', 1, 0),
    (1, '2017-03-28', 'Pas mal', 1, 1),
    (2, '2019-01-10', 'Bof', 2, 2),
    (3, '2015-11-22', 'Trop long', 3, 3),
    (4, '2016-08-05', 'J''adore', 4, 4),
    (5, '2013-07-19', 'Je suis fan', 5, 5),
    (6, '2014-05-30', 'Bon titre', 6, 6);
