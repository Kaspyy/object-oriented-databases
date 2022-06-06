// 1. Wyświetl wszystkie informacje na temat pozwanych dla których ulica rozpoczyna się od litery „P” lub „p”.
db.sad.find({
  $or: [
    { 'adresPozwanego.ulica': { $regex: /^p/i } },
    { 'adresPozwanego.ulica': { $regex: /^P/i } },
  ],
});

// 2. Wyświetl imiePozwanego, nazwiskoPozwanego oraz idRozprawy wszystkich pozwanych.
db.sad.find(
  {},
  { _id: 0, imiePozwanego: 1, nazwiskoPozwanego: 1, idRozprawy: 1 }
);

// 3. Wyświetl wszystkie informacje na temat 3 pierwszych pozwanych. Wyniki posortuj po nazwiskach w kolejności alfabetycznej a następnie po idRozprawy w kolejności rosnącej.
db.sad
  .find(
    {},
    {
      _id: 0,
      adresPozwanego: 1,
      dataUrodzeniaPozwanego: 1,
      imiePozwanego: 1,
      nazwiskoPozwanego: 1,
      idRozprawy: 1,
    }
  )
  .sort({ nazwiskoPozwanego: 1, idRozprawy: 1 })
  .limit(3);

// 4. Wyświetl wszystkie informacje na temat pozwanych dla których miejscowosc jest inna niż „Krakow” lub oddzial jest inna niż „Kalisz”.
db.sad.find({
  $or: [
    { 'adresPozwanego.miejscowosc': { $ne: 'Krakow' } },
    { oddzial: { $ne: 'Kalisz' } },
  ],
});

// 5. Wyświetl wszystkie informacje na temat pozwanych których oddzial sądu to „Gdansk” lub „Szczecin” i rok drugiej rozprawy jest równy 2026
db.sad.find({
  $or: [{ oddzial: 'Gdansk' }, { oddzial: 'Szczecin' }],
  'terminRozprawy.drugaRozprawa': {
    $gt: ISODate('2026-01-01T00:00:00.000Z'),
    $lt: ISODate('2026-12-31T23:59:59.999Z'),
  },
});

// 6. Wyświetl idRozprawy oraz termin drugiej rozprawy dla pozwanych którym wyznaczono termin drugiej rozprawy.
db.sad.find(
  { 'terminRozprawy.drugaRozprawa': { $exists: true } },
  { _id: 0, idRozprawy: 1, 'terminRozprawy.drugaRozprawa': 1 }
);

// 7. Wyświetl dataUrodzeniaPozwanego oraz oddzial dla wszystkich pozwanych urodzonych pomiędzy „01-03-1980” a „02-07-2000”. Wyniki posortuj po idRozprawy w kolejności malejącej.
db.sad
  .find(
    {
      dataUrodzeniaPozwanego: {
        $gte: ISODate('1980-03-01T00:00:00.000Z'),
        $lte: ISODate('2000-07-02T00:00:00.000Z'),
      },
    },
    { _id: 0, dataUrodzeniaPozwanego: 1, oddzial: 1 }
  )
  .sort({ idRozprawy: -1 });

// 8. Utwórz następujących pozwanych (operacja ma zostać zrealizowana za pomocą jednego polecenia).
//nazwiskoPozwanego
//
//Tomala
//
//imiePozwanego
//
//Wacław
//
//idRozprawy
//
//678333
//
//dataUrodzeniaPozwanego
//
//02-03-2020
//
//_id
//
//123
//
//nazwiskoPozwanego
//
//Nowak
//
//imiePozwanego
//
//Aleksander
//
//idRozprawy
//
//999999999
//
//dataUrodzeniaPozwanego
//
//12-04-1999
db.sad.insertMany([
  {
    nazwiskoPozwanego: 'Tomala',
    imiePozwanego: 'Wacław',
    idRozprawy: 678333,
    dataUrodzeniaPozwanego: ISODate('2020-03-02T00:00:00.000Z'),
  },
  {
    _id: '123',
    nazwiskoPozwanego: 'Nowak',
    imiePozwanego: 'Aleksander',
    idRozprawy: 999999999,
    dataUrodzeniaPozwanego: ISODate('1999-04-12T00:00:00.000Z'),
  },
]);

// 9. Dla pozwanych których adresPozwanego to ulica „Majora” lub nrDomu to „2” zaktualizuj wyrokZawieszony na „12” miesięcy.
db.sad.updateMany(
  {
    $or: [{ 'adresPozwanego.ulica': 'Majora' }, { 'adresPozwanego.nrDomu': 2 }],
  },
  { $set: { wyrokZawieszony: 12 } }
);

// 10. Znajdź pozwanego którego idRozprawy to „444888” i zastąp jego dane w następujący sposób:
// nazwiskoPoewanego : Kolba
// imiePozwanego : Jan
// idRozprawy : 456790
// dataUrodzeniaPozwanego : 12-12-1998
db.sad.findOneAndReplace(
  { idRozprawy: 444888 },
  {
    nazwiskoPozwanego: 'Kolba',
    imiePozwanego: 'Jan',
    idRozprawy: 456790,
    dataUrodzeniaPozwanego: ISODate('1998-12-12T00:00:00.000Z'),
  }
);

// 11. Policz ilu pozwanym wyznaczono rozprawę w oddzial "Warszawa".
db.sad.countDocuments({ oddzial: 'Warszawa' });

// 12. Usuń pozwanego dla którego kod pocztowy kończy się na „88” i składa się z 9 znaków.
db.sad.deleteOne({
  $and: [
    { 'adresPozwanego.kodPocztowy': { $regex: /88$/ } },
    { 'adresPozwanego.kodPocztowy': { $size: 9 } },
  ],
});

// 13. Wyświetl listę zawierającą nazwy możliwych oddziałów dla pozwanych. Wyniki nie mają zawierać oddziału "Kalisz".
db.sad.distinct('oddzial', { oddzial: { $ne: 'Kalisz' } });

// 14. Wyświetl pozwanych dla których zarzuty to wyłącznie „dewastacja” i „wandalizm”.
db.sad.find({ zarzuty: { $all: ['dewastacja', 'wandalizm'] } });

// 15. Wyświetl idRozprawy, zarzuty oraz nazwiskoPozwanego dla tych pozwanych dla których ilość zarzutów jest równa 3. Pomiń pierwszych 3 pozwanych.
db.sad
  .find(
    { zarzuty: { $size: 3 } },
    { _id: 0, idRozprawy: 1, zarzuty: 1, nazwiskoPozwanego: 1 }
  )
  .skip(3);

// 16. Wyświetl raport o ilości pozwanych posiadających wyznaczoną pierwszą i drugą rozprawę w oddziale "Opole" w 2022 roku. Raport ma zawierać pole oddzial oraz liczbę pozwanych. Wyniki powinny zostać posortowane po nazwie oddziału w kolejności alfabetycznej.
db.sad.aggregate([
  {
    $match: {
      oddzial: 'Opole',
      'terminRozprawy.pierwszaRozprawa': {
        $gte: ISODate('2022-01-01T00:00:00.000Z'),
        $lte: ISODate('2022-12-31T00:00:00.000Z'),
      },
      'terminRozprawy.drugaRozprawa': {
        $gte: ISODate('2022-01-01T00:00:00.000Z'),
        $lte: ISODate('2022-12-31T00:00:00.000Z'),
      },
    },
  },
  { $group: { _id: '$oddzial', count: { $sum: 1 } } },
  { $sort: { _id: 1 } },
]);
