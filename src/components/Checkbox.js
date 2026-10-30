import React from 'react';
import { View, StyleSheet } from 'react-native';

const Checkbox = () => <View style={Style.checkbox} />;

export default Checkbox;

const Style = StyleSheet.create({
  checkbox: { width: 15, height: 15, borderRadius: 3, borderWidth: 1.2, borderColor: '#5A595D', marginLeft: 10 },
});
