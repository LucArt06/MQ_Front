// Menu principal du jeu, le joueur aura accès à tous les menus depuis cet écran

import logo from "../../assets/logo.png";
import { View, Image, Text} from "react-native";
import { useEffect, useContext } from "react";
import React, { useState } from "react";
import styles from "../../style/HomeScreenStyle";
import ipConfig from "../../../IpConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from "../usable/ButtonRedirect";
import { MainRobotContext } from "../../lib/MainRobotContext";


export default function HomeScreen({navigation}) {
    const [user, setUser] = useState([]);

    // On utilise le context pour stocker la valeur de mainRobot
    const {setMainRobot} = useContext(MainRobotContext);

    // Utilisation du context pour récupérer la valeur mainRobot
    const {mainRobot} = useContext(MainRobotContext);
    
    const [stamina, setStamina] = useState([]);


    // Récupération des infos de l'utilisateur via son email pour récupérer par la suite son robot 
    useEffect(() => {
              const getUser = async () => {
                  try {
                  const userEmail = await AsyncStorage.getItem('email');
                  const response = await fetch(
                      `${ipConfig}/api/users/${userEmail}`, {
                          method: 'GET',
                          headers: {
                            "Authorization": "Bearer " + await AsyncStorage.getItem('access_token'),
                            Accept: 'application/json',
                            'Content-Type': 'application/json',  
                            },
                        });
                          
                        const json = await response.json();
                        setUser(json[0]);  
                        console.log("get user", json);
                  } catch (error) {
                    console.error(error);
                  }
                };
              getUser();

              // Récupération du robot principal du joueur pour afficher sa carte sur le menu d'accueil
              const getMainRobot = async () => {
                try {
                    const response = await fetch(
                        `${ipConfig}/api/mainrobot`, {
                            method: 'GET',
                            headers: {
                                "Authorization": "Bearer " + await AsyncStorage.getItem('access_token'),
                                Accept: 'application/json',
                                'Content-Type': 'application/json',  
                            },
                        });
                        
                        const json = await response.json();
                        console.log("getmainrobot", json[0].current_stam);
                        setMainRobot(json[0]);
                        
                } catch (error) {
                  console.error(error);
                }
              };
            getMainRobot();

            // Test Stamina
            const getStamina = async () => {
              try {
                  const response = await fetch(
                      `${ipConfig}/api/increasestamina`, {
                          method: 'GET',
                          headers: {
                              "Authorization": "Bearer " + await AsyncStorage.getItem('access_token'),
                              Accept: 'application/json',
                              'Content-Type': 'application/json',  
                          },
                      });
                      
                      const json = await response.json();
                      console.log("getStamina pour tous les robots", json);
                      setStamina(json);
                  
              } catch (error) {
                console.error(error);
              }
            };
          getStamina();
          
        }, []);

    // Affichage des différents menus avec redirection
    return(
        <View style={styles.container}>
            <View style={styles.greetingsContainer}>
                <Image source={logo} style={styles.logo}/>
                <Text style={styles.greetings}> Bonjour {user.pseudo} !</Text>
            </View>
            <View style={styles.gameModeContainer}>
            <Button
               buttonLabel="- Aventure Solo"
               route="AreaChoiceScreen"/>
            <Text style={styles.options}>
               - Joueur vs Joueur
            </Text>
            </View>
            <View style={styles.navigationContainer}>
                <Text style={styles.link}
                  onPress={() => navigation.navigate('CollectionScreen')}>
                    Collection
                  </Text>
                <Text style={styles.link}
                  onPress={() => navigation.navigate('ShopScreen')}>
                    Boutique
                  </Text>
                <Text style={styles.link}
                  onPress={() => navigation.navigate('RankingScreen')}>
                    Classement
                  </Text>
                <Text style={styles.link}
                  onPress={() => navigation.navigate('ProfilScreen')}>
                    Profil
                </Text>
            </View>
            <View style={styles.robotContainer}>
                <Image source={{uri:  `${ipConfig}/${mainRobot.robot_image}`}} style={styles.card}></Image>
                <Text style={styles.stam}>Stamina {mainRobot.current_stam} / 50 pts</Text>
            </View>
        </View>
    );
}