import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Easing,
  Image,
} from 'react-native';
import LottieView from 'lottie-react-native';

const BOTTOM_DEFAULT = 30;

export default function Facebook(props) {
  const [showEmoji, setShowEmoji] = useState(false);
  const [bottomLike, setBottomLike] = useState(BOTTOM_DEFAULT);

  let likeRef = useRef(null);
  let barAni = useRef(new Animated.Value(0)).current;
  const barAnimStyle = {
    opacity: barAni.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    bottom: barAni.interpolate({
      inputRange: [0, 1],
      outputRange: [bottomLike - 10, bottomLike],
    }),
  };

  useEffect(() => {
    Animated.timing(barAni, {
      toValue: showEmoji ? 1 : 0,
      duration: 100,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
  }, [showEmoji]);

  const handleLike = () => {
    setShowEmoji(!showEmoji);
  };

  const onLayoyt = () => {
    likeRef &&
      likeRef.measure((x, y, width, height, pageX, pageY) => {
        console.log(x, y, width, height, pageX, pageY);
        setBottomLike(y);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Facebook</Text>
      <Animated.View
        style={[
          styles.lsEmoji,
          {opacity: barAnimStyle.opacity, bottom: barAnimStyle.bottom},
        ]}>
        <LottieView
          style={styles.lottie}
          source={require('./emojis-like.json')}
          autoPlay
          loop
          progress={0.2}
        />
        <LottieView
          style={styles.lottie}
          source={require('./emojis-love.json')}
          autoPlay
          loop
          progress={0.2}
        />
        <LottieView
          style={styles.lottie}
          source={require('./emojis-wow.json')}
          autoPlay
          loop
          progress={0.2}
        />
        <LottieView
          style={styles.lottie}
          source={require('./emojis-like.json')}
          autoPlay
          loop
          progress={0.2}
        />
        <LottieView
          style={styles.lottie}
          source={require('./emojis-love.json')}
          autoPlay
          loop
          progress={0.2}
        />
        <LottieView
          style={styles.lottie}
          source={require('./emojis-wow.json')}
          autoPlay
          loop
          progress={0.2}
        />
      </Animated.View>

      <View style={styles.row} ref={ref => (likeRef = ref)} onLayout={onLayoyt}>
        <TouchableOpacity onPress={handleLike}>
          <Image style={styles.like} source={require('./icon-like.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  like: {
    width: 30,
    height: 30,
    borderRadius: 30,
    // margin: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#efefef',
    marginTop: 10,
  },
  lsEmoji: {
    position: 'absolute',
    bottom: BOTTOM_DEFAULT,
    left: 20,
    // height: 40,
    // width: 200,
    borderRadius: 50,
    backgroundColor: '#fff',
    elevation: 12,
    shadowColor: '#a4a4a4',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
    paddingVertical: 5,
  },
  lottie: {
    width: 35,
    height: 35,
  },
});
