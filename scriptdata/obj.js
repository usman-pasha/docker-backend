let data = {};
let array = [
  { name: "usman", age: 20, isActive: true },
  { name: "SIRAJ", age: 20, isActive: false },
  { name: "NOOR", age: 18, isActive: true },
];

array = array.filter((i) => i.isActive === false && i.age === 20);

for (const a of array) {
  data.owner = a.name;
  console.log(data.owner);
  if (typeof data.owner.length === "number" && data.owner.length === 5) {
    data.active = a.isActive;
    data.objectData = "filtering";
    data[a.name] = "hsj";
  }
}

console.log(data);

// Movie Ticket
// 1. Movie Name
//    ["Rolex","Leo","Vel","Ruju Bhai","24"]
// 2. there are total 5 movies i want to ticket for one movie Name[Rolex]
// 3. Seat
// 1.Front 2.Back 3.corner
// 4. Price {coin}
// 1.Front[250] 2.Back[300] 3.corner[350]
// there are 3 things
// Juice 1.small[99] 2.Regular[149] 3.Large[299]
// popcorn 1.small[199] 2.Regular[249] 3.Large[399]
// combo[juice+popcorn] Juice 1.small[249] 2.Regular[349] 3.Large[599]

// User
// 2 types of coins
// 1. CODASHOP
// 2. UNIPIN
// 1.codashop
// user default purse amount 3000 CODASHOP Coins
// 2.unipin
// user default purse amount 2000 CODASHOP Coins
