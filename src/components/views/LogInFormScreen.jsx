// Ecran de connexion du joueur

import React from "react";
import { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "../../style/LogInFormStyle";
import inputStyle from "../../style/InputStyle";
import InputWithLabel from "../usable/InputWithLabel";
import ButtonRequest from "../usable/ButtonRequest";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ipConfig from "../../../IpConfig";

// Nécessite un email et un mot de passe valide pour pouvoir accéder au jeu
export default function LogIn(navigator) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Gestion des erreurs de mdp et email
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    const [data, setData] = useState({});

    const loginData = async () => {
        try {
            const response = await fetch(`${ipConfig}/api/login`, {
            // Pour se connecter, ne pas oublier php artisan serve  --host 172.20.10.7  
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  email: email,
                  password: password,
                })
              });;
            const json = await response.json();
            setData(json);

            if (json.status_code == 200) {
              // Le stockage des informations suivantes permet à un utilisateur de rester connecter meme s'il quitte le jeu
              await AsyncStorage.setItem('access_token', json.access_token); // On stock en localstorage le Bearer Token
              await AsyncStorage.setItem('email', email); // On stock l'email de l'utilisateur en localstorage
              navigator.navigation.navigate('IntroScreen'); // Redirection sur l'IntroScreen s'il s'agit d'un nouveau joueur
            } 
            else {
              setErrorEmail(json.email);
              setErrorPassword(json.password);
            }  
           } catch (error) {
            console.error(error);
           }           
         };  

    return(
      <ScrollView>
        <View style={styles.container}>
            <InputWithLabel 
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="Entrez votre e-mail"
                />
                {/* Affichage d'une erreur si l'email est incorrect */}
                <Text style={inputStyle.error}> {errorEmail && (<Text> {errorEmail}  </Text>)} </Text> 

            <InputWithLabel 
                label="Mot de passe"
                value={password}
                onChangeText={setPassword}
                placeholder="Entrez votre mot de passe"
                secureTextEntry
                />
                {/* Affichage d'une erreur si le mot de passe est incorrect */}
                <Text style={inputStyle.error}> {errorPassword && (<Text> {errorPassword} </Text>)} </Text>

                {/* Utilisation du component ButtonRequest */}
                <ButtonRequest buttonLabel="Connexion" method={loginData}/>   
        </View>
      </ScrollView>
    );
}

