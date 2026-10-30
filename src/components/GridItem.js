import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import C from '../theme/colors';
import IconCircle from './IconCircle';

const GridItem = ({ item, width }) => (
  <TouchableOpacity activeOpacity={0.7} style={{ width, alignItems: 'center', marginBottom: 18 }}>
    <IconCircle icon={item.icon} color={item.color} tint={item.tint || '#0D2420'} badge={item.badge} />
    <Text style={Style.gridLabel} numberOfLines={2}>
      {item.label}
    </Text>
  </TouchableOpacity>
);

export default GridItem;

const Style = StyleSheet.create({
  gridLabel: { color: C.text, fontSize: 11, textAlign: 'center', marginTop: 7, lineHeight: 13 },
});
