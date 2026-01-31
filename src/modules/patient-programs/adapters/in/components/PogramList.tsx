import React from 'react';
import { StyleSheet, View } from 'react-native';
import ProgramItem from 'src/modules/patient-programs/adapters/in/components/ProgramItem';

function PogramList() {
  return (
    <>
      <View style={styles.container}>
        PogramList
        <ProgramItem />
      </View>
    </>
  );
}

export default PogramList;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#2c9687',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
