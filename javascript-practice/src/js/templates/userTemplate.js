import editIcon from '../../assets/icons/arrow-circle-down.svg';
import deleteIcon from '../../assets/icons/arrow-circle-down-copy.svg';
import { MONTH_NAMES} from '../constants/month';
import { PRIMARY_ROLES, ROLES } from '../constants/role';

const generateTableRowHTML = (item) => {
  const role = item.role.toLowerCase();
  const roleClass = PRIMARY_ROLES.includes(role) ? 'primary-role' : 'secondary-role';

  const addedDate = new Date(item.addedDate);
  const day = addedDate.getDate().toString().padStart(2, '0');
  const month = MONTH_NAMES[addedDate.getMonth()];
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
          <img src="${editIcon}" alt="Edit" />
        </div>
        <div class="table-data-icon list-user-table-icon">
          <img src="${deleteIcon}" alt="Delete" />
        </div>
      </td>
    </tr>
  `;
};

const generateTableHTML = (data) => {
  const tableRowsHTML = data.map(generateTableRowHTML).join('');
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
