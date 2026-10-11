import logo from '../../assets/icons/logo.svg';
import styles from './styled.module.scss';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.brand}>
                    <img className={styles.logo} src={logo} alt="logotype" />
                    <span className={styles.brandName}>
                        Interview Trainer
                    </span>
                </div>

                <nav
                    className={styles.navigation}
                    aria-label="Основная навигация"
                >
                    <span className={styles.activeItem}>Новое интервью</span>
                    <span className={styles.navigationItem}>История</span>
                </nav>

                <span className={styles.profile}>ЕТ</span>
            </div>
        </header>
    );
};

export default Header;
