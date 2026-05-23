insert into storage.buckets (id, name, public) values ('camila-malaga-2026', 'camila-malaga-2026', true) on conflict (id) do nothing;

create policy "Public read malaga"
on storage.objects for select
using (bucket_id = 'camila-malaga-2026');
