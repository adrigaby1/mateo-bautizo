CREATE TABLE public.rsvp_malaga (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  respuesta BOOLEAN NOT NULL,
  mensaje TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.rsvp_malaga ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create rsvp_malaga"
ON public.rsvp_malaga
FOR INSERT
TO public
WITH CHECK (
  length(trim(nombre)) > 0
  AND length(nombre) <= 100
  AND (mensaje IS NULL OR length(mensaje) <= 500)
);

CREATE POLICY "Anyone can view rsvp_malaga"
ON public.rsvp_malaga
FOR SELECT
TO public
USING (true);