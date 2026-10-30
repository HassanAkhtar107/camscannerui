import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import {
  Animated,
  View,
  TextInput,
  StyleSheet,
  Easing,
} from 'react-native';
import { MaterialDesignIcons as MCI } from '@react-native-vector-icons/material-design-icons';
import C from '../theme/colors';
import { SEARCH_HINTS } from '../data';

let nextHintIndex = 0;

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const RotatingSearch = ({ style }) => {
  const [hint] = useState(
    () => SEARCH_HINTS[nextHintIndex++ % SEARCH_HINTS.length],
  );
  const [text, setText] = useState('');

  const anim = useRef(new Animated.Value(0)).current;
  const shown = useRef(false);

  const placeholderColor = useMemo(
    () =>
      anim.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(153,153,153,0)', 'rgba(153,153,153,1)'],
      }),
    [anim],
  );

  const animateTo = useCallback(
    (toValue, duration, easing) => {
      Animated.timing(anim, {
        toValue,
        duration,
        easing,
        useNativeDriver: false,
      }).start();
    },
    [anim],
  );

  const showHint = useCallback(() => {
    if (shown.current) return;
    shown.current = true;
    animateTo(1, 320, Easing.out(Easing.cubic));
  }, [animateTo]);

  const hideHint = useCallback(() => {
    if (!shown.current) return;
    shown.current = false;
    animateTo(0, 220, Easing.in(Easing.cubic));
  }, [animateTo]);

  useEffect(() => {
    showHint();
  }, [showHint]);

  const onChangeText = useCallback(
    (val) => {
      setText(val);
      val.length > 0 ? hideHint() : showHint();
    },
    [hideHint, showHint],
  );

  return (
    <View style={[Style.searchBar, style]}>
      <MCI name="magnify" size={18} color={C.text} />
      <AnimatedTextInput
        style={Style.textInput}
        value={text}
        onChangeText={onChangeText}
        placeholder={hint}
        placeholderTextColor={placeholderColor}
        selectionColor={C.teal}
        cursorColor={C.teal}
        returnKeyType="search"
      />
    </View>
  );
};

export default RotatingSearch;

const Style = StyleSheet.create({
  searchBar: {
    height: 34,
    borderRadius: 17,
    backgroundColor: C.searchBg,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    overflow: 'hidden',
  },
  textInput: {
    flex: 1,
    color: C.text,
    fontSize: 12,
    marginLeft: 8,
    paddingVertical: 0,
    height: 34,
  },
});