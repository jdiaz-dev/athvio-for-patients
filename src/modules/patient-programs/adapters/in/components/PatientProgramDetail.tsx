import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useMemo, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Calendar, CalendarTouchableOpacityProps, ICalendarEventBase } from 'react-native-big-calendar';
import { useSelector } from 'react-redux';
import { ProgramsStackParamList } from 'src/modules/patient-programs/adapters/in/components/ProgramNavigator';
import { PatientProgram } from 'src/modules/patient-programs/adapters/out/patient-program';
import { ReduxStates } from 'src/shared/types/types';

type Props = NativeStackScreenProps<ProgramsStackParamList, 'PatientProgramDetail'>;

const PatientProgramDetail = ({ route }: Props) => {
  const { patientProgram } = route.params;
  const { data: patientProgramsState, error } = useSelector((state: ReduxStates) => state.patientPrograms.patientPrograms);
  const plan = patientProgramsState.find((pp) => pp.uuid === patientProgram);
  console.log('-----patientProgramsState', patientProgramsState);
  console.log('-----plan', plan?.plans);

  const [selectedPeriod, setSelectedPeriod] = useState('4weeks');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const scrollRef = useRef<ScrollView>(null);

  const periods = [
    { id: 'today', label: 'Today' },
    { id: 'weekly', label: 'Weekly' },
    { id: '2weeks', label: '2 Weeks' },
    { id: '4weeks', label: '4 Weeks' },
  ];

  const events: ICalendarEventBase[] = useMemo(() => {
    if (!plan?.plans) return [];

    return plan.plans.map((p) => ({
      title: p.uuid, // 👈 renders the uuid as the event title
      start: new Date(), // adjust field names to match your type
      end: new Date(),
    }));
  }, [plan]);

  const scrollLeft = () => scrollRef.current?.scrollTo({ x: 0, animated: true });
  const scrollRight = () => scrollRef.current?.scrollToEnd({ animated: true });

  const renderEvent = <T extends ICalendarEventBase>(event: T, touchableOpacityProps: CalendarTouchableOpacityProps) => {
    console.log('-----event', event);
    return (
      <TouchableOpacity {...touchableOpacityProps}>
        <View style={styles.dayCellPlaceholder}>
          <Text style={{ color: '#fff', fontSize: 10 }}>{event.title}</Text> {/* uuid shown here */}
        </View>
      </TouchableOpacity>
    );
  };

  const [date, setDate] = useState(new Date());

  /* const events: CalendarEvent[] = [
    {
      title: 'Nutrition Consultation',
      start: new Date(new Date().setHours(10, 0, 0, 0)),
      end: new Date(new Date().setHours(11, 0, 0, 0)),
    },
    {
      title: 'Patient Follow-up',
      start: new Date(new Date().setHours(14, 0, 0, 0)),
      end: new Date(new Date().setHours(15, 0, 0, 0)),
    },
  ]; */

  const renderHeader = (currentDate: Date) => {
    console.log('-----currentDate', currentDate);
    const goPrev = () => {
      const d = new Date(currentDate);
      d.setMonth(d.getMonth() - 1);
      setDate(d);
    };

    const goNext = () => {
      const d = new Date(currentDate);
      d.setMonth(d.getMonth() + 1);
      setDate(d);
    };

    const formatMonth = (d: Date) => d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={goPrev}>
          <Text style={styles.nav}>{'<<<<'}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{formatMonth(currentDate)}</Text>

        <TouchableOpacity onPress={goNext}>
          <Text style={styles.nav}>{'>>>>'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Custom renderer for date numbers using renderCustomDateForMonth
  const renderCustomDate = (date: Date) => {
    // Get the first day of the displayed month
    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);

    // Get what day of week the month starts on (0=Sunday, 6=Saturday)
    // We need to adjust for weekStartsOn={1} (Monday)
    let firstDayWeekday = firstDayOfMonth.getDay();
    // Convert Sunday=0 to Sunday=6, and shift everything so Monday=0
    firstDayWeekday = firstDayWeekday === 0 ? 6 : firstDayWeekday - 1;

    // Calculate the cell number (1-based)
    // For dates before the first day of month
    const diffTime = date.getTime() - firstDayOfMonth.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Cell number is: days from previous month + day of current/next month
    const cellNumber = firstDayWeekday + diffDays + 1;

    return (
      <View style={styles.customDateContainer}>
        <Text style={styles.customDateText}>{cellNumber}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={{ width: '100%' }}>
      <View style={styles.container}>
        {/* Period Selector */}
        {periods.map((period) => (
          <TouchableOpacity
            key={period.id}
            style={[styles.periodButton, selectedPeriod === period.id && styles.periodButtonActive]}
            onPress={() => setSelectedPeriod(period.id)}
          >
            <Text style={[styles.periodText, selectedPeriod === period.id && styles.periodTextActive]}>{period.label}</Text>
          </TouchableOpacity>
        ))}

        {/* Meal Section Header */}
        <View style={styles.sectionHeader}>
          <View style={styles.mealInfo}>
            <View style={styles.clockIcon}>
              <Text style={styles.clockText}>🕐</Text>
            </View>
            <View>
              <Text style={styles.mealTitle}>Breakfast</Text>
              <Text style={styles.mealTime}>08:00AM</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.deleteIcon}>🗑️</Text>
          </TouchableOpacity>
        </View>

        {/* Calendar View */}
        <View style={styles.calendarContainer}>
          <Calendar
            events={events}
            height={600}
            mode="month"
            date={selectedDate}
            swipeEnabled={false}
            showTime={false}
            renderEvent={renderEvent}
            // renderHeader={renderHeader}
            renderCustomDateForMonth={renderCustomDate}
            weekStartsOn={1} // Start week on Monday
            hideNowIndicator
            // renderHeaderForMonthView={() => <View>{4556}</View>}
            bodyContainerStyle={{ borderTopWidth: 1, width: '100%' }}
            // verticalScrollEnabled={true}
            theme={{
              palette: {
                primary: '#000000',
                gray: {
                  '100': '#1a1a1a',
                  '200': '#2a2a2a',
                  '300': '#3a3a3a',
                  '500': '#888888',
                  '800': '#ffffff',
                },
              },
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default PatientProgramDetail;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100vh',
    backgroundColor: '#000000',
  },
  periodSelector: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    flexShrink: 0,
  },
  periodContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  periodButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
    marginRight: 8,
  },
  periodButtonActive: {
    backgroundColor: '#0066ff',
  },
  periodText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  periodTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#000000',
    flexShrink: 0,
  },
  mealInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  clockIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clockText: {
    fontSize: 16,
  },
  mealTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  mealTime: {
    color: '#888888',
    fontSize: 14,
  },
  deleteButton: {
    padding: 8,
  },
  deleteIcon: {
    fontSize: 20,
  },
  calendarContainer: {
    width: '100%',
    paddingBottom: 170,
    backgroundColor: '#000000',
  },
  hiddenHeader: {
    // height: 0,
    overflow: 'hidden',
  },
  eventCell: {
    backgroundColor: 'transparent',
    padding: 0,
  },
  calendarCell: {
    backgroundColor: 'transparent',
  },
  calendarCellText: {
    color: 'transparent',
  },
  dayCell: {
    width: '100%',
    height: 90,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'yellow',
    position: 'absolute',
    top: -15,
  },
  dayCellImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  dayCellPlaceholder: {
    width: '100%',
    height: '100%',
  },
  dayCellLabel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
    backgroundColor: 'blue',
  },
  dayCellText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#111',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  nav: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  // Custom date rendering styles
  customDateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customDateText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});

const styles2 = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    // paddingVertical: 1,
    backgroundColor: '#f5f5f5',
  },
  /*  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  yearText: {
    fontSize: 12,
    color: '#666',
  }, */
});
