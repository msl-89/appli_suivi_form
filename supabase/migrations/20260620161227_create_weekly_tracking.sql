CREATE TABLE IF NOT EXISTS weekly_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  week_number integer NOT NULL CHECK (week_number BETWEEN 1 AND 12),
  weight_real numeric(5,1),
  waist_real numeric(5,1),
  comments text,
  sport_done boolean DEFAULT false,
  steps_done boolean DEFAULT false,
  sleep_done boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE weekly_tracking ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='weekly_tracking' AND policyname='select_weekly_tracking') THEN
    CREATE POLICY "select_weekly_tracking" ON weekly_tracking FOR SELECT TO anon USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='weekly_tracking' AND policyname='insert_weekly_tracking') THEN
    CREATE POLICY "insert_weekly_tracking" ON weekly_tracking FOR INSERT TO anon WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='weekly_tracking' AND policyname='update_weekly_tracking') THEN
    CREATE POLICY "update_weekly_tracking" ON weekly_tracking FOR UPDATE TO anon USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='weekly_tracking' AND policyname='delete_weekly_tracking') THEN
    CREATE POLICY "delete_weekly_tracking" ON weekly_tracking FOR DELETE TO anon USING (true);
  END IF;
END $$;
