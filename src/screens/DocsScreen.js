import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { MaterialDesignIcons as MCI } from '@react-native-vector-icons/material-design-icons';
import C from '../theme/colors';
import { DOCS, DOC_TILES } from '../data';
import DocRow from '../components/DocRow';

const DocsScreen = ({ insets }) => (
  <View style={{ flex: 1, backgroundColor: C.bg }}>
    <ScrollView contentContainerStyle={{ paddingTop: insets.top + 6, paddingBottom: 140 }} showsVerticalScrollIndicator={false}>
      <View style={Style.docsHeader}>
        <View style={Style.benefits}>
          <View style={Style.cloudAvatar}><MCI name="cloud" size={14} color={C.blue} /></View>
          <Text style={Style.benefitsTxt}>Get Benefits</Text>
        </View>
        <View style={Style.smallSearch}>
          <MCI name="magnify" size={16} color={C.sub} />
          <TextInput placeholder="Search" placeholderTextColor={C.sub} style={Style.smallSearchInput} />
        </View>
      </View>

      <View style={Style.tilesRow}>
        {DOC_TILES.map((t) => (
          <TouchableOpacity key={t.label} activeOpacity={0.8} style={Style.tile}>
            <MCI name={t.icon} size={30} color={t.color} />
            <Text style={Style.tileTxt}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={Style.listPanel}>
        <View style={Style.listHead}>
          <Text style={Style.allTxt}>All</Text>
          <Text style={Style.allCount}> ({DOCS.length}) </Text>
          <MCI name="menu-down" size={14} color={C.text} />
          <View style={{ flex: 1 }} />
          <MCI name="sort" size={20} color={C.text} style={Style.headIcon} />
          <MCI name="view-grid-outline" size={20} color={C.text} style={Style.headIcon} />
          <MCI name="checkbox-marked-outline" size={20} color={C.text} style={Style.headIcon} />
        </View>

        <TouchableOpacity activeOpacity={0.8} style={Style.folderRow}>
          <MCI name="folder-edit" size={34} color={C.tealSoft} />
          <Text style={Style.folderTxt}>Signed Documents</Text>
        </TouchableOpacity>

        {DOCS.map((d) => (
          <DocRow key={d.id} doc={d} />
        ))}
      </View>
    </ScrollView>
  </View>
);

export default DocsScreen;

const Style = StyleSheet.create({
  docsHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingBottom: 14 },
  benefits: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  cloudAvatar: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  benefitsTxt: { color: C.text, fontSize: 10.5, marginLeft: 8 },
  smallSearch: {
    width: 132, height: 28, borderRadius: 14, backgroundColor: C.searchBg,
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8,
  },
  smallSearchInput: { color: C.text, fontSize: 11, marginLeft: 6, flex: 1, padding: 0 },
  tilesRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 11, paddingBottom: 14 },
  tile: {
    flex: 1, height: 68, borderRadius: 4, backgroundColor: C.surface,
    alignItems: 'center', justifyContent: 'center',
  },
  tileTxt: { color: C.text, fontSize: 10.5, marginTop: 6 },
  listPanel: { backgroundColor: C.surface, minHeight: 200, paddingBottom: 6, paddingHorizontal: 12, },
  listHead: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14 },
  allTxt: { color: C.text, fontSize: 15, fontWeight: '600' },
  allCount: { color: C.sub, fontSize: 10 },
  headIcon: { marginLeft: 18 },
  folderRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.card, height: 54, paddingHorizontal: 12, marginBottom: 6, borderRadius: 5 },
  folderTxt: { color: C.text, fontSize: 15, fontWeight: '500', marginLeft: 12 },
});
