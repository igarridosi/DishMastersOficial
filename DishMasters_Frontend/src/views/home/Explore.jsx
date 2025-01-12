import React from 'react';
import { useTranslation } from 'react-i18next';

const Explore = () => {
  const { t } = useTranslation();

  const exploreItems = [
    {
      title: t('globalFlavors'), // traducido
      imageSrc: 'img/foods/explore/burger.jpg',
      altText: 'Boat on Calm Water'
    },
    {
      title: t('healthyDeliciousRecipes'), // traducido
      imageSrc: 'img/foods/explore/healthy.jpg',
      altText: 'Waves at Sea'
    },
    {
      title: t('perfectPairings'), // traducido
      imageSrc: 'img/foods/explore/wine.jpg',
      altText: 'Mountains in the Clouds'
    },
    {
      title: t('seasonalIngredients'), // traducido
      imageSrc: 'img/foods/explore/seasonal.jpg',
      altText: 'Boat on Calm Water'
    },
    {
      title: t('quickEasyDinners'), // traducido
      imageSrc: 'img/foods/explore/quick.jpg',
      altText: 'Waves at Sea'
    }
  ];

  return (
    <div className="row w-75 mt-5">
      <p className="h1">{t('explore')}</p>

      {/* First Column */}
      <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
        {exploreItems.slice(0, 2).map((item, index) => (
          <div key={index} id="overlay" className='mb-4'>
            <p>{item.title}</p>
            <br />
            <img
              src={item.imageSrc}
              className="w-100 shadow-1-strong rounded"
              alt={item.altText}
            />
          </div>
        ))}
      </div>

      {/* Second Column */}
      <div className="col-lg-4 mb-4 mb-lg-0">
        <div id="overlay" >
          <p>{exploreItems[2].title}</p>
          <img
            src={exploreItems[2].imageSrc}
            className="w-100 shadow-1-strong rounded"
            alt={exploreItems[2].altText}
          />
        </div>
      </div>

      {/* Third Column */}
      <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
        {exploreItems.slice(3).map((item, index) => (
          <div key={index} id="overlay" className='mb-4'>
            <p>{item.title}</p>
            <br />
            <img
              src={item.imageSrc}
              className="w-100 shadow-1-strong rounded"
              alt={item.altText}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;