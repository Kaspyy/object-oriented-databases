// 1. Wyświetl klientów których e-mail jest wyrazem w którym na trzecim miejscu znajduje się litera „a” lub „p” zaś pozostałe są dowolne.
db.klienci.find({ eMail: { $regex: /^\S\S[ap].*/ } });
// 2. Wyświetl numery dowodów klientów których adresy e-mail zawierają frazę „o2”.
db.klienci.find({ eMail: { $regex: /o2/i } });
// 3. Wyświetl pokoje które posiadają możliwość dodania jednej dostawki w których cena dostawki za dobę jest większa od 50 ale mniejsza od 80.
db.pokoje.find({
  cenaZaDostawke: {
    $elemMatch: { liczbaDostawek: 1, cenaZaDobe: { $gt: 50, $lt: 80 } },
  },
});
// 4. Wyświetl 3 pierwsze pokoje znajdujące się na drugim piętrze.
db.pokoje.find({ pietro: 2 }).limit(3);
// 5. Wyświetl 4 kolejne pokoje znajdujące się na drugim piętrze pomijając dwa pierwsze.
db.pokoje.find({ pietro: 2 }).skip(2).limit(4);
// 6. Wyświetl numery pięter bez powtórzeń.
db.pokoje.distinct('pietro');
// 7. Wyświetl identyfikator pokoju, liczbę miejsc oraz cenę za dobę pokoi których cena za dobę nie przekracza 200.
db.pokoje.find(
  { cenaZaDobe: { $lt: 200 } },
  { _id: 0, idPokoju: 1, liczbaMiejsc: 1, cenaZaDobe: 1 }
);
// 8. Wyświetl id klienta który został zakwaterowany w dniu 23.02.2022 o godzinie 17:13:03
db.zakwaterowanie.find(
  { dataZakwaterowania: { $eq: ISODate('2022-02-23T17:13:03.000Z') } },
  { _id: 0, idKlienta: 1 }
);
// 9. Wyświetl dane na temat zakwaterowanie w okresie 01-01-2022 do 12-02-2022.
db.zakwaterowanie.find({
  dataZakwaterowania: {
    $gte: ISODate('2022-01-01T00:00:00.000Z'),
    $lte: ISODate('2022-02-12T00:00:00.000Z'),
  },
});
// 10. Wyświetl wszystkie informacje na temat pokoi, których drugi element listy cenaZaDostawke: cena za dobe jest równy 100.
db.pokoje.find({ 'cenaZaDostawke.1.cenaZaDobe': { $eq: 100 } });
// 11. Wyświetl wszystkie informacje na temat pokoi, których pierwszy element listy cenaZaDostawke: cena za dobę zawiera się pomiędzy 20 a 80.
db.pokoje.find({ 'cenaZaDostawke.0.cenaZaDobe': { $gte: 20, $lte: 80 } });
// 12. Wyświetl wszystkie informacje na temat pokoi których pole cenaZaDostawke jest typu „Array”.
db.pokoje.find({ cenaZaDostawke: { $type: 'array' } });
// 13. Wyświetl informacje o pokojach w których liczba miejsc jest podzielna przez 2.
db.pokoje.find({ liczbaMiejsc: { $mod: [2, 0] } });
// 14. Wyświetl informację o pokojach których cenaZaDobe mieści się w zakresie 400 a 1000 wykorzystaj operatory min/max.
db.pokoje
  .find()
  .min({ cenaZaDobe: 400 })
  .max({ cenaZaDobe: 1000 })
  .hint({ cenaZaDobe: 1 });
