// Composant qui affiche la stamina d'un robot

import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import styles from '../../style/StaminaStyle';
import ipConfig from '../../../IpConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function StaminaRefill() {
  const [stamina, setStamina] = useState("");


  // Récupération uniquement de la stamina du main robot
  useEffect(() => {
    const getStamina = async () => {
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
              setStamina(json[0].current_stam);
          
      } catch (error) {
        console.error(error);
      }
    };
  getStamina();

}, []);

// Exemple: Au chargement de la page, on ajoute +1 de stamina toutes les secondes en front

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setStamina((prevStamina) => prevStamina + 1);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

  return (
    <View> 
        <Text style={styles.stamina}>Stamina restante du robot: {stamina}</Text>
    </View>
  );
}