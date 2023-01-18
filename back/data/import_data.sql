BEGIN; 

INSERT INTO "language"("name") VALUES 
('français'),
('anglais'),
('italien'),
('allemand'),
('espagnol');

INSERT INTO "role"("name") VALUES 
('product Manager'),
('lead Dev Front'),
('lead Dev Back'),
('developpeur front'),
('developpeur back');

INSERT INTO "category"("name")VALUES 
('frameworks et librairies'),
('environnements'),
('back'),
('langages de programmation'),
('base de données');

INSERT INTO "technology"("name", "color","category_id") VALUES 
('react', '00D8FF', 1),
('react-native', '00D8FF', 1),
('redux', '5123D4', 1),
('recoil', '000000', 1),
('angular', 'E0234E', 1), 
('vuejs', '3BB028', 1),
('git', 'F0652A', 2),
('insomnia', '4000BF', 2),
('postman', 'FF6C37', 2),
('linux', '000000', 2), 
('ubuntu', 'DD4814', 2),
('nodejs', '207E11', 3),
('nestjs', 'E0234E',3), 
('firebase', 'EEAB37',3),
('symfony', '000000',1),
('laravel', 'FF2D20', 1),
('codelgniter', 'DD4814', 1), 
('javascript', 'EDC701', 4),
('php', '6181B6', 4),
('typescript', '3178C6', 4), 
('flutter', '47C5FB', 4),
('mongodb', '01EC64', 5), 
('postgres', '336791', 5),
('sequelize', '03AFEF', 5);

INSERT INTO "tag"("name", "color") VALUES 
('front', '2ED8E3'),
('back', '372569'),
('database', '2E8520'),
('issue', 'FF9811'),
('urgent', 'D80027');

INSERT INTO "user"("firstname", "lastname", "email", "password", "avatar", "speciality", "description") VALUES
('leslie', 'alexander', 'leslie1@mail.com', '1234', 'leslie_alexander', 'fullstack', 'Autem autem sanguine nec lucratus septem quoque lucratus ut septem.'), 
('wade', 'warren', 'wade1@mail.com', '123', 'wade_warren', 'front','Autem autem sanguine nec lucratus septem quoque lucratus ut septem.'), 
('cody', 'fisher', 'cody1@mail.com', '12345', 'cody_fisher', 'back','Autem autem sanguine nec lucratus septem quoque lucratus ut septem.'), 
('arlene', 'mccoy', 'arlen1@mail.com', '123456', 'arlene_mccoy', 'fullstack','Autem autem sanguine nec lucratus septem quoque lucratus ut septem.'), 
('guy', 'hawkins', 'guy1@mail.com', '12456', 'guy_hawkins', 'back','Autem autem sanguine nec lucratus septem quoque lucratus ut septem.'), 
('brooklyn', 'simmons', 'brooklyn1@mail.com', '124575', 'brooklyn_simmons', 'front','Autem autem sanguine nec lucratus septem quoque lucratus ut septem.'),
('courtney', 'henry', 'henry1@mail.com', '12341235', 'henry_courtney', 'front','Autem autem sanguine nec lucratus septem quoque lucratus ut septem.'),  
('kristin', 'watson', 'kristin1@mail.com', '12341554', 'kristin_watson', 'front','Autem autem sanguine nec lucratus septem quoque lucratus ut septem.'); 

