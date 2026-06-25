import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WEEKS, PHASE_NAMES, PHASE_COLORS } from '@/constants/roadmap';
import type { Phase } from '@/constants/roadmap';

export default function RoadmapScreen() {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerBlock}>
        <Text style={styles.title}>Roadmap 12 semaines</Text>
        <Text style={styles.subtitle}>106 kg → objectif 92 kg</Text>
        <View style={styles.legend}>
          {([1, 2, 3] as Phase[]).map((p) => (
            <View key={p} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: PHASE_COLORS[p] }]} />
              <Text style={styles.legendText}>
                Ph.{p} {PHASE_NAMES[p]}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        {WEEKS.map((week) => {
          const color = PHASE_COLORS[week.phase];
          const isOpen = expandedWeek === week.week;

          return (
            <Pressable
              key={week.week}
              onPress={() => setExpandedWeek(isOpen ? null : week.week)}
            >
              <View style={[styles.weekCard, isOpen && { backgroundColor: '#1B3252' }]}>
                <View style={[styles.weekAccent, { backgroundColor: color }]} />
                <View style={styles.weekMain}>
                  <View style={styles.weekRow}>
                    <Text style={[styles.weekTag, { color }]}>S{week.week}</Text>
                    <Text style={styles.weekWeight}>
                      {week.weightMin}–{week.weightMax} kg
                    </Text>
                    <Text style={styles.weekMeta}>
                      {week.calories} kcal · {week.water}L
                    </Text>
                    <Text style={styles.chevron}>{isOpen ? '▲' : '▼'}</Text>
                  </View>

                  {isOpen && (
                    <View style={styles.detail}>
                      <View style={styles.detailBlock}>
                        <Text style={styles.detailLabel}>NUTRITION</Text>
                        <Text style={styles.detailText}>{week.nutritionRule}</Text>
                      </View>
                      <View style={styles.detailBlock}>
                        <Text style={styles.detailLabel}>SPORT</Text>
                        <Text style={styles.detailText}>{week.sport}</Text>
                      </View>
                      <View style={styles.pills}>
                        <Pill label={`${week.stepsGoal.toLocaleString('fr-FR')} pas`} color="#A78BFA" />
                        <Pill label={`Sommeil ${week.sleepGoal}`} color="#6EE7B7" />
                        <Pill label={`Taille ${week.waistChange}`} color="#FB7185" />
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </Pressable>
          );
        })}

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Synthèse mensuelle</Text>
          <SummaryRow month="Mois 1 (S4)" from="106 kg" to="100–101 kg" loss="-5 à -6 kg" />
          <SummaryRow month="Mois 2 (S8)" from="100–101 kg" to="95–96 kg" loss="-5 kg" />
          <SummaryRow month="Mois 3 (S12)" from="95–96 kg" to="91–92 kg" loss="-4 kg" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Pill({ label, color }: { label: string; color: string }) {
  return (
    <View style={[styles.pill, { backgroundColor: color + '20', borderColor: color + '60' }]}>
      <Text style={[styles.pillText, { color }]}>{label}</Text>
    </View>
  );
}

function SummaryRow({
  month,
  from,
  to,
  loss,
}: {
  month: string;
  from: string;
  to: string;
  loss: string;
}) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryMonth}>{month}</Text>
      <Text style={styles.summaryRange}>
        {from} → <Text style={styles.summaryTarget}>{to}</Text>
      </Text>
      <Text style={styles.summaryLoss}>{loss}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0F172A' },
  headerBlock: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12 },
  title: { color: '#F1F5F9', fontSize: 20, fontWeight: '800' },
  subtitle: { color: '#64748B', fontSize: 13, marginTop: 2, marginBottom: 10 },
  legend: { flexDirection: 'row', gap: 12 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { color: '#94A3B8', fontSize: 11 },
  list: { paddingHorizontal: 16, paddingBottom: 32 },
  weekCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    marginBottom: 8,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  weekAccent: { width: 4 },
  weekMain: { flex: 1, padding: 12 },
  weekRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  weekTag: { fontSize: 14, fontWeight: '800', width: 26 },
  weekWeight: { color: '#F1F5F9', fontSize: 13, fontWeight: '700', flex: 1 },
  weekMeta: { color: '#475569', fontSize: 11 },
  chevron: { color: '#475569', fontSize: 11 },
  detail: { marginTop: 12, gap: 10 },
  detailBlock: { gap: 3 },
  detailLabel: { color: '#475569', fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  detailText: { color: '#CBD5E1', fontSize: 13, lineHeight: 20 },
  pills: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  pill: { borderRadius: 20, borderWidth: 1, paddingHorizontal: 8, paddingVertical: 3 },
  pillText: { fontSize: 10, fontWeight: '600' },
  summaryCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    marginTop: 4,
  },
  summaryTitle: { color: '#F1F5F9', fontSize: 14, fontWeight: '700', marginBottom: 12 },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#0F172A',
    gap: 8,
  },
  summaryMonth: { color: '#64748B', fontSize: 11, fontWeight: '600', width: 80 },
  summaryRange: { color: '#94A3B8', fontSize: 12, flex: 1 },
  summaryTarget: { color: '#38BDF8', fontWeight: '700' },
  summaryLoss: { color: '#4ADE80', fontSize: 12, fontWeight: '700' },
});
