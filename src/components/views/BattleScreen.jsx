// Ecran affichant le combat de robot du joueur contre un ordinateur

import React, { useState } from "react";
import ipConfig from "../../../IpConfig";
import { View, Image, Button, Text } from "react-native";
import { useEffect, useContext } from "react";
import styles from "../../style/BattleScreenStyle";
import MechaQuestDice from "../usable/MechaQuestDice";
import 'react-dice-complete/dist/react-dice-complete.css';
import { MainRobotContext } from "../../lib/MainRobotContext";
import { AreaChoosenContext } from "../../lib/AreaChoosenContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BattleScreen() {
    const [diceResults, setDiceResults] = useState(); //State pour updater le résultat du dé
    const [mainRobotTurn, setMainRobotTurn] = useState("");
    const [opponentRobot, setOpponentRobot] = useState([]); // Données du robot adverse
    const {mainRobot} = useContext(MainRobotContext); // Données du robot du joueur
    const {areaChoosen} = useContext(AreaChoosenContext); // Obtention des données du robot liées à l'arène 
    const [position, setPosition] = useState(1); // State pour connaitre la position du robot sur la route (ex: combat n°2)
    const type = ["Red", "Green", "Blue"] // Liste avec les différents types pour y attribuer des multiplicateurs
    const mainRobotType = mainRobot.type_robot; // Type du robot du joueur
    const opponentRobotType = opponentRobot.type_robot; // Type du robot adverse
    const mainRobotHP = mainRobot.current_hp; // Points de vie du robot du joueur de la BDD
    const opponentRobotHP = opponentRobot.current_hp; // Points de vie du robot de l'adversaire de la BDD

    let [currentMainRobotHP, setCurrentMainRobotHP] = useState(); // Points de vie actuels de notre robot
    let [currentOpponentHP, setCurrentOpponentHP] = useState(); // Points de vie actuels de l'adversaire
    let [damages, setDamages] = useState(); // Dégats infligés

    // Le typeMultiplier confère plus de dégats en fonction du type du robot (tour du joueur)
    const typeMultiplierPlayerTurn = () => {
        // Si le robot est rouge contre vert, vert contre bleu, ou bleu contre rouge: avantage
        if ((mainRobotType == type[0] && opponentRobotType == type[1]) || (mainRobotType == type[1] && opponentRobotType == type[2]) || (mainRobotType == type[2] && opponentRobotType == type[0])) {
            return 1.2;
        }
        // Si le robot est rouge contre bleu, vert contre rouge, ou bleu contre vert: désavantage
        else if ((mainRobotType == type[0] && opponentRobotType == type[2]) || (mainRobotType == type[1] && opponentRobotType == type[0]) || (mainRobotType == type[2] && opponentRobotType == type[1]) ){
            return 0.8;
        }
        // Dans les autres scénarios, type neutre donc pas de multiplicateur à appliquer
        else {
            return 1;
        }
    }

    // Le typeMultiplier confère plus de dégats en fonction du type du robot (tour de l'adversaire)
    const typeMultiplierOpponentTurn = () => {
        // Si le robot est rouge contre vert, vert contre bleu, ou bleu contre rouge: avantage
        if ((opponentRobotType == type[0] && mainRobotType == type[1]) || (opponentRobotType == type[1] && mainRobotType == type[2]) || (opponentRobotType == type[2] && mainRobotType == type[0])) {
            return 1.2;
        }
        // Si le robot est rouge contre bleu, vert contre rouge, ou bleu contre vert: désavantage
        else if ((opponentRobotType == type[0] && mainRobotType == type[2]) || (opponentRobotType == type[1] && mainRobotType == type[0]) || (opponentRobotType == type[2] && mainRobotType == type[1]) ){
            return 0.8;
        }
        // Dans les autres scénarios, type neutre donc pas de multiplicateur à appliquer
        else {
            return 1;
        }
    }   

    // Multiplicateur en fonction des résultats du dé
    const diceMultiplier = () => {
        const diceArray = [0,0.9,1,1.1,1.2,1.5];
        if (diceResults == 1) {
            return diceArray[0];
        }
        else if (diceResults == 2) {
            return diceArray[1];
        } 
        else if (diceResults == 3) {
            return diceArray[2];
        }
        else if (diceResults == 4) {
            return diceArray[3];
        }
        else if (diceResults == 5) {
            return diceArray[4];
        
        }else if (diceResults == 6) {
            return diceArray[5];
        }
    }
    
    // Fonction pour déterminer les dégats provoqués par les attaques
    const battleDamage = () => {

        try {
            // Les formules de dégats vont changer en fonction du tour, ici tour du joueur
            if (mainRobotTurn == "A") {
                const typeMultiplier = typeMultiplierPlayerTurn();
                let diceMulti = diceMultiplier();
                let battleStat = (mainRobot.current_atk / opponentRobot.current_def) ; // Attaque du joueur contre défense adverse
                // Formule mathématiques permettant de tenir compte des diverses stats du robot
                let damage = Math.round(typeMultiplier * diceMulti * battleStat); 
                setDamages(damage);

                // On applique les dégats sur les points de vie de l'adversaire
                let currentOpponentHP1 = opponentRobotHP - damage;
                setCurrentOpponentHP(currentOpponentHP1);
          

                // Victoire si l'IA n'a plus de vie
                if (currentOpponentHP1 <= 0){
                    return console.log("Victoire! Vous avez gagné");
                }
                else {
                    console.log(mainRobotTurn, "tour de qui");
                    console.log(damage, "Vous avez infligé en HP");
                    console.log(currentOpponentHP, "HP actuels IA");
                    return currentOpponentHP1;
                }
            }
            // Les formules de dégats vont changer en fonction du tour, ici tour de l'adversaire
            if (mainRobotTurn == "B"){
                const typeMultiplier = typeMultiplierOpponentTurn();
                let diceMulti = diceMultiplier();
                let battleStat = (opponentRobot.current_atk / mainRobot.current_def) ; // Attaque adverse contre défense du joueur
                // Formule mathématiques permettant de tenir compte des diverses stats du robot
                let damage = Math.round(typeMultiplier * diceMulti * battleStat); 
                setDamages(damage);

                // On applique les dégats sur les points de vie du robot
                let currentMainRobotHP1 = mainRobotHP - damage;
                setCurrentMainRobotHP(currentMainRobotHP1);
                
               
                // Gameover si le joueur n'a plus de vie
                if (currentMainRobotHP1 <= 0) {
                    return console.log("GameOver");
                }
                else {
                    console.log(mainRobotTurn, "tour de qui");
                    console.log(damage, "l'adversaire vous a infligé en HP");
                    console.log(currentMainRobotHP, "HP actuels Joueur");
                    return currentMainRobotHP1;
                }
            }
            } catch (error) {
            console.error(error);
            }
      };

    
    // Fonction pour déterminer l'issue de la partie
    const winOrLose = () => {
        try {
            // Gameover si le joueur n'a plus de vie
            if (mainRobotHP <= 0) {
                return console.log("GameOver");
            }
            // Victoire si l'IA n'a plus de vie
            else if (opponentRobotHP <= 0){
                return console.log("Victoire! Vous avez gagné");
            }
            // On continue la partie si il reste de la vie
            else {
                battleDamage();
            }
            } catch (error) {
            console.error(error);
            }
      };
    // winOrLose(); 

    useEffect(() => {
        if(areaChoosen.length !== 0) {
         // Récupération de la route et de sa position pour ensuite afficher le robot
         const getOpponentRobot = async () => {

                try {
                    
                const response = await fetch(
                    `${ipConfig}/api/positions/${areaChoosen}/${position}`, {
                        method: 'GET',
                        headers: {
                            "Authorization": "Bearer " + await AsyncStorage.getItem('access_token'),
                            Accept: 'application/json',
                            'Content-Type': 'application/json',  
                        },
                    });

                    const json = await response.json();
                    setOpponentRobot(json);
 
            } catch (error) {
              console.error(error);
            }
          };
          getOpponentRobot();
        }
        
    }, [areaChoosen]);

    

    return(


        
        <View style={styles.container}>
           
            {/* Emplacement pour le robot du joueur */}
            <View style={styles.robotPlayerContainer}>
                <Image source={{uri:  `${ipConfig}/${mainRobot.robot_image}`}} style={styles.card}></Image>
                <View>
                    <Text style={styles.text}> HP : {mainRobot.current_hp} </Text>
                    <Text style={styles.text}> Atk : {mainRobot.current_atk} </Text>
                    <Text style={styles.text}> Def : {mainRobot.current_def} </Text>
                </View>
            </View>

            {/* Affichage du dé */}
            <MechaQuestDice setDiceResults={setDiceResults} setMainRobotTurn={setMainRobotTurn} battleDamage={() => battleDamage()} currentMainRobotHP={currentMainRobotHP} currentOpponentHP={currentOpponentHP} damages={damages}/>
           
            {/* Emplacement du robot adverse */}
            <View style={styles.robotIAContainer}>
                <Image source={{uri:  `${ipConfig}/${opponentRobot.robot_image}`}} style={styles.card}></Image>
                <View>
                    <Text style={styles.text}> HP : {opponentRobot.current_hp} </Text>
                    <Text style={styles.text}> Atk : {opponentRobot.current_atk} </Text>
                    <Text style={styles.text}> Def : {opponentRobot.current_def} </Text>
                </View>
                
            </View>
        </View>
    );

}