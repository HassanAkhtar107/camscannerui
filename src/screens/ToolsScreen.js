import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { MaterialDesignIcons as MCI } from '@react-native-vector-icons/material-design-icons';
import C from '../theme/colors';
import { TOOL_SECTIONS } from '../data';
import GridItem from '../components/GridItem';

const ToolsScreen = ({ insets }) => {
  const { width } = useWindowDimensions();
  const colW = (width - 24) / 4;
  return (
    <View style={{ flex: 1, backgroundColor: C.black }}>
      <View style={[Style.toolsHeader, { paddingTop: insets.top + 10 }]}>
        <Text style={Style.toolsTitle}>Tools</Text>
        <TouchableOpacity style={Style.whatsNew}>
          <MCI name="file-document-outline" size={15} color={C.tealSoft} />
          <Text style={Style.whatsNewTxt}>What'Style New</Text>
          <View style={Style.whatsNewDot} />
        </TouchableOpacity>
        <MCI name="magnify" size={24} color={C.text} style={{ marginLeft: 14 }} />
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 150, paddingHorizontal: 12 }} showsVerticalScrollIndicator={false}>
        {TOOL_SECTIONS.map((sec) => (
          <View key={sec.title}>
            <Text style={Style.sectionTitle}>{sec.title}</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {sec.items.map((it) => (
                <GridItem key={it.label} item={it} width={colW} />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ToolsScreen;

const Style = StyleSheet.create({
  toolsHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 12 },
  toolsTitle: { color: C.text, fontSize: 17, fontWeight: '600', flex: 1 },
  whatsNew: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#0B2A26',
    paddingHorizontal: 10, height: 30, borderRadius: 4,
  },
  whatsNewTxt: { color: C.tealSoft, fontSize: 11, marginLeft: 6 },
  whatsNewDot: { position: 'absolute', top: -2, right: -2, width: 7, height: 7, borderRadius: 4, backgroundColor: C.red },
  sectionTitle: { color: C.text, fontSize: 13, fontWeight: '600', marginTop: 14, marginBottom: 14, marginLeft: 2 },
});
