import React, { useEffect, useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import StageCanvas, { useDockClearance } from '../../widgets/StageCanvas';
import CresetTitle from '../../widgets/CresetTitle';
import CrownButton from '../../widgets/CrownButton';
import { DRILL_ROSTER } from '../../ledger/drillRoster';
import { HUE, RADIUS, SPACE, scale } from '../../palette/tokens';
import { useTrainingDiary } from '../../vault/TrainingDiary';

const WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const pad = (n: number) => String(n).padStart(2, '0');
const dateKey = (year: number, month: number, day: number) =>
  `${year}-${pad(month + 1)}-${pad(day)}`;
const today = new Date();

const TrainingDiaryStage: React.FC = () => {
  const clearance = useDockClearance();
  const diary = useTrainingDiary();
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(
    dateKey(today.getFullYear(), today.getMonth(), today.getDate()),
  );
  const [selectedDrills, setSelectedDrills] = useState<string[]>([]);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const days = new Date(year, month + 1, 0).getDate();
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  const cells = useMemo(
    () => [...Array(offset).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)],
    [offset, days],
  );

  useEffect(() => {
    setSelectedDrills(diary.entries[selectedDate]?.drills ?? []);
  }, [selectedDate, diary.entries]);

  const changeMonth = (delta: number) => {
    const next = new Date(year, month + delta, 1);
    setCursor(next);
    setSelectedDate(dateKey(next.getFullYear(), next.getMonth(), 1));
  };

  const toggleDrill = (id: string) =>
    setSelectedDrills(current =>
      current.includes(id) ? current.filter(item => item !== id) : [...current, id],
    );

  const save = () => {
    if (!selectedDrills.length) {
      Alert.alert('Choose exercises', 'Select at least one completed exercise.');
      return;
    }
    diary.saveEntry(selectedDate, selectedDrills);
    Alert.alert('Workout saved', 'Your training diary has been updated.');
  };

  const remove = () => {
    diary.removeEntry(selectedDate);
    setSelectedDrills([]);
  };

  return (
    <StageCanvas>
      <CresetTitle title="Training Diary" caption="Your completed workouts" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: clearance, paddingHorizontal: SPACE.lg }}
      >
        <View style={styles.calendar}>
          <View style={styles.monthRow}>
            <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.arrow}>
              <Text style={styles.arrowText}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.month}>{MONTHS[month]} {year}</Text>
            <TouchableOpacity onPress={() => changeMonth(1)} style={styles.arrow}>
              <Text style={styles.arrowText}>›</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.grid}>
            {WEEK.map(day => <Text key={day} style={styles.weekday}>{day}</Text>)}
            {cells.map((day, index) => {
              if (!day) return <View key={`blank-${index}`} style={styles.dayCell} />;
              const key = dateKey(year, month, day);
              const marked = !!diary.entries[key];
              const selected = selectedDate === key;
              return (
                <TouchableOpacity
                  key={key}
                  onPress={() => setSelectedDate(key)}
                  style={[styles.dayCell, selected && styles.daySelected]}
                >
                  <Text style={[styles.dayText, selected && styles.dayTextSelected]}>{day}</Text>
                  {marked && <View style={[styles.dot, selected && styles.dotSelected]} />}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <Text style={styles.sectionTitle}>WORKOUT FOR {selectedDate}</Text>
        <Text style={styles.helper}>Tap every exercise you completed, then save.</Text>
        {DRILL_ROSTER.map(drill => {
          const checked = selectedDrills.includes(drill.id);
          return (
            <TouchableOpacity
              key={drill.id}
              activeOpacity={0.82}
              onPress={() => toggleDrill(drill.id)}
              style={[styles.drill, checked && styles.drillChecked]}
            >
              <View style={[styles.check, checked && styles.checkOn]}>
                {checked && <Text style={styles.checkText}>✓</Text>}
              </View>
              <View style={styles.drillBody}>
                <Text style={styles.drillTitle}>{drill.title}</Text>
                <Text style={styles.drillMeta}>{drill.strand} · {drill.loads.beginner}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
        <CrownButton label="Save Workout" onPress={save} style={styles.save} />
        {diary.entries[selectedDate] && (
          <TouchableOpacity onPress={remove} style={styles.remove}>
            <Text style={styles.removeText}>Delete this workout</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </StageCanvas>
  );
};

const styles = StyleSheet.create({
  calendar: { backgroundColor: HUE.midnight, borderRadius: RADIUS.lg, borderWidth: 1, borderColor: HUE.outline, padding: SPACE.md },
  monthRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: SPACE.md },
  month: { color: HUE.ink, fontSize: scale(18, 16), fontWeight: '900' },
  arrow: { width: 38, height: 38, borderRadius: 19, backgroundColor: HUE.slate, alignItems: 'center', justifyContent: 'center' },
  arrowText: { color: HUE.amber, fontSize: 30, lineHeight: 32 },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  weekday: { width: '14.285%', color: HUE.ghost, fontSize: 9, fontWeight: '800', textAlign: 'center', marginBottom: 8 },
  dayCell: { width: '14.285%', aspectRatio: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 12 },
  daySelected: { backgroundColor: HUE.amber },
  dayText: { color: HUE.ink, fontSize: 13, fontWeight: '700' },
  dayTextSelected: { color: HUE.abyss, fontWeight: '900' },
  dot: { position: 'absolute', bottom: 5, width: 5, height: 5, borderRadius: 3, backgroundColor: HUE.mint },
  dotSelected: { backgroundColor: HUE.abyss },
  sectionTitle: { color: HUE.ghost, fontSize: 12, fontWeight: '800', letterSpacing: 1, marginTop: SPACE.lg },
  helper: { color: HUE.mist, fontSize: 13, marginTop: 5, marginBottom: 12 },
  drill: { flexDirection: 'row', alignItems: 'center', backgroundColor: HUE.midnight, borderRadius: RADIUS.md, borderWidth: 1, borderColor: HUE.outline, padding: 13, marginBottom: 10 },
  drillChecked: { borderColor: HUE.mint, backgroundColor: HUE.panelSoft },
  check: { width: 24, height: 24, borderRadius: 7, borderWidth: 2, borderColor: HUE.outline, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  checkOn: { backgroundColor: HUE.mint, borderColor: HUE.mint },
  checkText: { color: HUE.abyss, fontWeight: '900' },
  drillBody: { flex: 1 },
  drillTitle: { color: HUE.ink, fontSize: scale(14, 13), fontWeight: '800' },
  drillMeta: { color: HUE.mist, fontSize: 11, marginTop: 3 },
  save: { marginTop: SPACE.sm },
  remove: { alignItems: 'center', paddingVertical: 18 },
  removeText: { color: HUE.danger, fontSize: 14, fontWeight: '700' },
});

export default TrainingDiaryStage;
