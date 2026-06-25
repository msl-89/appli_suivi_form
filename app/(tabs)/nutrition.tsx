import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Coffee, Sun, Moon, AlertCircle, TrendingDown, TrendingUp } from 'lucide-react-native';
import { MENUS } from '@/constants/roadmap';

const MEAL_ICONS = [
  <Coffee color="#F59E0B" size={20} />,
  <Sun color="#38BDF8" size={20} />,
  <Moon color="#A78BFA" size={20} />,
];

const PHASE_RULES = [
  {
    phase: 'Phase 1',
    color: '#2563EB',
    rule: 'Féculents au dîner autorisés si sport effectué ce jour-là (100g max).',
  },
  {
    phase: 'Phase 2',
    color: '#EA580C',
    rule: 'Glucides uniquement au déjeuner dès S5. Dîner 100% protéines + légumes à partir de S8.',
  },
  {
    phase: 'Phase 3',
    color: '#16A34A',
    rule: 'Carb cycling : féculents complets uniquement le midi. Légumes uniquement le soir.',
  },
];

const HYDRATION = [
  { weeks: 'S1 – S4', amount: '2.5 L / jour' },
  { weeks: 'S5 – S6', amount: '2.6 L / jour' },
  { weeks: 'S7 – S8', amount: '2.7 L / jour' },
  { weeks: 'S9 – S12', amount: '2.8 L / jour' },
];

export default function NutritionScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Nutrition</Text>
        <Text style={styles.subtitle}>Menus types applicables chaque semaine</Text>

        <Text style={styles.sectionLabel}>REPAS QUOTIDIENS</Text>
        {MENUS.map((menu, i) => (
          <View key={i} style={styles.mealCard}>
            <View style={styles.mealHeader}>
              {MEAL_ICONS[i]}
              <Text style={styles.mealName}>{menu.meal}</Text>
            </View>
            <Text style={styles.mealDesc}>{menu.description}</Text>
            <View style={styles.noteRow}>
              <AlertCircle color="#F59E0B" size={12} />
              <Text style={styles.noteText}>{menu.note}</Text>
            </View>
          </View>
        ))}

        <Text style={styles.sectionLabel}>REGLES D'AJUSTEMENT</Text>
        <View style={styles.ruleCard}>
          <View style={styles.ruleRow}>
            <View style={[styles.ruleIcon, { backgroundColor: '#16A34A22' }]}>
              <TrendingDown color="#4ADE80" size={16} />
            </View>
            <View style={styles.ruleText}>
              <Text style={styles.ruleTitle}>Tu perds trop vite ?</Text>
              <Text style={styles.ruleDesc}>Ajoute 20g de flocons d'avoine au petit-déjeuner.</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.ruleRow}>
            <View style={[styles.ruleIcon, { backgroundColor: '#DC262622' }]}>
              <TrendingUp color="#FB7185" size={16} />
            </View>
            <View style={styles.ruleText}>
              <Text style={styles.ruleTitle}>Perte trop lente ?</Text>
              <Text style={styles.ruleDesc}>
                Supprime les féculents au dîner quoi qu'il arrive. Ajoute 10 min de marche par jour.
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionLabel}>PHASES ALIMENTAIRES</Text>
        {PHASE_RULES.map((r, i) => (
          <View key={i} style={styles.phaseCard}>
            <View style={[styles.phaseTag, { backgroundColor: r.color + '22' }]}>
              <Text style={[styles.phaseTagText, { color: r.color }]}>{r.phase}</Text>
            </View>
            <Text style={styles.phaseRule}>{r.rule}</Text>
          </View>
        ))}

        <Text style={styles.sectionLabel}>HYDRATATION</Text>
        <View style={styles.hydroCard}>
          {HYDRATION.map((h, i) => (
            <View
              key={i}
              style={[styles.hydroRow, i < HYDRATION.length - 1 && styles.hydroBorder]}
            >
              <Text style={styles.hydroWeeks}>{h.weeks}</Text>
              <Text style={styles.hydroAmount}>{h.amount}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0F172A' },
  content: { paddingHorizontal: 16, paddingBottom: 32 },
  title: { color: '#F1F5F9', fontSize: 20, fontWeight: '800', paddingTop: 16 },
  subtitle: { color: '#64748B', fontSize: 13, marginTop: 4, marginBottom: 20 },
  sectionLabel: {
    color: '#475569',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 10,
    marginTop: 4,
  },
  mealCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
  },
  mealHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  mealName: { color: '#F1F5F9', fontSize: 15, fontWeight: '700' },
  mealDesc: { color: '#CBD5E1', fontSize: 14, lineHeight: 22, marginBottom: 8 },
  noteRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    backgroundColor: '#0F172A',
    borderRadius: 8,
    padding: 8,
  },
  noteText: { color: '#F59E0B', fontSize: 12, lineHeight: 18, flex: 1 },
  ruleCard: { backgroundColor: '#1E293B', borderRadius: 16, padding: 16, marginBottom: 16 },
  ruleRow: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  ruleIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  ruleText: { flex: 1 },
  ruleTitle: { color: '#F1F5F9', fontSize: 13, fontWeight: '700', marginBottom: 4 },
  ruleDesc: { color: '#94A3B8', fontSize: 13, lineHeight: 20 },
  divider: { height: 1, backgroundColor: '#0F172A', marginVertical: 12 },
  phaseCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  phaseTag: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4, flexShrink: 0 },
  phaseTagText: { fontSize: 11, fontWeight: '700' },
  phaseRule: { color: '#94A3B8', fontSize: 13, lineHeight: 20, flex: 1 },
  hydroCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  hydroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    justifyContent: 'space-between',
  },
  hydroBorder: { borderBottomWidth: 1, borderBottomColor: '#0F172A' },
  hydroWeeks: { color: '#64748B', fontSize: 13 },
  hydroAmount: { color: '#38BDF8', fontSize: 14, fontWeight: '700' },
});
