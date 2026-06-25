import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Target, Droplets, Flame, Footprints, Moon, TrendingDown } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
import { WEEKS, PHASE_NAMES, PHASE_COLORS } from '@/constants/roadmap';

interface TrackingRecord {
  week_number: number;
  weight_real: number | null;
}

export default function DashboardScreen() {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [trackingData, setTrackingData] = useState<TrackingRecord[]>([]);

  useEffect(() => {
    loadTracking();
  }, []);

  async function loadTracking() {
    const { data } = await supabase
      .from('weekly_tracking')
      .select('week_number, weight_real')
      .order('week_number');
    if (data) {
      setTrackingData(data);
      const lastFilled = data.filter((d) => d.weight_real !== null);
      if (lastFilled.length > 0) {
        setCurrentWeek(Math.min(lastFilled[lastFilled.length - 1].week_number + 1, 12));
      }
    }
  }

  const week = WEEKS[currentWeek - 1];
  const phaseColor = PHASE_COLORS[week.phase];
  const phaseName = PHASE_NAMES[week.phase];

  const latestRecord = trackingData.filter((d) => d.weight_real !== null).pop();
  const currentWeight = latestRecord?.weight_real ?? 106;
  const startWeight = 106;
  const targetFinal = 92;
  const totalLoss = startWeight - currentWeight;
  const progress = Math.min(Math.max((totalLoss / (startWeight - targetFinal)) * 100, 0), 100);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.appName}>ROADMAP 12S</Text>
          <View style={[styles.phaseBadge, { backgroundColor: phaseColor + '22', borderColor: phaseColor }]}>
            <Text style={[styles.phaseText, { color: phaseColor }]}>
              Phase {week.phase} – {phaseName}
            </Text>
          </View>
        </View>

        <View style={styles.weekSelector}>
          <Pressable
            style={styles.weekBtn}
            onPress={() => setCurrentWeek((w) => Math.max(w - 1, 1))}
          >
            <Text style={styles.weekBtnText}>‹</Text>
          </Pressable>
          <View style={styles.weekCenter}>
            <Text style={styles.weekLabel}>SEMAINE</Text>
            <Text style={styles.weekNumber}>{currentWeek}</Text>
            <Text style={styles.weekLabel}>sur 12</Text>
          </View>
          <Pressable
            style={styles.weekBtn}
            onPress={() => setCurrentWeek((w) => Math.min(w + 1, 12))}
          >
            <Text style={styles.weekBtnText}>›</Text>
          </Pressable>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <TrendingDown color="#38BDF8" size={16} />
            <Text style={styles.progressTitle}>Progression globale</Text>
          </View>
          <View style={styles.progressRow}>
            <Text style={styles.progressValue}>{Number(currentWeight).toFixed(1)} kg</Text>
            <Text style={styles.progressArrow}> → </Text>
            <Text style={styles.progressTarget}>objectif {targetFinal} kg</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progress}%` as any }]} />
          </View>
          <Text style={styles.progressSub}>
            -{totalLoss.toFixed(1)} kg perdus · {(startWeight - targetFinal - totalLoss).toFixed(1)} kg restants
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Objectifs S{currentWeek}</Text>

        <View style={styles.statsGrid}>
          <StatCard icon={<Target color="#F59E0B" size={18} />} label="Poids visé" value={`${week.weightMin}–${week.weightMax} kg`} color="#F59E0B" />
          <StatCard icon={<Flame color="#EF4444" size={18} />} label="Calories" value={`${week.calories} kcal`} color="#EF4444" />
          <StatCard icon={<Droplets color="#38BDF8" size={18} />} label="Eau / jour" value={`${week.water} L`} color="#38BDF8" />
          <StatCard icon={<Footprints color="#A78BFA" size={18} />} label="Pas / jour" value={week.stepsGoal.toLocaleString('fr-FR')} color="#A78BFA" />
          <StatCard icon={<Moon color="#6EE7B7" size={18} />} label="Sommeil" value={week.sleepGoal} color="#6EE7B7" />
          <StatCard icon={<TrendingDown color="#FB7185" size={18} />} label="Tour taille" value={week.waistChange} color="#FB7185" />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>REGLE ALIMENTAIRE CLE</Text>
          <Text style={styles.cardText}>{week.nutritionRule}</Text>
        </View>

        <View style={[styles.card, { marginBottom: 32 }]}>
          <Text style={styles.cardLabel}>PROGRAMME SPORTIF</Text>
          <Text style={styles.cardText}>{week.sport}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <View style={[styles.statCard, { borderColor: color + '33' }]}>
      {icon}
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0F172A' },
  scroll: { flex: 1, paddingHorizontal: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 12,
  },
  appName: { color: '#F1F5F9', fontSize: 20, fontWeight: '800', letterSpacing: 1 },
  phaseBadge: { borderRadius: 20, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 4 },
  phaseText: { fontSize: 11, fontWeight: '700' },
  weekSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
  },
  weekBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekBtnText: { color: '#38BDF8', fontSize: 26, fontWeight: '700', lineHeight: 30 },
  weekCenter: { alignItems: 'center' },
  weekLabel: { color: '#475569', fontSize: 11, fontWeight: '600', letterSpacing: 1 },
  weekNumber: { color: '#F1F5F9', fontSize: 48, fontWeight: '800', lineHeight: 52 },
  progressCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  progressHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  progressTitle: { color: '#94A3B8', fontSize: 12, fontWeight: '600' },
  progressRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  progressValue: { color: '#F1F5F9', fontSize: 24, fontWeight: '800' },
  progressArrow: { color: '#475569', fontSize: 16 },
  progressTarget: { color: '#64748B', fontSize: 14 },
  progressBarBg: {
    height: 6,
    backgroundColor: '#0F172A',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: { height: 6, backgroundColor: '#38BDF8', borderRadius: 3 },
  progressSub: { color: '#475569', fontSize: 12 },
  sectionTitle: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 12,
    width: '31.5%',
    alignItems: 'center',
    borderWidth: 1,
    gap: 4,
  },
  statValue: { color: '#F1F5F9', fontSize: 12, fontWeight: '700', textAlign: 'center' },
  statLabel: { color: '#64748B', fontSize: 10, textAlign: 'center' },
  card: { backgroundColor: '#1E293B', borderRadius: 16, padding: 16, marginBottom: 12 },
  cardLabel: {
    color: '#475569',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  cardText: { color: '#E2E8F0', fontSize: 14, lineHeight: 22 },
});
