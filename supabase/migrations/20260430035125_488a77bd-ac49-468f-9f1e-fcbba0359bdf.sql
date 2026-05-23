-- Create public storage bucket for Madrid birthday memories
INSERT INTO storage.buckets (id, name, public)
VALUES ('camila-madrid-2026', 'camila-madrid-2026', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Public read access for the bucket
CREATE POLICY "Public read camila-madrid-2026"
ON storage.objects
FOR SELECT
USING (bucket_id = 'camila-madrid-2026');
