import React from 'react';
import { Text } from 'react-native';
import {useTranslation} from 'react-i18next';


const TranslatedText = (props) => {

const{t} = useTranslation();

    return (
        <Text style={props.style}>{t(props.text)}</Text>
    )
}

export default TranslatedText;