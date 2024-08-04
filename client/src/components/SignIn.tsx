import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signinUser, selectAuth } from '../features/auth/authSlice';

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector(selectAuth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signinUser(email, password));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      {status === 'failed' && <p>{error}</p>}
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignIn;
