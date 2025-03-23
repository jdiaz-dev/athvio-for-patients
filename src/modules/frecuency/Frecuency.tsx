import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, Animated, Dimensions, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Audio } from 'expo-av';

const intervals = [0, 300000, 75000, 300000, 75000, 300000, 75000, 300000, 75000, 300000, 75000, 300000, 75000, 300000];
const totalDuration = intervals.reduce((acc, val) => acc + val, 0);
const screenWidth = Dimensions.get('window').width;

export default function Frecuency() {
  const [isStarted, setIsStarted] = useState(false);
  const [currentInterval, setCurrentInterval] = useState(-1);
  const [elapsed, setElapsed] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const progressAnim = useRef(new Animated.Value(0)).current;

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getMarkerPosition = (index: number) => {
    const timeAtMarker = intervals.slice(0, index + 1).reduce((a, b) => a + b, 0);
    return (timeAtMarker / totalDuration) * 100;
  };

  const getTimeAtMarker = (index: number) => {
    const time = intervals.slice(0, index + 1).reduce((a, b) => a + b, 0);
    return formatTime(time);
  };

  const startSounds = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../../../assets/creepy-bell.mp3'), // Change to correct path
    );
    setSound(sound);

    let totalDelay = 0;

    intervals.forEach((interval, index) => {
      totalDelay += interval;

      setTimeout(() => {
        setCurrentInterval(index);
        if (sound) {
          sound.setPositionAsync(0);
          sound.playAsync();
        }
      }, totalDelay);
    });

    const startTime = Date.now();
    let currentWindow = 0;

    const intervalId = setInterval(() => {
      const now = Date.now();
      const elapsedTime = now - startTime;
      setElapsed(elapsedTime);

      const scrollWidth = intervals.length * 100;
      const progressX = (elapsedTime / totalDuration) * scrollWidth;
      const nextWindowEnd = (currentWindow + 1) * screenWidth;

      Animated.timing(progressAnim, {
        toValue: (elapsedTime / totalDuration) * 100,
        duration: 1000,
        useNativeDriver: false,
      }).start();

      if (progressX > nextWindowEnd && nextWindowEnd < scrollWidth) {
        currentWindow++;
        scrollViewRef.current?.scrollTo({
          x: currentWindow * screenWidth,
          animated: true,
        });
      }

      if (elapsedTime >= totalDuration) {
        clearInterval(intervalId);
      }
    }, 1000);
  };

  useEffect(() => {
    if (isStarted) {
      startSounds();
    }
  }, [isStarted]);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      {!isStarted ? (
        <Button mode="contained" onPress={() => setIsStarted(true)} style={styles.startButton} labelStyle={{ fontSize: 18 }}>
          Comienza frecuencias
        </Button>
      ) : (
        <>
          <Text style={styles.timer}>
            ⏳ Transcurrido: {formatTime(elapsed)} / {formatTime(totalDuration)}
          </Text>

          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={true} // 👈 show the scrollbar
            style={styles.timelineWrapper}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <View style={[styles.timeline, { width: intervals.length * 100 }]}>
              <Animated.View
                style={[
                  styles.progress,
                  {
                    width: progressAnim.interpolate({
                      inputRange: [0, 100],
                      outputRange: ['0%', '100%'],
                    }),
                  },
                ]}
              />
              {intervals.map((_, index) => {
                const left = `${getMarkerPosition(index)}%`;
                return (
                  <View key={index} style={[styles.marker, { left }]}>
                    <Text style={styles.label}>{getTimeAtMarker(index)}</Text>
                    <View style={[styles.dot, index === currentInterval ? styles.activeDot : null]} />
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0d0d0d',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  startButton: {
    marginTop: 20,
    backgroundColor: '#1e90ff',
    borderRadius: 10,
  },
  timer: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 0, // ⬅️ was 20
    marginBottom: 4, // ⬅️ add this to pull it closer to the timeline
    borderWidth: 1,
  },

  timelineWrapper: {
    marginTop: 0, // ⬅️ was 8 or 20 before
    // marginLeft: 5, // ⬅️ was 8 or 20 before
    width: '100%',
    maxHeight: 220,
    paddingBottom: 0, // optional, if needed
    borderWidth: 1,
  },
  timeline: {
    backgroundColor: '#1a1aff',
    height: 200,
    borderRadius: 8,
    position: 'relative',
    justifyContent: 'flex-end',
    flexDirection: 'row', // 👈 horizontal layout
  },
  progress: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: '#00ff66',
    borderRadius: 8,
    zIndex: 1,
  },
  marker: {
    position: 'absolute',
    bottom: 20,
    transform: [{ translateX: -30 }],
    zIndex: 2,
    alignItems: 'center',
    width: 60,
  },
  label: {
    fontSize: 12,
    color: '#ffffff',
    marginBottom: 6,
    textAlign: 'center',
  },
  dot: {
    width: 14,
    height: 14,
    backgroundColor: '#888',
    borderRadius: 7,
  },
  activeDot: {
    backgroundColor: '#00ff66',
    shadowColor: '#00ff66',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
});
