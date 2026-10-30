import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialDesignIcons as MCI } from '@react-native-vector-icons/material-design-icons';
import C from '../theme/colors';
import Checkbox from './Checkbox';

const DocRow = ({ doc, expanded }) => (
  <View>
    <View style={Style.docRow}>
      <Image source={{ uri: doc.thumb }} style={Style.thumb} />
      <View style={{ flex: 1, marginLeft: 14 }}>
        <Text style={Style.docTitle} numberOfLines={1}>{doc.title}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
          <Text style={Style.docMeta}>{doc.date}</Text>
          <View style={Style.metaDivider} />
          <MCI name="file-multiple-outline" size={12} color={C.sub} />
          <Text style={[Style.docMeta, { marginLeft: 3 }]}>{doc.pages}</Text>
        </View>
      </View>
      <Checkbox />
    </View>
    {expanded ? (
      <View style={Style.actionRow}>
        <TouchableOpacity style={Style.actionBtn}><Text style={Style.actionTxt}>Share</Text></TouchableOpacity>
        <TouchableOpacity style={Style.actionBtn}>
          <MCI name="star-four-points" size={13} color={C.tealSoft} />
          <Text style={[Style.actionTxt, { marginLeft: 5 }]}>To Word</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Style.actionBtn}><Text style={Style.actionTxt}>View</Text></TouchableOpacity>
      </View>
    ) : null}
  </View>
);

export default DocRow;

const Style = StyleSheet.create({
  docRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  thumb: { width: 46, height: 48, borderRadius: 3, backgroundColor: '#fff' },
  docTitle: { color: C.text, fontSize: 14, fontWeight: '500' },
  docMeta: { color: C.sub, fontSize: 10.5 },
  metaDivider: { width: 1, height: 9, backgroundColor: '#555', marginHorizontal: 8 },
  actionRow: { flexDirection: 'row', gap: 8, marginVertical: 6 },
  actionBtn: {
    flex: 1, height: 28, borderRadius: 4, backgroundColor: C.button,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
  },
  actionTxt: { color: C.text, fontSize: 11 },
});
