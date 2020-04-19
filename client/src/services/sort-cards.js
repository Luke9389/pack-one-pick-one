export default function sortCards(cardArr, sortBy, dir) {

  cardArr.sort(compare(sortBy, dir));

  return cardArr;
}

function compare(key, dir = 'asc') {
  return function innerSort(a, b) {
    let comparison = 0;
    if(a[key] > b[key]) {
      comparison = 1;
    } else if(a[key] < b[key]) {
      comparison = -1;
    }
    return (
      (dir === 'desc') ? (comparison * -1) : comparison
    );
  };

}
