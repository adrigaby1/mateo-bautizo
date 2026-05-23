CREATE TABLE public.rsvps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  attending BOOLEAN NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- Public invitation: anyone can read confirmations
CREATE POLICY "Anyone can view rsvps"
ON public.rsvps
FOR SELECT
USING (true);

-- Public invitation: anyone can submit a confirmation
CREATE POLICY "Anyone can create rsvps"
ON public.rsvps
FOR INSERT
WITH CHECK (
  length(trim(name)) > 0
  AND length(name) <= 100
  AND (message IS NULL OR length(message) <= 500)
);

CREATE INDEX idx_rsvps_created_at ON public.rsvps(created_at DESC);