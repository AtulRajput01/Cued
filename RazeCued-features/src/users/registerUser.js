import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmationSent, setConfirmationSent] = useState(false);

  const handleRegister = async () => {
    setIsLoading(true);
    setError('');
    setConfirmationSent(false);

    try {
      // Check for password complexity (e.g., at least 8 characters, 1 uppercase, 1 digit)
      if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)) {
        throw new Error('Password must be at least 8 characters long and include at least one uppercase letter and one digit.');
      }

      // Sign up the user
      const signUpResponse = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });

      // Check if email confirmation is required
      if (signUpResponse.userConfirmed === false) {
        setConfirmationSent(true);
      } else {
        // Handle successful registration (e.g., redirect to a confirmation page or auto-login)
        // Replace the following line with desired logic
        console.log('Registration successful');
      }
    } catch (error) {
      setError(error.message || 'An error occurred during registration.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registration-form">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      {confirmationSent && <p className="success">A confirmation code has been sent to your email. Please check your inbox.</p>}
      <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default Register;
