import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Platform, Easing } from 'react-native';
import { MaterialDesignIcons as MCI } from '@react-native-vector-icons/material-design-icons';
import C from '../theme/colors';
import { TABS } from '../data';

const MOVE_MS = 260;         // slightly longer travel so stretch is visible
const GROW_MS = 60;
const SETTLE_MS = 150;
const BAR_SCALE = 1.04;
const BAR_LIFT = -1.5;
const PILL_STRETCH_X = 1.55;  // wider stretch — more scratchable
const PILL_STRETCH_Y = 1.22;  // taller puff
const MOVE_EASING = Easing.out(Easing.cubic);

/* pill colours */
const PILL_SOLID = 'rgba(50,49,52,1)';
const PILL_GLASS = 'rgba(120,120,130,0.18)'; // very transparent frosted glass
const RIM_OFF = 'rgba(255,255,255,0)';
const RIM_ON = 'rgba(255,255,255,0.60)';   // bright white rim on glass

/* bar background: opaque at rest → frosted during press */
const BAR_BG_SOLID = C.tabBar;             // '#222124'
const BAR_BG_GLASS = 'rgba(22,21,24,0.70)'; // semi-transparent frosted

/* soft radial glow layers that follow the pill */
const GLOW = [
  { w: 200, a: 0.06 },
  { w: 140, a: 0.09 },
  { w: 90, a: 0.12 },
];

