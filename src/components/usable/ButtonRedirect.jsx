// ButtonRedirect permet une redirection qui ne nécessite pas d'exécuter une requête au click.

import React from "react";
import styles from "../../style/ButtonStyle"
import {Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';


export default function Button({buttonLabel, route}) {
    const navigation = useNavigation();
    
    if (route == 'AreaChoiceScreen') {
    return(
        <View>
            <TouchableOpacity onPress={() => navigation.navigate(`${route}`)}     // Redirection vers une autre route au click
                style={styles.homeScreenButton}>
            <Text style={styles.homeScreenButtonText}>{buttonLabel}</Text>
            </TouchableOpacity>
        </View>
        
    )
    } else {
        return(
            <View>
                <TouchableOpacity onPress={() => navigation.navigate(`${route}`)}     // Redirection vers une autre route au click
                    style={styles.button}>
                <Text style={styles.button_text}>{buttonLabel}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}