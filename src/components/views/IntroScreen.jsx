// Ecran qui présente le jeu à un nouveau joueur: lore général suivi du tutoriel 

import { View, ScrollView, Text } from "react-native";
import styles from "../../style/IntroScreenStyle";
import Button from "../usable/ButtonRedirect";

export default function IntroScreen() {
    return (
        <View style={styles.container}>
            <Text style={{color:"white"}}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
                sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
                recusandae alias error harum maxime adipisci amet laborum.
            </Text>
            <Button
            buttonLabel="robotChoice"
            route="RobotChoiceScreen"/>
        </View>
    );
}