/* Floating tab bar with sliding glass pill + camera FAB */
const TabBar = ({ index, onChange, bottomInset }) => {
  const layouts = useRef({});

  const pillX = useRef(new Animated.Value(0)).current;
  const pillW = useRef(new Animated.Value(60)).current;
  const pillScaleX = useRef(new Animated.Value(1)).current;
  const pillScaleY = useRef(new Animated.Value(1)).current;
  const glass = useRef(new Animated.Value(0)).current;
  const barGlass = useRef(new Animated.Value(0)).current; // 0=solid bar, 1=frosted bar
  const pillCenter = useRef(Animated.add(pillX, Animated.multiply(pillW, 0.5))).current;

  /* derived: glow disc left positions (one per GLOW entry) */
  const glowLeft = useRef(GLOW.map((g) => Animated.subtract(pillCenter, g.w / 2))).current;

  // whole bar (native driver)
  const barScale = useRef(new Animated.Value(1)).current;
  const barLift = useRef(new Animated.Value(0)).current;

  const fabScale = useRef(new Animated.Value(1)).current;
  const [ready, setReady] = useState(false);

  // Bar inflates quickly + goes frosted
  const animateWholeBar = () => {
    barScale.stopAnimation();
    barLift.stopAnimation();
    barGlass.stopAnimation();

    const hold = Math.max(MOVE_MS - GROW_MS, 0);
    const glassSettle = SETTLE_MS + 80;

    Animated.parallel([
      // scale (JS driver — must match backgroundColor on same view)
      Animated.sequence([
        Animated.timing(barScale, {
          toValue: BAR_SCALE,
          duration: GROW_MS,
          easing: Easing.out(Easing.quad),
          useNativeDriver: false,
        }),
        Animated.delay(hold),
        Animated.timing(barScale, {
          toValue: 1,
          duration: glassSettle,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }),
      ]),
      // lift (JS driver)
      Animated.sequence([
        Animated.timing(barLift, {
          toValue: BAR_LIFT,
          duration: GROW_MS,
          easing: Easing.out(Easing.quad),
          useNativeDriver: false,
        }),
        Animated.delay(hold),
        Animated.timing(barLift, {
          toValue: 0,
          duration: glassSettle,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }),
      ]),
      // bar frosted overlay (JS driver — drives backgroundColor)
      Animated.sequence([
        Animated.timing(barGlass, {
          toValue: 1,
          duration: GROW_MS,
          easing: Easing.out(Easing.quad),
          useNativeDriver: false,
        }),
        Animated.delay(hold),
        Animated.timing(barGlass, {
          toValue: 0,
          duration: glassSettle,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }),
      ]),
    ]).start();
  };

  const movePill = (i, animate = true) => {
    const l = layouts.current[i];
    if (!l) return;

    [pillX, pillW, pillScaleX, pillScaleY, glass].forEach((v) => v.stopAnimation());

    if (!animate) {
      pillX.setValue(l.x);
      pillW.setValue(l.width);
      pillScaleX.setValue(1);
      pillScaleY.setValue(1);
      glass.setValue(0);
      return;
    }

    const holdStretch = Math.max(MOVE_MS - GROW_MS - 30, 0);

    /* stretch out with timing, snap back with a spring for elastic bounce */
    const elasticPulse = (value, peak) =>
      Animated.sequence([
        Animated.timing(value, {
          toValue: peak,
          duration: GROW_MS,
          easing: Easing.out(Easing.quad),
          useNativeDriver: false,
        }),
        Animated.delay(holdStretch),
        Animated.spring(value, {
          toValue: 1,
          friction: 4,
          tension: 120,
          useNativeDriver: false,
        }),
      ]);

    const glassPulse = Animated.sequence([
      Animated.timing(glass, {
        toValue: 1,
        duration: GROW_MS,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }),
      Animated.delay(holdStretch),
      Animated.timing(glass, {
        toValue: 0,
        duration: SETTLE_MS + 30,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }),
    ]);

    Animated.parallel([
      Animated.timing(pillX, {
        toValue: l.x,
        duration: MOVE_MS,
        easing: MOVE_EASING,
        useNativeDriver: false,
      }),
      Animated.timing(pillW, {
        toValue: l.width,
        duration: MOVE_MS,
        easing: MOVE_EASING,
        useNativeDriver: false,
      }),
      elasticPulse(pillScaleX, PILL_STRETCH_X),
      elasticPulse(pillScaleY, PILL_STRETCH_Y),
      glassPulse,
    ]).start();
  };

  useEffect(() => {
    if (ready) movePill(index, true);
  }, [index, ready]);

  const onItemLayout = (i) => (e) => {
    layouts.current[i] = e.nativeEvent.layout;
    if (Object.keys(layouts.current).length === TABS.length && !ready) {
      movePill(index, false);
      setReady(true);
    }
  };

  const pressFab = () => {
    Animated.sequence([
      Animated.timing(fabScale, { toValue: 0.88, duration: 90, useNativeDriver: true }),
      Animated.spring(fabScale, { toValue: 1, friction: 4, useNativeDriver: true }),
    ]).start();
  };

  /* 0..1 – how much the pill currently covers tab i (drives the teal colour) */
  const tabGlow = (i) => {
    const l = layouts.current[i];
    const cx = l.x + l.width / 2;
    const r = l.width * 0.8;
    return pillCenter.interpolate({
      inputRange: [cx - r, cx - r * 0.35, cx + r * 0.35, cx + r],
      outputRange: [0, 1, 1, 0],
      extrapolate: 'clamp',
    });
  };

  const renderTab = (t, i) => {
    const active = i === index;
    const glow = ready && layouts.current[i] ? tabGlow(i) : null;

    return (
      <TouchableOpacity
        key={t.key}
        activeOpacity={0.8}
        onPress={() => {
          if (i === index) return;
          animateWholeBar();
          onChange(i);
        }}
        onLayout={onItemLayout(i)}
        style={Style.tabItem}
      >
        <View>
          <MCI name={t.icon} size={20} color={glow ? C.text : active ? C.tealSoft : C.text} />
          {glow ? (
            <Animated.View style={[StyleSheet.absoluteFill, { opacity: glow }]}>
              <MCI name={t.icon} size={20} color={C.tealSoft} />
            </Animated.View>
          ) : null}
          {t.dot ? <View style={Style.tabDot} /> : null}
        </View>

        {glow ? (
          <Animated.Text
            style={[
              Style.tabLabel,
              { color: glow.interpolate({ inputRange: [0, 1], outputRange: [C.text, C.tealSoft] }) },
            ]}
            numberOfLines={1}
          >
            {t.label}
          </Animated.Text>
        ) : (
          <Text style={[Style.tabLabel, active && { color: C.tealSoft }]} numberOfLines={1}>
            {t.label}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[Style.tabWrap, { bottom: Math.max(bottomInset, 10) + 4 }]}
      pointerEvents="box-none"
    >
      <Animated.View
        style={[
          Style.tabBar,
          {
            backgroundColor: barGlass.interpolate({
              inputRange: [0, 1],
              outputRange: [BAR_BG_SOLID, BAR_BG_GLASS],
            }),
            transform: [{ translateY: barLift }, { scale: barScale }],
          },
        ]}
      >

        {/* single pill — tabs render after it so icons/text show on top */}
        {ready && (
          <Animated.View
            style={[
              Style.activePill,
              {
                left: pillX,
                width: pillW,
                backgroundColor: glass.interpolate({
                  inputRange: [0, 1],
                  outputRange: [PILL_SOLID, PILL_GLASS],
                }),
                borderColor: glass.interpolate({
                  inputRange: [0, 1],
                  outputRange: [RIM_OFF, RIM_ON],
                }),
                transform: [{ scaleX: pillScaleX }, { scaleY: pillScaleY }],
              },
            ]}
          />
        )}
        {renderTab(TABS[0], 0)}
        {renderTab(TABS[1], 1)}
        <View style={{ width: '10%' }} />
        {renderTab(TABS[2], 2)}
        {renderTab(TABS[3], 3)}
      </Animated.View>

      <Animated.View style={[Style.fabWrap, { transform: [{ scale: fabScale }] }]}>
        <TouchableOpacity activeOpacity={0.9} onPress={pressFab} style={Style.fab}>
          <MCI name="camera-plus" size={30} color={C.black} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default TabBar;

const Style = StyleSheet.create({
  tabWrap: { position: 'absolute', left: 0, right: 0, alignItems: 'center' },
  tabBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', height: 55, marginHorizontal: 14,
    borderRadius: 26, backgroundColor: C.tabBar,
    borderWidth: StyleSheet.hairlineWidth, borderColor: '#38373A',
    paddingHorizontal: 4, alignSelf: 'stretch',
    ...Platform.select({ android: { elevation: 8 } }),
  },
  activePill: {
    position: 'absolute',
    top: 5,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 0.5,
    overflow: 'hidden',
  },
  /* same shape as activePill but lives outside the tabBar (higher z-order) */
  activePillOver: {
    position: 'absolute',
    top: 5,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 0.5,
    overflow: 'hidden',
  },
  specular: {
    position: 'absolute', top: 2, left: 14, right: 14, height: 2,
    borderRadius: 1, backgroundColor: 'rgba(255,255,255,0.70)',
  },
  tabItem: { paddingHorizontal: 10, height: 44, alignItems: 'center', justifyContent: 'center', minWidth: 56 },
  tabLabel: { color: C.text, fontSize: 9.5, marginTop: 2 },
  tabDot: { position: 'absolute', top: -1, right: -4, width: 6, height: 6, borderRadius: 3, backgroundColor: C.red },
  fabWrap: { position: 'absolute', top: -21, alignSelf: 'center' },
  fab: {
    width: 58, height: 58, borderRadius: 29, backgroundColor: C.teal,
    alignItems: 'center', justifyContent: 'center',
    ...Platform.select({ android: { elevation: 10 }, ios: { shadowColor: C.teal, shadowOpacity: 0.45, shadowRadius: 12, shadowOffset: { width: 0, height: 5 } } }),
  },
});