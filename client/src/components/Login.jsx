import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
//   const history = useHistory();

  const handleLogin = () => {
    // Implement login logic here using axios or fetch
    // If login is successful, navigate to DisplayBooks
    // history.push('/display-books');
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
