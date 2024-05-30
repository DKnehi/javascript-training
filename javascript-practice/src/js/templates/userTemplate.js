import editIcon from '../../assets/icons/arrow-circle-down.svg';
import deleteIcon from '../../assets/icons/arrow-circle-down-copy.svg';

const generateTableRowHTML = (item) => {
  let roleClass = '';

  const role = item.role.trim().toLowerCase();

  if (['supper admin', 'admin', 'hr admin'].includes(role)) {
    roleClass = 'table-primary-role';
  } else {
    roleClass = 'table-secondary-role';
  }

  const addedDate = new Date(item.addedDate);
  const day = addedDate.getDate().toString().padStart(2, '0');
  const monthIndex = addedDate.getMonth();
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const month = monthNames[monthIndex];
  const year = addedDate.getFullYear().toString();
  const formattedDate = `${day} ${month}, ${year}`;

  return `
  <tr class="table-row">
  <td class="table-data table-cell">
    <p class="table-data-name">${item.userName}</p>
    <p class="table-data-email">${item.email}</p>
  </td>
  <td class="table-data-date table-data table-cell">
   ${formattedDate}
  </td>
  <td class="table-data table-cell">
    <div class="table-role-box ${roleClass}">
      <p class="table-data-role">${item.role}</p> 
    </div>
  </td>
  <td class="table-data table-cell">
    <div class="table-data-icon list-user-table-icon">
      <img src= ${editIcon} class="data-icon" alt="" />
    </div>
    <div class="table-data-icon list-user-table-icon">
      <img
        src=${deleteIcon}
        class="data-icon"
        alt=""
      />
    </div>
  </td>
</tr>
  `;
};

const generateTableHTML = (data) => {
  const tableRowsHTML = data.map((item) => generateTableRowHTML(item)).join('');
  return `
    <table class="table-container">
      <caption class="table-caption-box">
        <h2 class="table-caption">List Users</h2>
      </caption>
      <thead>
        <tr class="table-header-row table-row">
          <th class="table-header table-cell">Name</th>
          <th class="table-header table-cell">Create Date</th>
          <th class="table-header table-cell">Role</th>
          <th class="table-header table-cell">Action</th>
        </tr>
      </thead>
      <tbody>
        ${tableRowsHTML}
      </tbody>
    </table>
  `;
};

export { generateTableRowHTML, generateTableHTML };
