function namify(users) {
  let resultArray = [];
  for (let user of users) {
    resultArray.push(user.name)
  }
  return resultArray;
}
