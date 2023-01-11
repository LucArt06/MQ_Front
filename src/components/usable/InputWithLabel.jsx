// InputWithLabel est utilisé pour les formulaires d'inscription et de connexion

import {View, Text, TextInput} from "react-native";
import React from "react";
import styles from "../../style/InputStyle.js";

export default function InputWithLabel({label, placeholder, value, onChangeText, secureTextEntry, onSubmitEditing}) {
    return(
        <View style={styles.inputsView}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            onSubmitEditing={onSubmitEditing}/>
        </View>
    );
}

