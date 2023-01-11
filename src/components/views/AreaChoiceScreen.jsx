// Ecran de choix du stage avant de lancer une partie

import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import styles from "../../style/AreaChoiceScreenStyle";
import ipConfig from "../../../IpConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CarouselAreas from "../usable/CarouselAreas";


// Récupération des arenes en BDD
export default function AreaChoiceScreen() {

    const [areas, setAreas] = useState([]);
    
    useEffect(() => {
        const getAreas = async () => {
            try {
                const response = await fetch(
                    `${ipConfig}/api/areas`, {
                        method: 'GET',
                        headers: {
                            "Authorization": "Bearer " + await AsyncStorage.getItem('access_token'),
                            Accept: 'application/json',
                            'Content-Type': 'application/json',  
                        },
                    });
                
                    const json = await response.json();
                    console.log(json);
                    setAreas(json);
                    
            } catch (error) {
              console.error(error);
            }
          };
        
        getAreas();

    }, []);


    return (
        <View>
            <View>
                {/* Utilisation du Carousel pour permettre à l'utilisateur un choix dynamique du stage */}
                <CarouselAreas areas={areas}/>
            </View>
        </View>
    );
}