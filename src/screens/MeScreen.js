import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import C from '../theme/colors';

const MeScreen = ({ insets }) => (
  <View style={{ flex: 1, backgroundColor: C.bg, paddingTop: insets.top + 20, paddingHorizontal: 16 }}>
    <Text style={Style.title}>Me</Text>
    <Text style={Style.sub}>Profile & settings go here.</Text>
  </View>
);

export default MeScreen;

const Style = StyleSheet.create({
  title: { color: C.text, fontSize: 17, fontWeight: '600' },
  sub: { color: C.sub, fontSize: 10.5, marginTop: 12 },
});
