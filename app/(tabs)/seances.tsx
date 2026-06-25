import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check } from 'lucide-react-native';
import { WORKOUT_SESSIONS, WEEKS } from '@/constants/roadmap';

export default function SeancesScreen() {
  const [checkedExercises, setCheckedExercises] = useState<Record<string, boolean>>({});
  const [selectedWeek, setSelectedWeek] = useState(1);

  const week = WEEKS[selectedWeek - 1];

  function toggleExercise(key: string) {
    setCheckedExercises((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  const repsText = getRepsForWeek(selectedWeek);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Séances d'entraînement</Text>
        <Text style={styles.subtitle}>Circuits A & B — applicables sur 12 semaines</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.weekTabs}
          contentContainerStyle={styles.weekTabsContent}
        >
          {WEEKS.map((w) => (
            <Pressable
              key={w.week}
              onPress={() => {
                setSelectedWeek(w.week);
                setCheckedExercises({});
              }}
              style={[styles.weekTab, selectedWeek === w.week && styles.weekTabActive]}
            >
              <Text
                style={[
                  styles.weekTabText,
                  selectedWeek === w.week && styles.weekTabTextActive,
                ]}
              >
                S{w.week}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.weekInfoCard}>
          <Text style={styles.weekInfoLabel}>Programme S{selectedWeek}</Text>
          <Text style={styles.weekInfoReps}>{repsText}</Text>
          <Text style={styles.weekInfoSport}>{week.sport}</Text>
        </View>

        {WORKOUT_SESSIONS.map((session, si) => {
          const allDone = session.exercises.every((_, ei) =>
            checkedExercises[`${si}-${ei}`]
          );
          return (
            <View key={si} style={styles.sessionCard}>
              <View style={styles.sessionHeader}>
                <Text style={styles.sessionName}>{session.name}</Text>
                {allDone && (
                  <View style={styles.doneBadge}>
                    <Check color="#0F172A" size={12} />
                    <Text style={styles.doneText}>Terminé</Text>
                  </View>
                )}
              </View>

              <View style={styles.exerciseList}>
                {session.exercises.map((ex, ei) => {
                  const key = `${si}-${ei}`;
                  const done = !!checkedExercises[key];
                  return (
                    <Pressable
                      key={key}
                      style={[styles.exerciseRow, done && styles.exerciseRowDone]}
                      onPress={() => toggleExercise(key)}
                    >
                      <View style={[styles.exCheck, done && styles.exCheckDone]}>
                        {done && <Check color="#0F172A" size={14} />}
                      </View>
                      <View style={styles.exInfo}>
                        <Text style={[styles.exNum, done && styles.exTextDone]}>
                          Exercice {ei + 1}
                        </Text>
                        <Text style={[styles.exName, done && styles.exTextDone]}>{ex}</Text>
                      </View>
                      <Text style={[styles.exReps, done && styles.exTextDone]}>{repsText}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          );
        })}

        <View style={styles.gainingCard}>
          <Text style={styles.gainingTitle}>Progression du gainage</Text>
          {GAINAGE_PROGRESS.map((g, i) => (
            <View
              key={i}
              style={[styles.gainingRow, i < GAINAGE_PROGRESS.length - 1 && styles.gainingBorder]}
            >
              <Text style={styles.gainingWeeks}>{g.weeks}</Text>
              <Text style={styles.gainingDuration}>{g.duration}</Text>
            </View>
          ))}
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>Conseils de récupération</Text>
          {TIPS.map((tip, i) => (
            <View key={i} style={styles.tipRow}>
              <View style={styles.tipBullet} />
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function getRepsForWeek(week: number): string {
  if (week <= 1) return '3x12';
  if (week <= 2) return '3x15';
  if (week <= 3) return '3x15 (4 tours)';
  if (week <= 4) return '3x18';
  if (week <= 6) return '4x15';
  if (week <= 7) return '4x15';
  if (week <= 8) return '4x15 (5 tours)';
  return '4x12 (à échec)';
}

const GAINAGE_PROGRESS = [
  { weeks: 'S1 – S4', duration: '30 secondes' },
  { weeks: 'S5 – S7', duration: '45 secondes' },
  { weeks: 'S8 – S12', duration: '1 minute' },
];

const TIPS = [
  'Boire 500ml d\'eau avant chaque séance.',
  'Repos 48h entre deux séances muscu du même groupe.',
  'Étirements 10 min après chaque séance.',
  'Si douleur articulaire : pause 2 jours, pas musculaire.',
];

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0F172A' },
  content: { paddingHorizontal: 16, paddingBottom: 32 },
  title: { color: '#F1F5F9', fontSize: 20, fontWeight: '800', paddingTop: 16 },
  subtitle: { color: '#64748B', fontSize: 13, marginTop: 4, marginBottom: 16 },
  weekTabs: { marginBottom: 12, marginHorizontal: -16 },
  weekTabsContent: { paddingHorizontal: 16, gap: 8 },
  weekTab: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekTabActive: { backgroundColor: '#EA580C' },
  weekTabText: { color: '#64748B', fontSize: 12, fontWeight: '700' },
  weekTabTextActive: { color: '#fff' },
  weekInfoCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  weekInfoLabel: { color: '#64748B', fontSize: 11, fontWeight: '700', letterSpacing: 0.5, marginBottom: 4 },
  weekInfoReps: { color: '#38BDF8', fontSize: 18, fontWeight: '800', marginBottom: 8 },
  weekInfoSport: { color: '#94A3B8', fontSize: 13, lineHeight: 20 },
  sessionCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  sessionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sessionName: { color: '#F1F5F9', fontSize: 15, fontWeight: '700' },
  doneBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#4ADE80',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  doneText: { color: '#0F172A', fontSize: 11, fontWeight: '700' },
  exerciseList: { gap: 8 },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#0F172A',
    borderRadius: 10,
    padding: 12,
  },
  exerciseRowDone: { opacity: 0.6 },
  exCheck: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  exCheckDone: { backgroundColor: '#4ADE80', borderColor: '#4ADE80' },
  exInfo: { flex: 1 },
  exNum: { color: '#475569', fontSize: 10, fontWeight: '600' },
  exName: { color: '#E2E8F0', fontSize: 14, fontWeight: '600', marginTop: 1 },
  exReps: { color: '#38BDF8', fontSize: 12, fontWeight: '700', flexShrink: 0 },
  exTextDone: { color: '#475569' },
  gainingCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  gainingTitle: {
    color: '#F1F5F9',
    fontSize: 14,
    fontWeight: '700',
    padding: 16,
    paddingBottom: 8,
  },
  gainingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  gainingBorder: { borderBottomWidth: 1, borderBottomColor: '#0F172A' },
  gainingWeeks: { color: '#64748B', fontSize: 13 },
  gainingDuration: { color: '#38BDF8', fontSize: 13, fontWeight: '700' },
  tipCard: { backgroundColor: '#1E293B', borderRadius: 16, padding: 16 },
  tipTitle: { color: '#F1F5F9', fontSize: 14, fontWeight: '700', marginBottom: 12 },
  tipRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 8 },
  tipBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#38BDF8',
    marginTop: 5,
    flexShrink: 0,
  },
  tipText: { color: '#94A3B8', fontSize: 13, lineHeight: 20, flex: 1 },
});
