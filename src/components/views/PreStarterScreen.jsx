/* 
Ecran qui se charge pour tous les utilisateurs au lancement de l'application.
3 scénarios sont possibles:

- Si présence du Bearertoken mais aucun robot enregistré par l'utilisateur en BDD, redirection sur "IntroScreen" pour pouvoir ensuite choisir son robot
- Si présence du Bearertoken et d'un robot enregistré, redirection sur "HomeScreen" pour que l'utilisateur puisse continuer sa partie
- Si aucune présence de token, redirection sur "StarterScreen" pour permettre à l'utilisateur de s'enregistrer ou de se connecter
 */

import logo from "../../assets/logo.png";
import styles from "../../style/StarterScreenStyle";
import { useEffect, useContext } from "react";
import React, { useState } from "react";
import { Image, View, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ipConfig from "../../../IpConfig";
import { BattleScreenLoadingContext } from "../../lib/BattleScreenLoadingContext";

export default function PreStarterScreen(navigator) {
    const [user, setUser] = useState([]);
    const [token, setToken] = useState("");  
    const {battleScreenLoading} = useContext(BattleScreenLoadingContext);
    
   useEffect(() => {
      // AsyncStorage.clear(); // Permet de reset le localstorage sur mobile
      
            const getUser = async () => {

                try {
                const userEmail = await AsyncStorage.getItem('email');
                const token = await AsyncStorage.getItem('access_token');
                
                if(!token) {
                    navigator.navigation.navigate('StarterScreen');   
                } else {
                    
                    const response = await fetch(
                        `${ipConfig}/api/users/${userEmail}`, {
                            method: 'GET',
                            // mode: 'no-cors',
                            headers: {
                                "Authorization": "Bearer " + await AsyncStorage.getItem('access_token'),
                                Accept: 'application/json',
                                'Content-Type': 'application/json',  
                            },
                        });
                        
                        const json = await response.json();
                        setUser(json[0]);
                        setToken(token);

                    }
                    
                } catch (error) {
                  console.error(error);
                }

              };
   
            getUser();

            if(token && user.first_connexion == 0) {
              navigator.navigation.navigate('IntroScreen');
             
            } else if ( token && user.first_connexion == 1 && battleScreenLoading == true ) {
              navigator.navigation.navigate('BattleScreen');
                
          }
            else if (token && user.first_connexion == 1 && battleScreenLoading == false) {
                navigator.navigation.navigate('HomeScreen');
            } 
           
      }, [token, battleScreenLoading]);

    return(
       <View style={styles.container}>
            <Image source={logo} style={styles.logo}/>
            <ActivityIndicator size="large" color="#61FFF5" />
       </View>
    );
 
}