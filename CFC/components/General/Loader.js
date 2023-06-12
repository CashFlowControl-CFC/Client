import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, Easing, StyleSheet, Text } from 'react-native';

const Loader = () => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startRotationAnimation();
  }, []);

  const startRotationAnimation = () => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Animated.Image
            source={require('../../resources/logo_shesterenka.png')}
            style={[styles.image, { transform: [{ rotate: spin }] }]}
        />
            <Image source={require('../../resources/logo_moneta-01.png')} style={[styles.image, {position: 'absolute'}]}/>
        </View>
      <Text style={{color: '#FACC20', fontSize: 30, fontWeight: 700, marginTop: '5%'}}>Money Manager</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
  },
});

export default Loader;