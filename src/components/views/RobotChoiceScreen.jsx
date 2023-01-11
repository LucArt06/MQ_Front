// Ecran de selection du robot qui s'affiche la première fois après avoir lu le tutoriel

import { useEffect } from "react";
import React, { useState } from "react";
import ipConfig from "../../../IpConfig";
import Carousel from "../usable/Carousel";
import { View, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function RobotChoice() {
    const [robots, setRobots] = useState([]);
  
    useEffect(() => {
        const getRobots = async () => {
            try {
            const userEmail = await AsyncStorage.getItem('email'); // Récupération de l'email de l'utilisateur en utilisant les données du localstorage
            console.log(userEmail);
            
                // Récupération des robots
                const response = await fetch(
                    `${ipConfig}/api/robots`, {
                        method: 'GET',
                        headers: {
                            "Authorization": "Bearer " + await AsyncStorage.getItem('access_token'),
                            Accept: 'application/json',
                            'Content-Type': 'application/json',  
                        },
                    });
                
                    const json = await response.json();
                    setRobots(json);
   
            } catch (error) {
              console.error(error);
            }
          };
        
        getRobots();

    }, []);

    return (
        <View>
            <Text style={{color: "white", backgroundColor: "#020829", textAlign:"center", fontSize:18, fontWeight: "bold"}}>
            CHOIX DU ROBOT
            </Text>
            <View>
                {/* Composant du Carousel pour le choix des robots */}
                <Carousel robots={robots} />
            </View>
        </View>
    );
}
