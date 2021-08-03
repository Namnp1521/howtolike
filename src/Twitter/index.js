import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Easing,
} from 'react-native';
import LottieView from 'lottie-react-native';

export default function Twitter(props) {
  const [like, setLike] = useState(false);
  const [counter, setCounter] = useState(10);

  const progressAnim = useRef(new Animated.Value(0)).current;
  const counterTransYAnim = useRef(new Animated.Value(0)).current;
  const counterOpaAnim = useRef(new Animated.Value(1)).current;
  const likeCount = {
    translateY: counterTransYAnim.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [30, 0, -30],
    }),
    opacity: counterOpaAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  };

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: like ? 1 : 0,
      duration: like ? 1000 : 0,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();

    Animated.sequence([
      Animated.timing(counterTransYAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(counterOpaAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(counterTransYAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ]).start(() => {
      setCounter(like ? counter + 1 : counter - 1);
    });
  }, [like]);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(counterTransYAnim, {
        toValue: -1,
        duration: 0,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(counterOpaAnim, {
        toValue: 1,
        duration: 0,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(counterTransYAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ]).start();
  }, [counter]);

  const handleLike = () => {
    setLike(!like);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Twitter</Text>

      <View style={styles.row}>
        <TouchableOpacity onPress={handleLike}>
          <LottieView
            style={styles.lottie}
            source={require('./heart.json')}
            progress={progressAnim}
          />
        </TouchableOpacity>
        <View style={styles.wrapCounter}>
          <Animated.Text
            style={[
              styles.likeCount,
              {
                transform: [
                  {
                    translateY: likeCount.translateY,
                  },
                ],
                opacity: likeCount.opacity,
              },
            ]}>
            {counter}
          </Animated.Text>
        </View>
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
  lottie: {
    width: 50,
    height: 50,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#14171A',
    marginTop: 10,
  },
  likeCount: {
    fontSize: 16,
    color: '#AAB8C2',
  },
  wrapCounter: {
    height: 20,
    overflow: 'hidden',
  },
});
