// Composant du dé permettant de jouer à MechaQuest

import React from 'react';
import ReactDice from 'react-dice-complete';
import { View, Text, Button } from 'react-native';
import styles from "../../style/MechaQuestDiceStyle";


class MechaQuestDice extends React.Component{
    
    // Constructor pour initialiser le state du diceNumber
    constructor(props){
        super(props);
        this.state = { diceNumber: null, diceResult: null, diceResult2: null, elementVisible: true, mainRobotTurn:"",  initiativeJoueur: null, battleData: null, textDisplay: false};
    }

    // Cette fonction change le state du dé en prenant le résultat du lancer de dé
    rollDoneCallback = async (num) => {
        this.setState ({ diceNumber: num });   
        if (this.state.diceResult == null) {
            this.setState({ diceResult: this.state.diceNumber });
        } else {
            this.setState({ diceResult2: this.state.diceNumber });
        }    

        this.setState({textDisplay: true});
        if (this.state.battleData == "display"){
            this.props.battleDamage()
        }   
        this.displayData();
      }


    // Fonction pour lancer un dé, utilisé ici au click
    rollAll = () => {
        console.log(this.state.mainRobotTurn, "beforereset");

        setTimeout(() =>{
            this.setState({ mainRobotTurn: "C" }, ()=>{ this.props.setMainRobotTurn(this.state.mainRobotTurn);}); // Comme setState est une fonction asynchrone on utilise une callback pour attendre que le state soit modifié avant la transmission via les props
            console.log(this.state.mainRobotTurn, "reset");
          }, 200);       

        /* On update le state pour l'affichage conditionnel des boutons + la transmission du state via les props au composant "BattleScreen" */
        setTimeout(() =>{
            this.setState({ mainRobotTurn: "A" }, ()=>{ this.props.setMainRobotTurn(this.state.mainRobotTurn);}); // Comme setState est une fonction asynchrone on utilise une callback pour attendre que le state soit modifié avant la transmission via les props
           console.log(this.state.mainRobotTurn, "state turn A?");
            this.reactDice.rollAll();  
          }, 1000);
        
        // Fonction pour déclencher le dé à nouveau après un certain temps
        setTimeout(() =>{
            this.setState({ mainRobotTurn: "B" }, ()=>{ this.props.setMainRobotTurn(this.state.mainRobotTurn);});
            // if (this.state.battleData == "display"){
            //     this.props.battleDamage()
            // }          
            console.log(this.state.mainRobotTurn, "state turn B?");

            console.log(this.state.currentMainRobotHP, "state des HP");


            this.reactDice.rollAll();
            this.setState({ elementVisible: false })
            this.setState({textDisplay: true})

          }, 5000);

      }

      

    rollInitiative = () => {

        setTimeout(() =>{
            if (this.state.diceResult >= this.state.diceResult2) {
                return (
                    this.setState({initiativeJoueur : "Joueur1"})
                    ) 
            }
            else {
                return (  
                    this.setState({initiativeJoueur : "Joueur2"})
                    )
            }
          }, 8100);
        }


    // // Fonction qui active le premier lancer de dé pour l'IA si l'adversaire commence en premier
    rollFirstOpponentTurn = () => {

        setTimeout(() =>{
            this.setState({ mainRobotTurn: "C" }, ()=>{ this.props.setMainRobotTurn(this.state.mainRobotTurn);}); // Comme setState est une fonction asynchrone on utilise une callback pour attendre que le state soit modifié avant la transmission via les props
            console.log(this.state.mainRobotTurn, "reset");
          }, 200);

          setTimeout(() =>{
            this.setState({ mainRobotTurn: "B" }, ()=>{ this.props.setMainRobotTurn(this.state.mainRobotTurn);}); // Comme setState est une fonction asynchrone on utilise une callback pour attendre que le state soit modifié avant la transmission via les props
            console.log(this.state.mainRobotTurn, "state turn B?");
            this.reactDice.rollAll();
          }, 1000);     

       /* On update le state pour l'affichage conditionnel des boutons + la transmission du state via les props au composant "BattleScreen" */
       
       // Fonction pour déclencher le dé à nouveau après un certain temps
       setTimeout(() =>{
           this.setState({ mainRobotTurn: "A" }, ()=>{ this.props.setMainRobotTurn(this.state.mainRobotTurn);});
        //    if (this.state.battleData == "display"){
        //         this.props.battleDamage()
        //    }
            console.log(this.state.mainRobotTurn, "state turn A?");

           this.reactDice.rollAll();
           this.setState({ elementVisible: false })
         }, 5000);
        }

