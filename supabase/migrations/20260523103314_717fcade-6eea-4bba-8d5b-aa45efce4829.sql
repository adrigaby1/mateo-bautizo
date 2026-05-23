
-- Tabla RSVP para el evento de Mateo
CREATE TABLE public.rsvp_mateo (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  asistentes INTEGER NOT NULL DEFAULT 1,
  asistira BOOLEAN NOT NULL,
  mensaje TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.rsvp_mateo ENABLE ROW LEVEL SECURITY;

-- Inserts públicos con validación
CREATE POLICY "Anyone can create rsvp_mateo"
ON public.rsvp_mateo
FOR INSERT
TO public
WITH CHECK (
  length(trim(nombre)) > 0
  AND length(nombre) <= 100
  AND asistentes >= 1
  AND asistentes <= 20
  AND (mensaje IS NULL OR length(mensaje) <= 500)
);

-- NO se permite SELECT público — solo administrador (vía service role)
-- (no se crea política de SELECT a propósito)

-- Bucket público de almacenamiento para recuerdos futuros
INSERT INTO storage.buckets (id, name, public)
VALUES ('mateo-bautizo-2026', 'mateo-bautizo-2026', true)
ON CONFLICT (id) DO NOTHING;

-- Acceso público de lectura al bucket
CREATE POLICY "Public read mateo-bautizo-2026"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'mateo-bautizo-2026');
