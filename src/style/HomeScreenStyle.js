import { StyleSheet, Dimensions } from "react-native";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#070F3C",
  },

  greetingsContainer: {
    flexDirection: "row",
    position: "absolute",
    alignItems: "center",
    top: 20,
    left: 10,
    width: 250,
    height: 50,
  },

  logo: {
    flex: 1,
    height: 50,
  },

  greetings: {
    flex: 1,
    color: "white",
    fontSize: 20,
  },

  gameModeContainer: {
    position: "absolute",
    left: "10%",
    top: "40%",
  },

  options: {
    color: "white",
    fontSize: 32,
    marginBottom: 5,
    marginTop: 5,
  },

  navigationContainer: {
    position: "absolute",
    right: 10,
    top: 35,
    width: "55%",
    flexDirection: "row",
  },

  link: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    color: "white",
  },

  robotContainer: {
    position: "absolute",
    alignItems: "center",
    width: windowWidth * 0.3,
    height: windowHeight * 0.6,
    right: "15%",
    top: "20%",
  },

  card: {
    flex: 5,
    width: windowWidth * 0.2,
  },

  stam: {
    flex: 1,
    color: "white",
    fontSize: 24,
  },
});
