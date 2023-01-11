import { StyleSheet, Dimensions } from "react-native";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

export default StyleSheet.create({
  slide: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: "#020829",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  slideImage: {
    flexBasis: 100,
    flexGrow: 0.45,
    marginBottom: 100,
  },
  slideTitle: {
    fontSize: 24,
    color: "white",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
  },
  slideDescription: {
    fontSize: 14,
    color: "white",
    width: windowWidth * 0.5,
    height: windowHeight * 0.3,
  },
  slideButton: {
    color: "red",
    backgroundColor: "green",
  },

  pagination: {
    position: "absolute",
    bottom: 8,
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  paginationDotActive: { backgroundColor: "lightblue" },
  paginationDotInactive: { backgroundColor: "black" },
});
