import React from 'react';
import { useTranslation } from 'react-i18next';

const SearchBar = () => {
    const { t } = useTranslation();

    return (
        <div className="container w-100 d-flex justify-content-center align-items-center flex-column" id="index-header">
            <p className="h5">{t('findPerfectDish')}</p> {/* Traducido */}
            <div className="input-group rounded w-50">
                <input type="search" className="form-control rounded" placeholder={t('searchPlaceholder')} aria-label="Search" />
                <button className="input-group-text border-0">
                    <i className="bi bi-search"></i>
                </button>
            </div>
            <div className="container mt-5 d-flex flex-column justify-content-center align-items-center" id="main-heading">
                <h1 className="h5 h1-md">
                    {t('discoverDishes')} <i className="text-white font-sans">{t('dishes')}</i> {t('discoverDishes2')}
                </h1>
            </div>
        </div>
    );
};

export default SearchBar;
