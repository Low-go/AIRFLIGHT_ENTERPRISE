import React from 'react';
import '../ComponentsCss/TableArea.css';

const TableArea = () => {
  return (
    <div className="table-area">
      <div className="table-tabs">
        <button className="active">Table</button>
        <button>Charts</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Product (Name/Description)</th>
            <th>SKU / Unique Item ID</th>
            <th>Channel / Location</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Double Chocolate Coo...</td>
            <td>Double_C123_Wa</td>
            <td>Walmart</td>
            <td>359.0</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default TableArea;