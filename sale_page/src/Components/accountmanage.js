import React from "react";

function accountmanage(props) {
  if (props.listaccounts === undefined) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th>id</th>
            <th>username</th>
            <th>fullname</th>
            <th>email</th>
            <th>gender</th>
            <th>phone_number</th>
            <th>address</th>
            <th>register_date</th>
          </tr>
        </thead>
        <tbody>{props.listaccounts}</tbody>
      </table>
    </div>
  );
}

export default accountmanage;
