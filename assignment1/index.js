// # Self Assignment #1 - Tree

// > ### Write a `tree()` function, which takes a `name-items` hierarchical object as an argument and outputs a tree structured data to console.

// ```json
// {
//   "name": 1,
//   "items": [{
//     "name": 2,
//     "items": [{ "name": 3 }, { "name": 4 }]
//   }, {
//     "name": 5,
//     "items": [{ "name": 6 }]
//   }]
// }
// ```

// ```bash
// 1
// ├── 2
// │   └── 3
// │   └── 4
// └── 5
//     └── 6
// ```

// ---

const makeSpacesString = (level) => {
  let res = "";

  while (level-- > 0) {
    res += " ";
  }

  return res + "│";
};

const tree = (item, level = 0) => {
  makeSpacesString(level);
  console.log(makeSpacesString(level) + item.name);
  console.log(makeSpacesString(level) + "-");
  item.items?.forEach((internalItem) => {
    tree(internalItem, level + 1);
  });
};

tree({
  name: 1,
  items: [
    {
      name: 2,
      items: [{ name: 3 }, { name: 4 }],
    },
    {
      name: 5,
      items: [{ name: 6 }],
    },
  ],
});

module.exports = tree;
