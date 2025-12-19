import React , {Suspense} from 'react';
import styles from './Translater.module.css';
import useTranslation from 'react-i18next';
import './i18next';
import { Suspense } from 'react';

function Translater() {

    const {t,i18next} = useTranslation();

    const changeLanguage = (language) => {
        i18next.changeLanguage(language);
    }
  return (
        <Suspense fallback="Loading.....">
            <div>
                <h1>{t ('Welcome')}</h1>
                <p>{t ('Description')}</p>
                <button onClick={changeLanguage('english')}>English</button>
                <button onClick={changeLanguage('hindi')}>Hindi</button>
                <button onClick={changeLanguage('marathi')}>Marathi</button>
            </div>
        </Suspense>
  )
}

export default Translater