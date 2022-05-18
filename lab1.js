// Wyświetl wszystkie dane na temat wszystkich klientów.
db.klienci.find();

// Wyświetl wszystkie dane na temat klientów o naziwsku "Kowalski".
db.klienci.find({ nazwisko: 'Kowalski' });

// Wyświetl wszystkich klientów których nrDomu są większe niż 30, a mniejsze niż 70.
db.klienci.find({ 'adresZamieszkania.nrDomu': { $gt: 30, $lt: 70 } });

// Wyświetl klientów których e-mail rozpoczyna się na literę „N”.
db.klienci.find({ eMail: /^N/ });

// Wyświetl klientów których imię to „Adam” bez względu na wielkość liter.
db.klienci.find({ imie: /^adam/i });

// Wyświetl klientów których adres e-mail kończy się na „com”.
db.klienci.find({ eMail: /com$/ });

// Wyświetl pokoje w których możliwa jest dostawka.
db.pokoje.find({ dostawka: 'T' });

// Wyświetl identyfikatory zakwaterowania, daty zakwaterowania i wykwaterowania.
db.zakwaterowanie.find(
  {},
  { _id: 1, dataZakwaterowania: 1, dataWykwaterowania: 1 }
);

// Wyświetl wszystkie informacje na temat pokoi z piętra drugiego w których liczba miejsc jest równa 1 i istnieje możliwość dostawki.
db.pokoje.find({ pietro: 2, liczbaMiejsc: 1, dostawka: 'T' });

// Wyświetl klientów których imiona to: „Adam”, „Marta”, „Beata”.
db.klienci.find({ imie: { $in: ['Adam', 'Marta', 'Beata'] } });

// Wyświetl imiona i nazwiska klientów których imiona są inne niż: „Adam”, „Marta”, „Beata” zaś wyniki posortuj po nazwiskach w kolejności alfabetycznej.
db.klienci
  .find(
    { imie: { $nin: ['Adam', 'Marta', 'Beata'] } },
    { imie: 1, nazwisko: 1 }
  )
  .sort({ nazwisko: 1 });

// Wyświetl nazwiska, imiona i identyfikatory klientów wyniki posortuj po nazwiskach w kolejności alfabetycznej, następnie po imionach w kolejności odwrotnej.
db.klienci
  .find({}, { nazwisko: 1, imie: 1, _id: 1 })
  .sort({ nazwisko: 1 })
  .sort({ imie: -1 });

// Wyświetl wszystkie informacje z kolekcji zakwaterowanie, ktorych koszt istnieje i posortuj wyniki po koszcie malejąco.
db.zakwaterowanie
  .find({}, { koszt: { $exists: true } }, { koszt: 1 })
  .sort({ koszt: -1 });

// Wyświetl pokoje, które posiadają możliwość dodania jednej dostawki and których cena dostawki za dobę jest większa od 50.
db.pokoje.find({
  cenaZaDostawke: {
    $elemMatch: { liczbaDostawek: 1, cenaZaDobe: { $gt: 50 } },
  },
});

// Wyświetl numery pokoi które posiadają dostawki i koszt za dobę jest większy od 300 wyniki posortuj od najbardziej do najmniej kosztownego.
db.pokoje
  .find(
    { dostawka: 'T', cenaZaDobe: { $gt: 300 } },
    { idPokoju: 1, cenaZaDobe: 1 }
  )
  .sort({ cenaZaDobe: -1 });

// Wyświetl wszystkich klientów którzy mieszkają w domu w Warszawie przy ulicy Polnej.
db.klienci.find({
  'adresZamieszkania.miejscowosc': 'Warszawa',
  'adresZamieszkania.ulica': 'Polna',
});
