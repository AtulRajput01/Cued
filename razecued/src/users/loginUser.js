import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Input validation
      if (!username || !password) {
        throw new Error('Username and password are required.');
      }

      // Sign in using AWS Amplify Auth
      await Auth.signIn(username, password);
      // Handle successful login (e.g., redirect the user)
      // Example: history.push('/dashboard');
    } catch (error) {
      // Handle specific error types
      if (error.code === 'UserNotConfirmedException') {
        setError('Account not confirmed. Please check your email for a confirmation link.');
      } else if (error.code === 'NotAuthorizedException') {
        setError('Invalid username or password. Please try again.');
      } else {
        setError('An error occurred during login.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p>
        <a href="/forgot-password">Forgot Password?</a>
      </p>
    </div>
  );
}

export default Login;
