/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {

  constructor(rows) {
    this.rows = rows;

    this._buildTable();
    this._fillTableRows();
    this._subscribeButtons();
  }

  _tableContainer;
  _rowTemplate;

  get elem() {
    return this._tableContainer;
  }

  _buildTable = function () {

    let tableContainer = document.createElement('table');
    tableContainer.insertAdjacentHTML("afterbegin", `<table>
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>
      <tbody>  
      </tbody>
    </table>`);

    this._tableContainer = tableContainer;

    let tr = document.createElement('tr');
    tr.insertAdjacentHTML("afterbegin", `
      <td></td>
      <td></td>
      <td></td> 
      <td></td>
      <td><button> X </button></td >
    `)

    this._rowTemplate = tr;
  }

  _fillTableRows = function () {

    for (const row of this.rows) {
      let newRow = this._rowTemplate.cloneNode(true);

      Object.values(row).forEach((value, index) => {
        newRow.querySelectorAll('td')[index].innerText = value;
      });

      this._tableContainer.querySelector('tbody').append(newRow);

    };
  }

  _subscribeButtons = function () {
    let buttons = this._tableContainer.querySelectorAll('button');

    buttons.forEach((b) => {
      b.addEventListener('click', function () {
        this.parentElement.parentElement.remove();
      });
    });

  }
}
