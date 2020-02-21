INSERT INTO blogful_articles (title, date_published, content) 
VALUES 
    ('The Office', now() - '20 days'::INTERVAL, 'Pam, Jim, Kevin'),
    ('Fake News', now() - '2 days'::INTERVAL, 'Politics is trash'),
    ('Law & Order SVU Review', now() - '45 days'::INTERVAL, 'It''a great series'),
    ('Best Pizza Ever?', now() - '1 days'::INTERVAL, 'Defintiely Giaccomo'' Pizza')
    ;

