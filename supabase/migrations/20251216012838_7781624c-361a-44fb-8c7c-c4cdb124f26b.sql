-- Create storage bucket for library files
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'library-files',
  'library-files',
  true,
  52428800, -- 50MB limit
  ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
);

-- Storage policies for library files
CREATE POLICY "Anyone can view library files"
ON storage.objects FOR SELECT
USING (bucket_id = 'library-files');

CREATE POLICY "Admins can upload library files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'library-files' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update library files"
ON storage.objects FOR UPDATE
USING (bucket_id = 'library-files' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete library files"
ON storage.objects FOR DELETE
USING (bucket_id = 'library-files' AND has_role(auth.uid(), 'admin'));