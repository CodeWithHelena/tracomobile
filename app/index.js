// app/index.js  (GetStarted screen)
import React, { useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform,Button } from 'react-native';
import { useRouter } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/Colors';
import ThemedText from '../components/ThemedText';
import ThemedButton from '../components/ThemedButton';
import Illustration1 from '../assets/illustrations/Illustration1';
import Illustration2 from '../assets/illustrations/Illustration2';
import Illustration3 from '../assets/illustrations/Illustration3';
import { useNavigation } from '@react-navigation/native';


const { width } = Dimensions.get('window');

const slides = [
  {
    key: 's1',
    title: 'Organize your tasks',
    subtitle: 'Create lists, set due dates and stay on track.',
    Illustration: Illustration1,
  },
  {
    key: 's2',
    title: 'Plan and schedule',
    subtitle: 'Visualize workloads and plan ahead with ease.',
    Illustration: Illustration2,
  },
  {
    key: 's3',
    title: 'Track progress',
    subtitle: 'Measure progress and hit your goals consistently.',
    Illustration: Illustration3,
  },
];

export default function GetStarted() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const router = useRouter();


  const renderDots = () => {
    return (
      <View style={styles.dots}>
        {slides.map((_, i) => {
          const opacity = scrollX.interpolate({
            inputRange: [(i - 1) * width, i * width, (i + 1) * width],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          const scale = scrollX.interpolate({
            inputRange: [(i - 1) * width, i * width, (i + 1) * width],
            outputRange: [0.8, 1.2, 0.8],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View key={i} style={[styles.dot, { opacity, transform: [{ scale }] }]} />
          );
        })}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} style={styles.header}>
          <ThemedText title style={styles.brand}>Traco</ThemedText>
        </LinearGradient>

        <View style={styles.card}>
          <Animated.ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
            contentContainerStyle={{ alignItems: 'center' }}
          >
            {slides.map((s, index) => {
              const Illustration = s.Illustration;
              const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.9, 1, 0.9],
                extrapolate: 'clamp',
              });
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.6, 1, 0.6],
                extrapolate: 'clamp',
              });

              return (
                <View key={s.key} style={{ width, alignItems: 'center', paddingVertical: 18 }}>
                  <Animated.View style={{ transform: [{ scale }], opacity }}>
                    <Illustration width={240} height={160} />
                  </Animated.View>

                  <ThemedText title style={styles.slideTitle}>{s.title}</ThemedText>
                  <ThemedText style={styles.slideSubtitle}>{s.subtitle}</ThemedText>
                </View>
              );
            })}
          </Animated.ScrollView>

          {/* floating plus circle */}
          <View style={styles.plusCircle}>
            <TouchableOpacity style={styles.plusTouchable} onPress={() => navigation.navigate('Register')}>
              <ThemedText title style={{ color: '#fff' }}>+</ThemedText>
            </TouchableOpacity>
          </View>

          {renderDots()}

          <View style={{ paddingHorizontal: 24, width: '100%' }}>
              <ThemedButton title="Get Started" onPress={() => router.push("/register")} />
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop: 12, alignItems: 'center' }}>
              <ThemedText style={{ color: Colors.gradientStart }}>Already have an account?
                <ThemedText 
                  style={styles.linkText} 
                  onPress={() => router.push("/(auth)/login")}
                >
                  Sign in
                </ThemedText>
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    height: 250,
    paddingTop: 44,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  brand: {
    fontSize: 34,
    fontWeight: '700',
    color: '#fff',
    marginTop: 8,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -32,
    paddingTop: 0,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  slideTitle: {
    marginTop: 24,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  slideSubtitle: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
    width: 260,
    lineHeight: 20,
  },
  plusCircle: {
    position: 'absolute',
    top: 70,
    alignSelf: 'center',
    zIndex: 10,
  },
  plusTouchable: {
    width: 62,
    height: 62,
    borderRadius: 31,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.gradientStart,
  },
  dots: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 18,
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#bdb7f9',
    marginHorizontal: 6,
  },
};
