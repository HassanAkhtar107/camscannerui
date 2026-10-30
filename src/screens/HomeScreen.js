import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { MaterialDesignIcons as MCI } from '@react-native-vector-icons/material-design-icons';
import C from '../theme/colors';
import { DOCS, HOME_SHORTCUTS } from '../data';
import GridItem from '../components/GridItem';
import RotatingSearch from '../components/RotatingSearch';
import DocRow from '../components/DocRow';

const HomeScreen = ({ insets }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={{ backgroundColor: C.black, paddingTop: insets.top + 6 }}>
        <View style={Style.homeHeader}>
          <RotatingSearch style={{ flex: 1 }} />
          <MCI name="crown" size={24} color={C.gold} style={{ marginLeft: 14 }} />
        </View>
        <View style={Style.homeGrid}>
          {HOME_SHORTCUTS.map((it) => (
            <GridItem key={it.label} item={{ ...it, tint: '#0D2420' }} width={(width - 24) / 4} />
          ))}
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 140 }} showsVerticalScrollIndicator={false}>
        <View style={Style.recentsPanel}>
          <View style={Style.recentsHead}>
            <Text style={Style.recentsTitle}>Recents</Text>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={Style.viewAll}>View All</Text>
              <MCI name="chevron-right" size={14} color={C.sub} />
            </TouchableOpacity>
          </View>
          {DOCS.map((d, i) => (
            <DocRow key={d.id} doc={d} expanded={i === 0} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const Style = StyleSheet.create({
  homeHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingBottom: 14, backgroundColor: C.black },
  homeGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, paddingTop: 6, backgroundColor: C.bg },
  recentsPanel: { backgroundColor: C.surface, paddingHorizontal: 12, paddingBottom: 12 },
  recentsHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, paddingHorizontal: 2 },
  recentsTitle: { color: C.text, fontSize: 16, fontWeight: '600' },
  viewAll: { color: C.sub, fontSize: 11 },
});
