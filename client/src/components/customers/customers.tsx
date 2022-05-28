import { useState, useEffect } from 'react';


function Customers() {
  const [customers, setCusotmers] = useState([])

  useEffect(()=> {

    fetch('/api/v1/users')
    .then(res => res.json())
    .then(data => console.log(data))

  }, [])

  return (
    <div >
    <h2>Customers</h2>
    <ul>
      {customers.map(customer => <li key={customer.first_name}>{customer.first_name}</li>)}
    </ul>
  </div>
  )
  
}

export default Customers;
