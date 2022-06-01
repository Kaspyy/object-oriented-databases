// 1. Zlicz ile jest osób o imieniu „Adam” oraz „Tomasz”.
db.klienci.find({ $or: [{ imie: 'Adam' }, { imie: 'Tomasz' }] }).count();

// 2. Oblicz jaki koszt wynajęcia poniósł każdy z klientów za wynajęcie pokoju.
db.zakwaterowanie.aggregate([
  { $group: { _id: '$idKlienta', koszt: { $sum: '$koszt' } } },
  { $sort: { koszt: -1 } },
]);

// 3. Dla klientów o imionach: „Adam”, „Marta”, „Beata” zlicz ich wystąpienia oraz wyniki posortuj w kolejności od największej do najmniejszej.
db.klienci.aggregate([
  { $match: { imie: { $in: ['Adam', 'Marta', 'Beata'] } } },
  { $group: { _id: '$imie', count: { $sum: 1 } } },
  { $sort: { count: -1 } },
]);

// 4. Za pomocą polecenia insert utwórz  nowego klienta. Sprawdź poprawność wstawionych danych
db.klienci.insertOne({
  idKlienta: 100,
  nazwisko: 'Oplski',
  imie: 'Kamil',
  nrDowodu: 'OP9900222',
  adresZamieszkania: {
    miejscowosc: 'Opole',
    ulica: 'Podkarpacka',
    nrDomu: 44,
    nrMieszkania: 67,
  },
});

// 5. Za pomocą polecenia insert many utwórz nowych klientów. Sprawdź poprawność wstawionych danych.
db.klienci.insertMany([
  {
    idKlienta: 200,
    nazwisko: 'Kaminski',
    imie: 'Teodor',
    nrDowodu: 'KT124546',
    adresZamieszkania: {
      miejscowosc: 'Gdynia',
      ulica: 'Katowicka',
      nrDomu: 89,
    },
  },
  {
    idKlienta: 201,
    nazwisko: 'Tokarczuk',
    imie: 'Eleonora',
    nrDowodu: 'TE4434352',
  },
]);

// 6. Za pomocą polecenia updateOne zaktualizuj eMail = opolK234@o3.pl dla  klienta o id 100.
db.klienci.updateOne(
  { idKlienta: 100 },
  { $set: { eMail: 'opolK234@o3.pl' } },
  { upsert: true }
);

// 7. Zaktualizuj „cenaZaDobe” na 2000 dla pokoi które posiadają dostawkę oraz ich „cenaZaDobe” jest większa lub równa niż 99, a mniejsza od 210.
db.pokoje.updateMany(
  { cenaZaDobe: { $gte: 99, $lt: 210 }, dostawka: 'T' },
  { $set: { cenaZaDobe: 2000 } }
);

// 8. Znajdź klientów których adres e-mail kończy się na „com” i ustaw dla nich właściwość „komercyjny” na 1 (użyj findOneAndUpdate). Wykonaj operację kilkukrotnie.
db.klienci.findOneAndUpdate({ eMail: /com$/ }, { $set: { komercyjny: 1 } });

// 9. Znajdź klientów których adres e-mail kończy się na „com” i ustaw dla nich właściwość „komercyjny” na 1 (użyj findOneAndReplace). Wykonaj operację kilkukrotnie.
db.klienci.findOneAndReplace({ eMail: /com$/ }, { komercyjny: 1 });

// 10. Usuń dokumenty z kolekcji klientów którzy nie mają adresu e-mail.
db.klienci.deleteMany({ eMail: { $exists: false } });

// 11. Utwórz własną kolekcje w bazie danych które będzie zawierać: pole tekstowe, pole będące 3 elementową tablica liczb całkowitych, pole z data.
db.createCollection('mojaKolekcja', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['tekst', 'tablica', 'data'],
      properties: {
        tekst: {
          bsonType: 'string',
          description: 'Tekst',
        },
        tablica: {
          bsonType: 'array',
          description: 'Tablica',
          items: {
            bsonType: 'int',
          },
        },
        data: {
          bsonType: 'date',
        },
      },
    },
  },
});

// 12. Wystaw kilka dokumentów do utworzonej kolekcji. Dostosuj tak wstawiane dane aby były zróżnicowane.
db.mojaKolekcja.insertMany([
  {
    tekst: 'Tekst',
    tablica: [1, 2, 3],
    data: new Date(),
  },
  {
    tekst: 'Tekst2',
    tablica: [4, 5, 6],
    data: new Date(),
  },
  {
    tekst: 'Tekst3',
    tablica: [7, 8, 9],
    data: new Date(),
  },
]);

// 13. Wykorzystując polecenie update many zaktualizuje pole tekstowe ze swojej kolekcji.
db.mojaKolekcja.updateMany(
  { tekst: 'Tekst' },
  { $set: { tekst: 'zaktualizowany tekst' } }
);

// 14. Usuń utworzoną kolekcję.
db.mojaKolekcja.drop();
