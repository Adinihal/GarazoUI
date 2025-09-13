import styles from '../styles/LoginPanel.module.css';
import Image from 'next/image';

export default function LoginPanel() {
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

            <form className={styles.loginForm}>
                <div className={styles.inputGroup}>
                    <label htmlFor="username" className={styles.inputLabel}>Username</label>
                    <input
                        type="text"
                        id="username"
                        className={styles.inputField}
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="password" className={styles.inputLabel}>Password</label>
                    <input
                        type="password"
                        id="password"
                        className={styles.inputField}
                        required
                    />
                </div>

                <a href="#" className={styles.forgotLink}>Forgot password ?</a>

                <button type="submit" className={styles.submitButton}>Submit</button>
            </form>

            {/* Success message - hidden by default */}
            <div className={styles.successMessage}>✔ Success!</div>
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




