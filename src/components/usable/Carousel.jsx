// Ce carousel permet à l'utilisateur de choisir entre plusieurs robots

import React, { useCallback, memo, useRef, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FlatList,
  View,
  Dimensions,
  Text,
  Image,
} from "react-native";
import ButtonRequest from "../usable/ButtonRequest";
import styles from "../../style/CarouselStyle";
import ipConfig from "../../../IpConfig";


const { width: windowWidth, height: windowHeight } = Dimensions.get("window"); // Obtention de la taille de l'écran pour un CSS responsive

export default function Carousel({robots}) {
const [index, setIndex] = useState(0);

const robotChoice = async(robot_name) => {
  try {
      // Récupération d'un robot parent en base de données puis création d'une nouvelle entrée en BDD via duplication, en associant l'email de l'utilisateur
      const response = await fetch(`${ipConfig}/api/duplicate/${robot_name}`, { 
          method: 'POST',
          headers: {
              "Authorization": "Bearer " + await AsyncStorage.getItem('access_token'), // Nécessite un bearer token récupéré en local storage
              Accept: 'application/json',
              'Content-Type': 'application/json',  
          },
        });

      const json = await response.json();
      console.log(json);
      
      // Si la réponse est correcte (200), redirection sur l'écran HomeScreen
      if (json.status_code == 200) {
        navigation.navigate('HomeScreen');
      } 
  } catch (error) {
      console.error(error);
  } 
}

// Affichage du slide avec les datas voulues (image, nom du robot...)
const Slide = memo(function Slide({ data}) {
  return (
    <View style={styles.slide}>
      <Image source={{ uri: data.image }} style={styles.slideImage}></Image>
      <View style={styles.container}>
        <Text style={styles.slideTitle}>{data.title}</Text>
        <Text style={styles.slideDescription}>{data.description}</Text>
        {/* Utilisation de notre composant ButtonRequest en appelant la méthode robotChoice pour sauvegarder en BDD au click */}
        <ButtonRequest style={styles.slideButton} buttonLabel="Selectionner robot" method={() => robotChoice(data.title)}/> 
      </View>
    </View>    
  );
});
  
  // L'index va nous servir pour la pagination
  const indexRef = useRef(index);
  indexRef.current = index;
  
    // Stockage des datas telles que l'ID, l'image, le titre ou encore la description
    const slideList = robots.map(({id, robot_name, robot_image, description}, i) => {
    return {
      id: id,
      image: `${ipConfig}/${robot_image}`,
      title: robot_name,
      description: description,
    };
  });

  // Pagination pour savoir sur quel slide on se situe via un Dot (petit rond en bas de l'écran de téléphone)
  function Pagination({ index }) {
    return (
      <View style={styles.pagination} pointerEvents="none">
        {slideList.map((_, i) => {
          return (
            <View
              key={i}
              style={[
                styles.paginationDot,
                index === i
                  ? styles.paginationDotActive
                  : styles.paginationDotInactive,
              ]}
            />
          );
        })}
      </View>
    );
  }

  const onScroll = useCallback((event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    const distance = Math.abs(roundIndex - index);

    // Prevent one pixel triggering setIndex in the middle
    // of the transition. With this we have to scroll a bit
    // more to trigger the index change.
    const isNoMansLand = 0.4 < distance;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);

  // Différentes valeurs à toucher pour modifier le rendu
  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: useCallback(s => String(s.id), []),
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: windowWidth,
        offset: index * windowWidth,
      }),
      []
    ),
  };

  // Permet l'affichage de notre slide
  const renderItem = useCallback(function renderItem({ item }) {
    return <Slide data={item} />; }, []);
    return (
      <> 
        <FlatList
          data={slideList}
          style={styles.carousel}
          renderItem={renderItem}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScroll={onScroll}
          {...flatListOptimizationProps}
        />
        <Pagination index={robots}></Pagination>
      </>
  );
}

