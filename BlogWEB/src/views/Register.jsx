import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Nuevo estado para la confirmación de la contraseña
  const [role, setRole] = useState('student'); // O el valor predeterminado que desees
  const [error, setError] = useState(''); // Estado para manejar los errores de validación

  const handleRegister = async (event) => {
    event.preventDefault();
    
    // Verifica que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return; // No continuar con el registro
    }
    // Si no hay error, limpia el mensaje de error y continúa con el registro
    setError('');
    // Aquí añadirías la lógica para enviar los datos al servidor
    console.log('Registrando', { email, password, role });
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister}>
        <span>Usa tu correo electrónico UVG</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
