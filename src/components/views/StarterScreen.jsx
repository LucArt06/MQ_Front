// Ecran qui permet à l'utilisateur de se connecter ou de s'enregistrer

import React from "react";
import logo from "../../assets/logo.png";
import styles from "../../style/StarterScreenStyle"
import { Image, View } from "react-native";
import Button from "../usable/ButtonRedirect";

export default function StarterScreen() {
    return(
       <View style={styles.container}>
        <Image source={logo} style={styles.logo}/>
            <View style={styles.buttonsContainer}>
               <Button
               buttonLabel="Inscription"
               route="SignUpFormScreen"/>
               <Button
               buttonLabel="Connexion"
               route="LogInFormScreen"/>
            </View>
    </View>
    );
}