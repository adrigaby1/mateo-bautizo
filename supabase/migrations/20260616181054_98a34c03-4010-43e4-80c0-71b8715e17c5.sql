DROP POLICY IF EXISTS "Anyone can view rsvp_malaga" ON public.rsvp_malaga;
DROP POLICY IF EXISTS "Anyone can view rsvps" ON public.rsvps;
REVOKE SELECT ON public.rsvp_mateo FROM anon, authenticated;
REVOKE SELECT ON public.rsvp_malaga FROM anon, authenticated;
REVOKE SELECT ON public.rsvps FROM anon, authenticated;
DROP POLICY IF EXISTS "Public read camila-madrid-2026" ON storage.objects;
DROP POLICY IF EXISTS "Public read malaga" ON storage.objects;
DROP POLICY IF EXISTS "Public read mateo-bautizo-2026" ON storage.objects;