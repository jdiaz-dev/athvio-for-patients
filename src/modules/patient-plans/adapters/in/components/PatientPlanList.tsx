import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, FlatList, ListRenderItem, View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { AuthContext } from 'src/modules/auth/adapters/in/context/AuthContext';
import { PatientPlanBody } from 'src/modules/patient-plans/adapters/out/patient-plan';
import { usePatientPlans } from 'src/modules/patient-plans/adapters/out/PatientPlanActions';
import { ReduxStates } from 'src/shared/types/types';
import PatientPlanItem from 'src/modules/patient-plans/adapters/in/components/PatientPlanItem';
import { PatientPlanTypeDates } from 'src/modules/patient-plans/adapters/out/enum';
import { useAppTheme } from 'src/shared/theme/ThemeContext';
import { useTheme } from 'react-native-paper';

// Render item function for PatientPlanItem
const renderItem: ListRenderItem<PatientPlanBody> = ({ item, index }) => {
  return <PatientPlanItem patientPlan={item} index={index} />;
};

function PatientPlanList() {
  const { patient } = useContext(AuthContext);
  const { getPatientPlans } = usePatientPlans();
  const { data: patientPlansState } = useSelector((state: ReduxStates) => state.patientPlans.patientPlans);
  const [activeTab, setActiveTab] = useState<PatientPlanTypeDates>(PatientPlanTypeDates.UPCOMING);
  const { theme, isDark } = useAppTheme();
  const paperTheme = useTheme();

  useEffect(() => {
    const getPatientPlansHelper = async () => {
      const now = new Date();
      const formattedDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0));
      if (patient) {
        const input = {
          patient,
          offset: 0,
          limit: 30,
          currentDate: formattedDate,
          patientPlanTypeDate: activeTab,
        };
        await getPatientPlans(input);
      }
    };
    getPatientPlansHelper();
  }, [patient, activeTab]);

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 20,
      backgroundColor: paperTheme.colors.background,
    },
    tabsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: paperTheme.colors.background,
      paddingVertical: 10,
    },
    tab: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 4,
    },
    activeTab: {
      backgroundColor: '#1C304C',
    },
    tabText: {
      color: isDark ? '#fff' : '#655e5e',
      fontSize: 16,
      fontWeight: 'bold',
    },
    activeTabText: {
      color: '#fff',
    },
  });

  return (
    <View style={{ flex: 1 }}>
      {/* Tabs Header */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === PatientPlanTypeDates.UPCOMING && styles.activeTab]}
          onPress={() => setActiveTab(PatientPlanTypeDates.UPCOMING)}
        >
          <Text style={[styles.tabText, activeTab === PatientPlanTypeDates.UPCOMING && styles.activeTabText]}>Próximo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === PatientPlanTypeDates.PAST && styles.activeTab]}
          onPress={() => setActiveTab(PatientPlanTypeDates.PAST)}
        >
          <Text style={[styles.tabText, activeTab === PatientPlanTypeDates.PAST && styles.activeTabText]}>Pasado</Text>
        </TouchableOpacity>
      </View>

      {/* Plans List */}
      <FlatList
        data={patientPlansState || []}
        renderItem={renderItem}
        keyExtractor={(item) => item.uuid}
        showsVerticalScrollIndicator={false}
        style={styles.container}
      />
    </View>
  );
}

export default PatientPlanList;
