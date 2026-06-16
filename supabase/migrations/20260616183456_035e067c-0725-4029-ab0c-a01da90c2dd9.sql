-- Restore read + list access for the mateo-bautizo-2026 storage bucket
-- so that the future /recuerdos gallery can enumerate photos and videos.
-- Other buckets remain locked down.

DROP POLICY IF EXISTS "Public read for mateo-bautizo-2026" ON storage.objects;

CREATE POLICY "Public read for mateo-bautizo-2026"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'mateo-bautizo-2026');
