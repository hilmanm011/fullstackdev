const data2 = ['123', '123', '321', '456'];

const filteredData = data2.filter((value, index, array) => {
  return array.indexOf(value) === array.lastIndexOf(value);
});


const data = [
  {
    id: 1,
    name: 'sigit'
  },
  {
    id: 2,
    name: 'sigit'
  },
  {
    id: 3,
    name: 'sigit'
  },
  {
    id: 4,
    name: 'sigit'
  },
  {
    id: 5,
    name: 'sigit'
  },
];


function paginateData(data, limit, page) {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return data.slice(startIndex, endIndex);
}


const currentPage = 1;
const itemsPerPage = 2;
const paginatedData = paginateData(data, itemsPerPage, currentPage);

console.log(paginatedData);