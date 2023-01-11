import { StyleSheet, Dimensions } from "react-native";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#070F3C",
  },

  robotPlayerContainer: {
    position: "absolute",
    alignItems: "center",
    width: windowWidth * 0.3,
    height: windowHeight * 0.8,
    left: "3%",
    top: "10%",
  },

  robotIAContainer: {
    position: "absolute",
    alignItems: "center",
    width: windowWidth * 0.3,
    height: windowHeight * 0.8,
    right: "14%",
    top: "10%",
  },

  card: {
    flex: 5,
    width: windowWidth * 0.3,
  },
});
