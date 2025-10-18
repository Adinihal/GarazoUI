import { useState, FormEvent, ChangeEvent } from 'react';
import styles from '../styles/LoginPanel.module.css';
import Image from 'next/image';

interface LoginResponse {
  token: string;
  refreshToken: string;
  expiresIn: number;
  user: {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
  };
}

export default function LoginPanel() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      const response = await fetch('http://localhost:5201/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid username or password');
      }
      
      const data: LoginResponse = await response.json();
      
      // Handle successful login
      setSuccess(true);
      
      // Store auth data
      localStorage.setItem('token', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('tokenExpiry', (Date.now() + (data.expiresIn * 1000)).toString());
      localStorage.setItem('user', JSON.stringify(data.user));
      
      console.log('Login successful:', {
        username: data.user.username,
        roles: data.user.roles,
        expiresIn: data.expiresIn
      });
      
      // Redirect to the dashboard screen
      window.location.href = '/dashboard';
      
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Something went wrong');
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className={styles.container}>

       <div className={styles.illustrationContainer}>
          <Image
            src="/assets/leftSide-login-img.png"
            alt="Login Illustration"
            width={650}
            height={800}
            className={styles.illustration}
          />
           <div className={styles.loginform_background}>
            <div className={styles.welcomeSection}>
                <h2 className={styles.welcomeTitle}>Welcome!</h2>
                <h3 className={styles.appTitle}>Bike Masters</h3>
            </div>

            <p className={styles.loginPrompt}>Please enter username & password</p>

            <form className={styles.loginForm} onSubmit={handleLogin}>
                <div className={styles.inputGroup}>
                    <label htmlFor="username" className={styles.inputLabel}>Username</label>
                    <input
                        type="text"
                        id="username"
                        className={styles.inputField}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="password" className={styles.inputLabel}>Password</label>
                    <input
                        type="password"
                        id="password"
                        className={styles.inputField}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <a href="#" className={styles.forgotLink}>Forgot password ?</a>

                <button 
                    type="submit" 
                    className={styles.submitButton}
                    disabled={isLoading}
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>

                {error && (
                    <div className={styles.errorMessage}>
                        {error}
                    </div>
                )}

                {success && (
                    <div className={styles.successMessage}>
                        ✔ Login successful!
                    </div>
                )}
            </form>
        </div>
          
        </div>

        <div className={styles.supportSectionData}>
           <div className={styles.supportSection}>
                <h3 className={styles.supportTitle}>Support</h3>
                <p className={styles.supportText}>Phone or WhatsApp: +919121223601/02</p>
                <p className={styles.supportText}>Email: services@shannon.com</p>
                <p className={styles.copyright}>© 2025 - Shannohi Technologies Private Limited, All Rights Reserved.</p>
            </div>
          
            <div className={styles.appButtons}>
            <Image
              src="/assets/PlayStoreIcon.png"
              alt="Play Store"
              width={120}
              height={40}
              className={styles.appButton}
            />
            <Image
              src="/assets/AppStoreIcon.png"
              alt="App Store"
              width={120}
              height={40}
              className={styles.appButton}
            />
          </div>
        </div>

    </div>
  );
}




