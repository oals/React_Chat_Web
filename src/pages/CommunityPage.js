import React from 'react';

const CommunityPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-start min-vh-100 pt-5 bg-light">
      <div className="w-75">
        <table className="table table-bordered table-hover bg-white shadow">
          <thead >
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>John</td>
              <td>Doe</td>
              <td>@social</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommunityPage;