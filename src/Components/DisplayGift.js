import axios from "axios";
import React, { Component } from "react";


class Showdata extends Component {
  state = {
  data: []
  }

  

  componentDidMount() {
  axios.get('http://127.0.0.1:8096/show')
    .then(response => {
      this.setState({ data: response.data });
    })
    .catch(error => {
      console.log(error);
    });
}


  render() {   
    return (
        
      <table border={1}>
      <thead>
        <tr>
          <th>Id</th>
          <th>UserName</th>
          <th>Email</th>
          <th>Password</th>
          <th>PhoneNumber</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(user => (
          <tr key={user.id}>
            <td>{user.gid}</td>
            <td>{user.gname}</td>
            <td>{user.gdesc}</td>
            <td>{user.gprice}</td>
          </tr>
        ))}
      </tbody>
    </table>
    );
  }}
  
export default Showdata;