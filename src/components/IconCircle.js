import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialDesignIcons as MCI } from '@react-native-vector-icons/material-design-icons';
import C from '../theme/colors';

const IconCircle = ({ icon, color, tint = '#10241f', size = 50, badge }) => (
  <View>
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: tint,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <MCI name={icon} size={size * 0.5} color={color} />
    </View>
    {badge ? (
      <View style={Style.newBadge}>
        <Text style={Style.newBadgeTxt}>{badge}</Text>
      </View>
    ) : null}
  </View>
);

export default IconCircle;

const Style = StyleSheet.create({
  newBadge: {
    position: 'absolute', top: -4, right: -8, backgroundColor: C.red,
    borderRadius: 7, paddingHorizontal: 5, paddingVertical: 1,
  },
  newBadgeTxt: { color: '#fff', fontSize: 8, fontWeight: '700', fontStyle: 'italic' },
});
