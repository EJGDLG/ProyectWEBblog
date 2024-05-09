import React, { useState, useEffect } from 'react';
import './App.css';
import Header from '../components/Header';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Register from './Register';
import blog from './blog';

// Custom Input Component
const Input = ({ type, placeholder, value, onChange }) => (
  <input type={type} placeholder={placeholder} value={value} onChange={onChange} />
);

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRegisterView, setShowRegisterView] = useState(false);

 useEffect(() => {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    if (container && registerBtn && loginBtn) {
        const handleRegisterClick = () => {
            container.classList.add("active");
        };

        const handleLoginClick = () => {
            container.classList.remove("active");
        };

        registerBtn.addEventListener('click', handleRegisterClick);
        loginBtn.addEventListener('click', handleLoginClick);

        // Cleanup
        return () => {
            registerBtn.removeEventListener('click', handleRegisterClick);
            loginBtn.removeEventListener('click', handleLoginClick);
        };
    }
}, []);


const handleLogin = async (event) => {
  event.preventDefault();
  console.log("Attempting to login with:", { email, password });

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Login Successful:', data);
    alert('Login Successful!');
  } catch (error) {
    console.error('Login error:', error);
    alert(`Login failed: ${error.message}`);
  }
};


  // Alternar entre la vista de inicio de sesión y registro
  const toggleView = () => {
    setShowRegisterView(!showRegisterView);
  };

  return (
    <div>
      <Header title={showRegisterView ? "Registro" : "Iniciar Sesión"} />
      <div className='container' id='container'>
        {showRegisterView ? (
          // Vista de registro
          <Register />
        ) : (
          // Vista de inicio de sesión
          <div className='form-container sign-in'>
            <form onSubmit={handleLogin}>
              <span id='Loginsuggestions'>Usa tu correo electrónico y contraseña para iniciar sesión</span>
              <Input type="email" placeholder="Correo Electrónico" value={email} onChange={e => setEmail(e.target.value)} />
              <Input type="password" placeholder="Ingresa tu contraseña" value={password} onChange={e => setPassword(e.target.value)} />
              <button>Iniciar sesion</button>
              <button onClick={toggleView} className="toggle-view">Registrarse</button>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;


