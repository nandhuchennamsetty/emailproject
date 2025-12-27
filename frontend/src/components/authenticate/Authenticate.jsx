import { useState } from 'react';
import './Authenticate.css';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Authenticate = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const resetForm = () => {
    setForm({ name: '', email: '', password: '' });
    setError('');
  };

  const handleChange = (e) => {
    setError(''); // clear error while typing
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleToggle = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  const handleSubmit = async () => {
    setError('');

    if (!form.email || !form.password || (!isLogin && !form.name)) {
      setError('All fields are required');
      return;
    }

    try {
      setLoading(true);

      if (isLogin) {
        const res = await api.post('/auth/login', {
          email: form.email,
          password: form.password,
        });

        localStorage.setItem('token', res.data.token);
        navigate('/', { replace: true });
      } else {
        await api.post('/auth/register', {
          username: form.name,
          email: form.email,
          password: form.password,
        });

        setIsLogin(true);
        resetForm();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='auth-container'>
      <div className='auth-card'>
        <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        <p className='auth-subtitle'>
          {isLogin
            ? 'Login to manage templates & send emails'
            : 'Register to start sending bulk emails'}
        </p>

        {!isLogin && (
          <input
            type='text'
            name='name'
            placeholder='Full Name'
            value={form.name}
            onChange={handleChange}
          />
        )}

        <input
          type='email'
          name='email'
          placeholder='Email Address'
          value={form.email}
          onChange={handleChange}
        />

        <input
          type='password'
          name='password'
          placeholder='Password'
          value={form.password}
          onChange={handleChange}
        />

        {error && <p className='error-message'>{error}</p>}

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
        </button>

        <p className='auth-toggle'>
          {isLogin ? 'New user?' : 'Already have an account?'}
          <span onClick={handleToggle}>{isLogin ? ' Register' : ' Login'}</span>
        </p>
      </div>
    </div>
  );
};

export default Authenticate;
