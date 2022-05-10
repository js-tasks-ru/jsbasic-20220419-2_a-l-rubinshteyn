function makeFriendsList(friends) {
  let ul = document.createElement('ul');

  for (let person of friends) {
    let li = document.createElement('li');
    li.innerHTML = `${person.firstName} ${person.lastName}`;
    ul.append(li);
  }

  return ul;
}