INSERT INTO "project"("name", "description", "team_description", "repo_github", "user_id") VALUES
('balder', 'Qui cum ulla quos cum deflecti Petobionem insidiarum praestitutum quos praestitutum oppidum fatorum omnes omnes suis imperio in suis ubi.', 
'Comes induratae fames tuebatur efferebantur comes Castricius rabie fames quam.', 'lien vers le repo',2), 
('universe', 'Enim nostri morte velut quam aerarii nobis per ulla piget exuviae voluntaria foederato facta culpa magis ob hanc angustias foederato piget velut populum velut repetetur hostiles insulam quam quam hausto.', 
'Comes induratae fames tuebatur efferebantur comes Castricius rabie fames quam.', 'lien vers le repo',7), 
('apollon', 'Sane iudicare autem enim notas amicitias iudicarent ipsa curam cuius diligentiores diligentiores quasi rebus diligentiores habere sane homines dicere et.', 
'Comes induratae fames tuebatur efferebantur comes Castricius rabie fames quam.', 'lien vers le repo',3), 
('colorWorld', 'Qui cum ulla quos cum deflecti Petobionem insidiarum praestitutum quos praestitutum oppidum fatorum omnes omnes suis imperio in suis ubi.', 
'Comes induratae fames tuebatur efferebantur comes Castricius rabie fames quam.', 'lien vers le repo',8), 
('chameleon', 'Enim nostri morte velut quam aerarii nobis per ulla piget exuviae voluntaria foederato facta culpa magis ob hanc angustias foederato piget velut populum velut repetetur hostiles insulam quam quam hausto.', 
'Comes induratae fames tuebatur efferebantur comes Castricius rabie fames quam.', 'lien vers le repo',5), 
('loveClip', 'Sane iudicare autem enim notas amicitias iudicarent ipsa curam cuius diligentiores diligentiores quasi rebus diligentiores habere sane homines dicere et.', 
'Comes induratae fames tuebatur efferebantur comes Castricius rabie fames quam.', 'lien vers le repo',4),
('tyme', 'Qui cum ulla quos cum deflecti Petobionem insidiarum praestitutum quos praestitutum oppidum fatorum omnes omnes suis imperio in suis ubi.', 
'Comes induratae fames tuebatur efferebantur comes Castricius rabie fames quam.', 'lien vers le repo',6), 
('calypso', 'Qui cum ulla quos cum deflecti Petobionem insidiarum praestitutum quos praestitutum oppidum fatorum omnes omnes suis imperio in suis ubi.', 
'Comes induratae fames tuebatur efferebantur comes Castricius rabie fames quam.', 'lien vers le repo',1);

INSERT INTO "master"("user_id", "technology_id") VALUES 
(1,1),(1,3),(1,7),(1,12),(1,18),(1,20),(1,24),
(2,1),(2,3),(2,5),(2,6),(2,12),(2,18),
(3,7),(3,8),(3,15),(3,17),(3,19),(3,23),
(4,1),(4,3),(4,7),(4,12),(4,18),(4,20),(4,24),
(5,7),(5,8),(5,9),(5,15),(5,19),(5,23),
(6,1),(6,3),(6,4),(6,6),(6,18),(6,20),
(7,1),(7,5),(7,6),(7,7),(7,18),(7,20),
(8,12),(8,24),(8,7),(8,8);

INSERT INTO "speak"("user_id", "language_id") VALUES 
(1,1),(1,2),
(2,1),(2,2),(2,5),
(3,1),(3,2),
(4,1),(4,2),
(5,1),(5,2),(5,5),
(6,1),(6,2),(6,4),
(7,1),(7,2),(7,4),
(8,1),(8,2),(8,3);

INSERT INTO "work_on"("user_id","project_id") VALUES
(1,8),
(1,1),
(2,1),
(3,3),
(4,6),
(5,5),
(6,7),
(7,2),
(8,4);

INSERT INTO "user_has_role"("work_on_id", "role_id") VALUES
(1,1),(1,3),
(2,2), (2,4),
(3,1),(3,2),
(4,1),(4,3),
(5,1),(5,3),
(6,1),(6,3),
(7,1),(7,2),
(8,1),(8,2),
(9,1),(9,3);


INSERT INTO "use"("project_id","technology_id") VALUES
(1,1),(1,3),(1,7),(1,12),(1,18),(1,20),(1,24),
(2,1),(2,4),(2,7),(2,8),(2,12),(2,24),
(3,7),(3,8),(3,15),(3,19),(3,23),
(4,1),(4,4),(4,12),(4,24),(4,8),(4,7),
(5,7),(5,8),(5,15),(5,19),(5,23),
(6,1),(6,3),(6,18),(6,12),(6,7),(6,20),(6,24),
(7,7),(7,8),(7,15),(7,19),(7,23),
(8,1),(8,3),(8,7),(8,12),(8,18),(8,20),(8,24);

COMMIT; 