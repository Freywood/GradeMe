
DELETE FROM Users;
DELETE FROM Courses;
DELETE FROM Tasks;
DELETE FROM Subjects;
DELETE FROM IsIn;
DELETE FROM HasEvaluation;

-- INSERT INTO Users VALUES (Id, LoginName, Vorname, Name, Type, PwHash, Deactivated);
INSERT INTO Users VALUES (0, 'benitozenz',           'Benito',   'Zenz',         'student', '$2a$10$zydsoKERlGRff9gFaXGBzu87tC8rIS1pnTW/FwBFLM5mbnHjypM.O', false); -- pw: bz
INSERT INTO Users VALUES (1, 'robinhöntsch',         'Robin',    'Höntsch',      'student', '$2a$10$W22aWrgmstgOCbea27V3lOyRPzXGtjeKzKvInjVIn2I.GNeT10OVG', false); -- pw: rh
INSERT INTO Users VALUES (2, 'gertrudzimmermann',    'Gertrud',  'Zimmermann',   'teacher', '$2a$10$BJRf//mOiq1cM8zPKbl2a.53HHxbgrq7zhTTE74BkgL3ZNw/5n4oK', false); -- pw: gz
INSERT INTO Users VALUES (3, 'erwinbock',            'Erwin',    'Bock',         'teacher', '$2a$10$FVyxN/0y0ROdc/HfDw2eJeVwU0lkz9XZMSwhqaKGowxbgwLXohGlS', false); -- pw: eb
INSERT INTO Users VALUES (4, 'kevinmorgenthaler',    'Kevin',    'Morgenthaler', 'student', '$2a$10$YlIvmp.zt5u4Q4q2DLc0SOXyavp9uc868MMfuzUyjyWiahg.BqEVy', false); -- pw: km
INSERT INTO Users VALUES (5, 'florianlemnitzer',     'Florian',  'Lemnitzer',    'student', '$2a$10$18Dv0Fvkcvsvk.OTj/oBLezNGw.aoNqDDRDk8x8kQ/Bc95szp6FwK', false); -- pw: fl
INSERT INTO Users VALUES (6, 'florianlemnitzer2',    'Flori',    'Anlemnitzer',  'admin',   '$2a$10$LR/OAMvn1CRivJDWIiL6fOdLqPdd/Sbpzvp1SWw16rFng793EQ/PW', false); -- pw: fa
INSERT INTO Users VALUES (7, 'sebastianbach',        'Sebastian','Bach',         'student', '$2a$10$flu1kHhcQgibMNUp3lILFuc/2pic4c/qw7t3tdyni8FFALFimU.3K', false); -- pw: sb

-- INSERT INTO Subjects VALUES (Id, Name, Deactivated);
INSERT INTO Subjects VALUES (0, 'Deutsch', false);
INSERT INTO Subjects VALUES (1, 'Mathe', false);
INSERT INTO Subjects VALUES (2, 'Englisch', false);
INSERT INTO Subjects VALUES (3, 'Wirtschaft', false);

-- INSERT INTO Courses VALUES (Id, SubjectId, Year);
INSERT INTO Courses VALUES (0, 0, 2019); -- Deutsch19
INSERT INTO Courses VALUES (1, 1, 2019); -- Mathe19
INSERT INTO Courses VALUES (2, 1, 2020); -- Mathe20
INSERT INTO Courses VALUES (3, 2, 2019); -- Englisch19
INSERT INTO Courses VALUES (4, 2, 2020); -- Englisch20
INSERT INTO Courses VALUES (5, 3, 2019); -- Wirtschaft19
INSERT INTO Courses VALUES (6, 3, 2020); -- Wirtschaft20

