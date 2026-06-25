import { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, Save } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
import { WEEKS } from '@/constants/roadmap';

interface TrackingRow {
  id?: string;
  week_number: number;
  weight_real: string;
  waist_real: string;
  comments: string;
  sport_done: boolean;
  steps_done: boolean;
  sleep_done: boolean;
}

function emptyRow(week: number): TrackingRow {
  return {
    week_number: week,
    weight_real: '',
    waist_real: '',
    comments: '',
    sport_done: false,
    steps_done: false,
    sleep_done: false,
  };
}

export default function SuiviScreen() {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [rows, setRows] = useState<Record<number, TrackingRow>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    const { data } = await supabase.from('weekly_tracking').select('*');
    if (data) {
      const map: Record<number, TrackingRow> = {};
      for (const d of data) {
        map[d.week_number] = {
          id: d.id,
          week_number: d.week_number,
          weight_real: d.weight_real?.toString() ?? '',
          waist_real: d.waist_real?.toString() ?? '',
          comments: d.comments ?? '',
          sport_done: d.sport_done ?? false,
          steps_done: d.steps_done ?? false,
          sleep_done: d.sleep_done ?? false,
        };
      }
      setRows(map);
    }
  }

  function getRow(week: number): TrackingRow {
    return rows[week] ?? emptyRow(week);
  }

  function updateField(week: number, field: keyof TrackingRow, value: string | boolean) {
    setRows((prev) => ({
      ...prev,
      [week]: { ...(prev[week] ?? emptyRow(week)), [field]: value },
    }));
    setSaved(false);
  }

  async function saveWeek() {
    setSaving(true);
    const row = getRow(selectedWeek);
    const payload = {
      week_number: selectedWeek,
      weight_real: row.weight_real ? parseFloat(row.weight_real) : null,
      waist_real: row.waist_real ? parseFloat(row.waist_real) : null,
      comments: row.comments || null,
      sport_done: row.sport_done,
      steps_done: row.steps_done,
      sleep_done: row.sleep_done,
      updated_at: new Date().toISOString(),
    };

    if (row.id) {
      await supabase.from('weekly_tracking').update(payload).eq('id', row.id);
    } else {
      const { data } = await supabase
        .from('weekly_tracking')
        .insert(payload)
        .select()
        .single();
      if (data) {
        setRows((prev) => ({
          ...prev,
          [selectedWeek]: { ...getRow(selectedWeek), id: data.id },
        }));
      }
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const row = getRow(selectedWeek);
  const week = WEEKS[selectedWeek - 1];

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Suivi hebdomadaire</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.weekTabs}
            contentContainerStyle={styles.weekTabsContent}
          >
            {WEEKS.map((w) => {
              const hasData = !!(rows[w.week]?.weight_real);
              const isSelected = selectedWeek === w.week;
              return (
                <Pressable
                  key={w.week}
                  onPress={() => {
                    setSelectedWeek(w.week);
                    setSaved(false);
                  }}
                  style={[styles.weekTab, isSelected && styles.weekTabActive]}
                >
                  <Text style={[styles.weekTabText, isSelected && styles.weekTabTextActive]}>
                    S{w.week}
                  </Text>
                  {hasData && <View style={styles.weekTabDot} />}
                </Pressable>
              );
            })}
          </ScrollView>

          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Semaine {selectedWeek}</Text>
            <Text style={styles.formSub}>
              Poids visé : {week.weightMin}–{week.weightMax} kg
            </Text>

            <View style={styles.inputRow}>
              <View style={styles.inputHalf}>
                <Text style={styles.inputLabel}>Ton poids (kg)</Text>
                <TextInput
                  style={styles.input}
                  value={row.weight_real}
                  onChangeText={(v) => updateField(selectedWeek, 'weight_real', v)}
                  placeholder="ex: 104.2"
                  placeholderTextColor="#475569"
                  keyboardType="decimal-pad"
                />
              </View>
              <View style={styles.inputHalf}>
                <Text style={styles.inputLabel}>Tour de taille (cm)</Text>
                <TextInput
                  style={styles.input}
                  value={row.waist_real}
                  onChangeText={(v) => updateField(selectedWeek, 'waist_real', v)}
                  placeholder="ex: 102"
                  placeholderTextColor="#475569"
                  keyboardType="decimal-pad"
                />
              </View>
            </View>

            <Text style={styles.inputLabel}>Commentaires</Text>
            <TextInput
              style={styles.inputMulti}
              value={row.comments}
              onChangeText={(v) => updateField(selectedWeek, 'comments', v)}
              placeholder="Comment s'est passée cette semaine ?"
              placeholderTextColor="#475569"
              multiline
              numberOfLines={3}
            />

            <Text style={[styles.inputLabel, { marginTop: 12 }]}>Checklist</Text>
            <View style={styles.checklist}>
              <CheckItem
                label="Sport effectué"
                checked={row.sport_done}
                onToggle={() => updateField(selectedWeek, 'sport_done', !row.sport_done)}
              />
              <CheckItem
                label={`${week.stepsGoal.toLocaleString('fr-FR')} pas`}
                checked={row.steps_done}
                onToggle={() => updateField(selectedWeek, 'steps_done', !row.steps_done)}
              />
              <CheckItem
                label={`Sommeil ${week.sleepGoal}`}
                checked={row.sleep_done}
                onToggle={() => updateField(selectedWeek, 'sleep_done', !row.sleep_done)}
              />
            </View>

            <Pressable
              style={[styles.saveBtn, saving && styles.saveBtnDisabled]}
              onPress={saveWeek}
              disabled={saving}
            >
              {saved ? <Check color="#0F172A" size={18} /> : <Save color="#0F172A" size={18} />}
              <Text style={styles.saveBtnText}>
                {saved ? 'Enregistré !' : saving ? 'Sauvegarde...' : 'Enregistrer'}
              </Text>
            </Pressable>
          </View>

          <View style={styles.tableSection}>
            <Text style={styles.tableTitle}>Récapitulatif complet</Text>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.cell, styles.cellHeader, { flex: 1 }]}>Sem.</Text>
                <Text style={[styles.cell, styles.cellHeader, { flex: 2 }]}>Visé</Text>
                <Text style={[styles.cell, styles.cellHeader, { flex: 2 }]}>Réel</Text>
                <Text style={[styles.cell, styles.cellHeader, { flex: 2 }]}>Taille</Text>
                <Text style={[styles.cell, styles.cellHeader, { flex: 1.5 }]}>Sport/Pas/Som</Text>
              </View>
              {WEEKS.map((w) => {
                const r = rows[w.week];
                const hasWeight = !!(r?.weight_real);
                const weightVal = hasWeight ? parseFloat(r.weight_real) : null;
                const onTarget = weightVal !== null && weightVal <= w.weightMax;
                return (
                  <Pressable key={w.week} onPress={() => setSelectedWeek(w.week)}>
                    <View
                      style={[
                        styles.tableRow,
                        selectedWeek === w.week && styles.tableRowSelected,
                      ]}
                    >
                      <Text style={[styles.cell, { flex: 1, color: '#38BDF8', fontWeight: '700' }]}>
                        S{w.week}
                      </Text>
                      <Text style={[styles.cell, { flex: 2, color: '#64748B' }]}>
                        {w.weightMin}–{w.weightMax}
                      </Text>
                      <Text
                        style={[
                          styles.cell,
                          {
                            flex: 2,
                            color: hasWeight ? (onTarget ? '#4ADE80' : '#FB7185') : '#334155',
                          },
                        ]}
                      >
                        {hasWeight ? r.weight_real : '—'}
                      </Text>
                      <Text style={[styles.cell, { flex: 2, color: '#94A3B8' }]}>
                        {r?.waist_real || '—'}
                      </Text>
                      <Text style={[styles.cell, { flex: 1.5, color: '#64748B', fontSize: 11 }]}>
                        {r?.sport_done ? '✓' : '·'} {r?.steps_done ? '✓' : '·'}{' '}
                        {r?.sleep_done ? '✓' : '·'}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function CheckItem({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <Pressable style={styles.checkItem} onPress={onToggle}>
      <View style={[styles.checkBox, checked && styles.checkBoxChecked]}>
        {checked && <Check color="#0F172A" size={12} />}
      </View>
      <Text style={[styles.checkLabel, checked && styles.checkLabelDone]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0F172A' },
  title: { color: '#F1F5F9', fontSize: 20, fontWeight: '800', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12 },
  weekTabs: { marginBottom: 12 },
  weekTabsContent: { paddingHorizontal: 16, gap: 8 },
  weekTab: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  weekTabActive: { backgroundColor: '#38BDF8' },
  weekTabText: { color: '#64748B', fontSize: 12, fontWeight: '700' },
  weekTabTextActive: { color: '#0F172A' },
  weekTabDot: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4ADE80',
  },
  formCard: {
    marginHorizontal: 16,
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  formTitle: { color: '#F1F5F9', fontSize: 16, fontWeight: '700', marginBottom: 2 },
  formSub: { color: '#64748B', fontSize: 12, marginBottom: 16 },
  inputRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  inputHalf: { flex: 1 },
  inputLabel: { color: '#64748B', fontSize: 11, fontWeight: '600', letterSpacing: 0.5, marginBottom: 6 },
  input: {
    backgroundColor: '#0F172A',
    color: '#F1F5F9',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  inputMulti: {
    backgroundColor: '#0F172A',
    color: '#F1F5F9',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    minHeight: 70,
    textAlignVertical: 'top',
    marginBottom: 4,
  },
  checklist: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#0F172A',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  checkBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#475569',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBoxChecked: { backgroundColor: '#38BDF8', borderColor: '#38BDF8' },
  checkLabel: { color: '#64748B', fontSize: 12 },
  checkLabelDone: { color: '#F1F5F9' },
  saveBtn: {
    backgroundColor: '#38BDF8',
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  saveBtnDisabled: { opacity: 0.5 },
  saveBtnText: { color: '#0F172A', fontSize: 15, fontWeight: '800' },
  tableSection: { marginHorizontal: 16, marginBottom: 32 },
  tableTitle: { color: '#64748B', fontSize: 11, fontWeight: '700', letterSpacing: 0.5, marginBottom: 8 },
  table: { backgroundColor: '#1E293B', borderRadius: 12, overflow: 'hidden' },
  tableRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#0F172A',
  },
  tableHeader: { backgroundColor: '#111827' },
  tableRowSelected: { backgroundColor: '#1B3252' },
  cell: { fontSize: 12, color: '#94A3B8' },
  cellHeader: { color: '#475569', fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
});
