function showSalary(users, age) {

  let resultString = '';

  users.forEach(user => {
    if (user.age <= age) {
      resultString += `${user.name}, ${user.balance}\n`;
    }
  });

  return resultString.trim();
}

