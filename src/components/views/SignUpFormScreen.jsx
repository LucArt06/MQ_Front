// Ecran affichant le formulaire d'inscription

import React from "react";
import { useState } from "react";
import { View, ScrollView, Text} from "react-native";
import styles from "../../style/SignUpFormStyle";
import inputStyle from "../../style/InputStyle";
import InputWithLabel from "../usable/InputWithLabel";
import ButtonRequest from "../usable/ButtonRequest";
import ipConfig from "../../../IpConfig";

// Si le pseudo, l'email unique, et le mot de passe sont valides, enregistrement de l'utilisateur en BDD puis redirection sur l'écran de connexion
export default function SignUp(navigator) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");

    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorPseudo, setErrorPseudo] = useState('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('');

    const [data, setData] = useState([]);
       
    const register = async () => {
        try {
            const response = await fetch(`${ipConfig}/api/register`, { //ipConfig va récupérer l'IP de JB ou de Lucas            
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  pseudo: pseudo,
                  email: email,
                  password: password,
                })
              });

            const json = await response.json();
            setData(json);

            // Si réponse correcte, redirection sur l'écran de connexion, sinon affichage des erreurs sur le formulaire
            if (json.status_code == 200) {
                navigator.navigation.navigate('LogInFormScreen');
            } else {
                setErrorEmail(json.email);
                setErrorPassword(json.password);
                setErrorPseudo(json.pseudo);
                setErrorConfirmPassword("La confirmation du mot de passe est différente du mot de passe.");
            }
        } catch (error) {
            console.error(error);
        } 
    }

    return(
        <ScrollView>
            <View style={styles.container}>
                <InputWithLabel label="Pseudo"
                                value={pseudo}
                                onChangeText={setPseudo}
                                placeholder="Entrez votre pseudo"
                                />

                <Text style={inputStyle.error}>
                    {errorPseudo && (<Text> {errorPseudo} </Text>)}
                </Text>

                <InputWithLabel label="Email"
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Entrez votre e-mail"
                                />
                <Text style={inputStyle.error}>
                    {errorEmail && (<Text> {errorEmail} </Text>)}
                </Text>

                <InputWithLabel label="Mot de passe"
                                value={password}
                                onChangeText={setPassword}
                                placeholder="Entrez votre mot de passe"
                                secureTextEntry
                                />
                <Text style={inputStyle.error}>
                    {errorPassword && (<Text> {errorPassword} </Text>)}
                </Text>

                <InputWithLabel label="Confirmation"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                placeholder="Confirmez votre mot de passe"
                                secureTextEntry
                                />
                <Text style={inputStyle.error}>
                    {errorConfirmPassword && (<Text> {errorConfirmPassword} </Text>)}
                </Text>

                <View>
                <ButtonRequest buttonLabel="Valider"
                        method={register} />
                </View>
            </View>
        </ScrollView>
    );
}