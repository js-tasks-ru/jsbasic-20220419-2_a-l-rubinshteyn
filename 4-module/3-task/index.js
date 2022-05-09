const map = {
  'Name': 0,
  'Age': 1,
  'Gender': 2,
  'Status': 3
}

function highlight(table) {
  for (let index = 1; index < table.rows.length; index++) {

    const row = table.rows[index];

    if (row.cells[map.Status].hasAttribute('data-available')) {
      let available = row.cells[map.Status].dataset.available;
      row.classList.add(available === 'true'  ? 'available' : 'unavailable');
    } else {
      row.hidden = true;
    }

    let gender = row.cells[map.Gender].innerText;
    row.classList.add(gender === 'm' ? 'male' : 'female');

    if (row.cells[map.Age].innerText < 18) {
      row.style.textDecoration = "line-through";
    }
  }
}
