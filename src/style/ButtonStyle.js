import { StyleSheet } from "react-native";

export default StyleSheet.create({
  button: {
    backgroundColor: "#49ada5",
    padding: 20,
    borderRadius: 5,
    transition: 0.5,
    color: "#41403E",
    width: 150,
    margin: 15,

    // Boutons css avec bordure spéciale

    // borderRadius: [10, 10, 10, 10],
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 225,
    // borderBottomRightRadius: 15,
    // borderBottomLeftRadius: 255,

    //   border-top-left-radius: 255px 15px;
    //   border-top-right-radius: 15px 225px;
    //   border-bottom-right-radius: 225px 15px;
    //   border-bottom-left-radius:15px 255px;
    // font-size:2rem;
    // letter-spacing:1px;
    // outline:none;
    // box-shadow: 20px 38px 34px -26px hsla(0,0%,0%,.2);
    // border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  },

  // la classe choiceButton correspond aux boutons request de l'écran RobotChoiceScreen
  choiceButton: {
    backgroundColor: "#0d9e81",
    padding: 20,
    borderRadius: 5,
    transition: 0.5,
    color: "#41403E",
    width: 150,
    textAlign: "center",
    margin: 15,
    alignSelf: "center",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 0,
  },
  button_text: {
    textAlign: "center",
    fontSize: 20,
    color: "#fff",
  },

  homeScreenButton: {
    backgroundColor: "transparent",
    border: "none",
    transition: 0.5,
    color: "#41403E",
    width: 250,
  },

  homeScreenButtonText: {
    textAlign: "center",
    fontSize: 24,
    color: "#fff",
  },
});

// backgroundColor: "#49ada5",
// padding: 20,
// borderRadius: 5,
// transition: 0.5,
// color: "#41403E",
// width: 150,
// textAlign: "center",
// margin: 15,
