import React from 'react';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="blue-bar mb-5 w-100 rounded position-relative">
      <div className="container d-flex align-items-center justify-content-center text-center flex-column">
        <h2>{t("zubiri")} <span>{t("span")}</span> {t("since")}</h2>
        <div className="metrics d-none m-3 d-md-flex">
          <div className="metric-item me-3">
            <i className="green-dot">●</i> {t('original_recipes')}
          </div>
          <div className="metric-item me-3">
            <i className="red-dot">●</i> {t('ratings_reviews')}
          </div>
          <div className="metric-item">
            <i className="gold-dot">●</i> {t('home_cooks')}
          </div>
        </div>
      </div>

      {/*Dropdown for desktop and tables users*/}
      <div className="dropdown-container position-absolute p-3 d-none d-md-block top-0 end-0">
        <div className="dropdown">
          <button
            className="btn dropdown-toggle btn-lg px-3 py-2"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            style={{ backgroundColor: '#FFBD59', fontSize: '1.2rem' }}>
            {t('language')}
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li>
              <a className="dropdown-item" href="#" onClick={() => handleLanguageChange('en')}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img style={{ width: '30px', height: '20px' }} src="img/flags/usa.png" alt="English flag" />
                </div>
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#" onClick={() => handleLanguageChange('eu')}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img style={{ width: '30px', height: '20px' }} src="img/flags/basque.png" alt="Basque flag" />
                </div>
              </a>
            </li>
          </div>
        </div>
      </div>

      {/*Dropdown for mobiles users*/}
      <div className="dropdown-container d-flex justify-content-center mt-4 d-md-none">
        <div className="dropdown w-50 text-center">
          <button
            className="btn dropdown-toggle w-20"
            type="button"
            id="dropdownMenuButtonMobile"
            data-bs-toggle="dropdown"
            style={{ backgroundColor: '#FFBD59'}}>
            {t('language')}
          </button>
          <ul className="dropdown-menu text-center" aria-labelledby="dropdownMenuButtonMobile">
          <li>
              <a className="dropdown-item" href="#" onClick={() => handleLanguageChange('en')}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img style={{ width: '30px', height: '20px' }} src="/img/flags/usa.png" alt="English flag" />
                </div>
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#" onClick={() => handleLanguageChange('es')}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img style={{ width: '30px', height: '20px' }} src="/img/flags/basque.png" alt="Basque flag" />
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/*Custon CSS for mobile mode*/}
      <style jsx>{`
        @media (max-width: 576px) {
          .dropdown-container {
            margin-top: 2rem; /* Espacio debajo del header */
          }
          
          .btn.dropdown-toggle {
            width: 80%; /* Botón más grande en móvil */
          }
        }`}
      </style>
    </div>
  );
};

export default Header;