-- INSERT INTO Tasks VALUES (Id, Title, Description, Date, CourseId, Graded);
INSERT INTO Tasks VALUES (0, 'Diktat',                       'Ich lese euch etwas vor und ihr schreibt das auf.',                                                                        '2021-07-09T11:30:00.000Z', 0, 1); -- Deutsch19 (graded)
INSERT INTO Tasks VALUES (1, 'HA Kurvendiskussion',          'Bitte erledigt die Aufgaben 3 und 4 auf Seite 122.',                                                                       '2021-05-22T09:00:00.000Z', 2, 0); -- Mathe20 (not graded)
INSERT INTO Tasks VALUES (2, 'Klausur e-Funktionenscharen',  'Bereitet euch gut auf diese Klausur vor. Sie zählt 50% der Zeugnisnote! Besonders Buch S. 120-126 können euch helfen.',    '2021-07-17T12:00:00.000Z', 2, 1); -- Mathe20 (graded)
INSERT INTO Tasks VALUES (3, 'Vokabeltest',                  'Vokabeln Lektion 1',                                                                                                       '2020-09-14T08:30:00.000Z', 4, 1); -- Englisch20 (graded)
INSERT INTO Tasks VALUES (4, 'Grammatiktest',                'Going to future und past perfect progressive',                                                                             '2020-09-29T08:30:00.000Z', 4, 1); -- Englisch20 (graded)
INSERT INTO Tasks VALUES (5, 'Test Grundlagen BWL',          'Unternehmensformen, CSR, Magisches Viereck',                                                                               '2020-10-20T08:30:00.000Z', 6, 1); -- Wirtschaft20 (graded)
INSERT INTO Tasks VALUES (6, 'Test Marktgleichgewicht',      'Gleichgewichtspreis, Gesamtwohlfahrt, Marktformen',                                                                        '2020-11-03T08:30:00.000Z', 6, 1); -- Wirtschaft20 (graded)

-- INSERT INTO IsIn VALUES (Id, UserId, CourseId);
INSERT INTO IsIn VALUES (0, 0, 0); -- Benito in Deutsch19
INSERT INTO IsIn VALUES (1, 0, 1); -- Benito in Mathe19
INSERT INTO IsIn VALUES (2, 1, 0); -- Robin in Deutsch19
INSERT INTO IsIn VALUES (3, 4, 1); -- Kevin in Mathe19
INSERT INTO IsIn VALUES (4, 5, 1); -- Florian in Mathe19
INSERT INTO IsIn VALUES (6, 7, 2); -- Sebastian in Mathe20
INSERT INTO IsIn VALUES (7, 2, 0); -- Gertrud in Deutsch19
INSERT INTO IsIn VALUES (9, 3, 2); -- Erwin in Mathe20
INSERT INTO IsIn VALUES (10, 3, 4); -- Erwin in Englisch20
INSERT INTO IsIn VALUES (11, 3, 6); -- Erwin in Wirtschaft20
INSERT INTO IsIn VALUES (12, 0, 2); -- Benito in Mathe20
INSERT INTO IsIn VALUES (13, 0, 4); -- Benito in Englisch20
INSERT INTO IsIn VALUES (14, 0, 6); -- Benito in Wirtschaft20
INSERT INTO IsIn VALUES (15, 1, 2); -- Robin in Mathe20
INSERT INTO IsIn VALUES (16, 1, 4); -- Robin in Englisch20
INSERT INTO IsIn VALUES (17, 1, 6); -- Robin in Wirtschaft20
INSERT INTO IsIn VALUES (18, 5, 2); -- Florian in Mathe20
INSERT INTO IsIn VALUES (19, 5, 4); -- Florian in Englisch20
INSERT INTO IsIn VALUES (20, 5, 6); -- Florian in Wirtschaft20

-- INSERT INTO HasEvaluation VALUES (Id, UserId, TaskId, Grade, Annotation);
INSERT INTO HasEvaluation VALUES (0, 0, 3, 4, 'Ach komm, Benito, du kannst keine deutschen Vokabeln?'); -- Benito hat im Deutsch19 Vokabeltest eine 4
INSERT INTO HasEvaluation VALUES (1, 0, 2, 5, 'Du warst schon immer ne null'); -- Benito hat im Mathe19 E-Funktionsscharenklausur eine 5
INSERT INTO HasEvaluation VALUES (2, 5, 3, 2, 'An das "to" vor Verben denken!'); -- Florian hat im Englisch20 eine 2
INSERT INTO HasEvaluation VALUES (3, 5, 4, 4, 'Past perfect progressive dringen nochmal anschauen.'); -- Florian hat im Englisch20 eine 4
INSERT INTO HasEvaluation VALUES (4, 5, 5, 1, 'Sehr präzise Darstellung der Unternehmensformen, gut gemacht!'); -- Florian hat im Wirtschaft20 eine 1