    // Informations à afficher sur l'écran en fonction des résultats du dé
    displayData = () => {      
        return (
            <View>
                {this.state.battleData == "display" ?
                <View>
                    <Text style={styles.diceNumberText}> Le résultat du dé est :</Text>
                    <Text style={styles.diceNumberText}>{this.state.diceNumber}</Text>
                </View>
                : null
                }

                {this.state.mainRobotTurn == "B" && this.state.battleData == "display" && this.state.textDisplay ?
                    (<View>
                        <Text style={styles.diceNumberText}>L'adversaire vous a infligé {this.props.damages}HP</Text>
                        <Text style={styles.diceNumberText}> Il vous reste {this.props.currentMainRobotHP} HP</Text>
                    </View>)
                    : null
                }

                {this.state.mainRobotTurn == "A" && this.state.battleData == "display" && this.state.textDisplay ?
                    (<View>
                        <Text style={styles.diceNumberText}>Vous avez infligé {this.props.damages}HP</Text>
                        <Text style={styles.diceNumberText}> Il reste {this.props.currentOpponentHP} HP à l'adversaire</Text>
                    </View>)
                    : null
                 }                
            </View>
        )
    }
 
      
    render(){
        /* Pour définir qui joue en premier on a besoin de comparer deux lancés de dés
        * pour ce faire on récupère la valeur des lancés dans deux state différents
        */
            this.props.setDiceResults(this.state.diceNumber);
    
        const elementVisible = this.state.elementVisible;
        return (
            <View style={styles.diceContainer}>
                <View>
                    {/* Opérateur ternaire pour gerer dynamiquement l'affichage */ }
                    {elementVisible == true ? 

                    <View>
                        <Text style={styles.diceNumberText}> Voici votre premier adversaire !</Text>
                        <Text style={styles.diceNumberText}> Cliquez pour déterminer qui commence en premier</Text>
                      

                        {/* Bouton pour lancer le dé */}
                        <Button
                            title="Initiative"
                            color="#3273a8"
                            onPress={() => {this.rollAll(), this.rollInitiative()}}
                        /></View> : null 
                    }
                </View>
                <View>
                    <ReactDice 
                    numDice={1} 
                    faceColor={'#E61E1E'}
                    dotColor={'#fffff'}
                    // Lorsque le lancer est terminé, on appelle le callback pour renvoyer le résultat
                    rollDone={this.rollDoneCallback}
                    // Désactive le lancer de dé en touchant le dé, pour ne le laisser qu'au click du bouton 
                    disableIndividual={true}
                    ref={dice => this.reactDice = dice}
                    />
                    {/* Opérateur ternaire pour gerer dynamiquement l'affichage */ }
                    {elementVisible == false && this.state.battleData == null ? 
                    <View>
                    <Text style={styles.diceNumberText}> Le résultat du dé est :</Text>
                    <Text style={styles.diceNumberText}>{this.state.diceNumber}</Text>
                    </View> : null }
                </View>
                
                    
                { elementVisible == false && this.state.initiativeJoueur == "Joueur1" && this.state.battleData == null ?
                <View>
                    <Text style={styles.diceNumberText}>Bravo vous avez fait un meilleur score que votre adversaire !</Text>
                    <Text style={styles.diceNumberText}>A vous de jouer !</Text> 
                </View> : null
                }
                        
                
                <View>
                    {
                        this.displayData()
                    }
                </View>

                { elementVisible == false && this.state.initiativeJoueur == "Joueur1" && this.state.mainRobotTurn == "B" && this.state.textDisplay ? 
                    <View>
                        <Button
                        title="Lancer Attaque J1"
                        color="#3273a8"
                        onPress={() => [this.rollAll(), this.setState({battleData:"display"}), this.setState({textDisplay:false})]}
                    />
                    </View> : null 
                }

                { elementVisible == false && this.state.initiativeJoueur == "Joueur2" && this.state.mainRobotTurn == "A" && this.state.textDisplay ? 
                <View>
                    <Button
                    title="Lancer Attaque J2"
                    color="#3273a8"
                    onPress={() => [this.rollFirstOpponentTurn(), this.setState({battleData:"display"}), this.setState({textDisplay:false})]}
                />
                </View> : null 
                }   

                {elementVisible == false && this.state.initiativeJoueur == "Joueur2" && this.state.battleData == null ? 
                    <View>
                         <Text style={styles.diceNumberText}>L'adversaire a fait un meilleur score, à lui de commencer !</Text>
                        <Text style={styles.diceNumberText}>Cliquez sur suivant</Text> 

                        <Button
                            title="Suivant"
                            color="#3273a8"
                            onPress={() => [this.rollFirstOpponentTurn(), this.setState({battleData:"display"}), this.setState({textDisplay:false})]}
                        /></View> : null 
                    }
            </View>
        )
    }
}
export default MechaQuestDice;