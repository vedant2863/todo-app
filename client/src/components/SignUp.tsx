import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser, selectAuth } from '../features/auth/authSlice';

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector(selectAuth);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signupUser(username, email, password));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      {status === 'failed' && <p>{error}</p>}
      <div>
        <label>Username</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
