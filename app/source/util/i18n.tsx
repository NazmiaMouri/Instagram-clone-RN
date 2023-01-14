import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import bn from '../../assets/language_json/bn.json';


i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {
        bn: bn,

    },
    interpolation: {
        escapeValue: false // react already safes from xss
    }
});

export default i18n;
