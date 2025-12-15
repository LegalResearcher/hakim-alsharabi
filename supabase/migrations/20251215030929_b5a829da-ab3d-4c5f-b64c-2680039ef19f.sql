-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for admin access
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create library_categories table
CREATE TABLE public.library_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on library_categories
ALTER TABLE public.library_categories ENABLE ROW LEVEL SECURITY;

-- Everyone can view categories
CREATE POLICY "Anyone can view categories"
ON public.library_categories
FOR SELECT
TO anon, authenticated
USING (true);

-- Only admins can manage categories
CREATE POLICY "Admins can insert categories"
ON public.library_categories
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update categories"
ON public.library_categories
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete categories"
ON public.library_categories
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create library_files table for documents
CREATE TABLE public.library_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES public.library_categories(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL DEFAULT 'pdf',
    is_external BOOLEAN DEFAULT true,
    is_published BOOLEAN DEFAULT true,
    download_count INTEGER DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Enable RLS on library_files
ALTER TABLE public.library_files ENABLE ROW LEVEL SECURITY;

-- Everyone can view published files
CREATE POLICY "Anyone can view published files"
ON public.library_files
FOR SELECT
TO anon, authenticated
USING (is_published = true);

-- Admins can view all files
CREATE POLICY "Admins can view all files"
ON public.library_files
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can manage files
CREATE POLICY "Admins can insert files"
ON public.library_files
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update files"
ON public.library_files
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete files"
ON public.library_files
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_library_categories_updated_at
BEFORE UPDATE ON public.library_categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_library_files_updated_at
BEFORE UPDATE ON public.library_files
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default categories
INSERT INTO public.library_categories (name, slug, description, icon, sort_order) VALUES
('التشريعات والقوانين اليمنية', 'legislation', 'الدستور، القوانين، اللوائح، والاتفاقيات', 'Scale', 1),
('قواعد وأحكام قانونية وقضائية', 'rulings', 'أحكام قضائية وقواعد قانونية', 'Gavel', 2),
('بحوث ومراجع', 'research', 'بحوث قانونية ومراجع أكاديمية', 'BookOpen', 3),
('تشريعات وقوانين عربية', 'arab-laws', 'قوانين الدول العربية', 'Globe', 4),
('النماذج القانونية', 'templates', 'عقود، مذكرات، ونماذج قانونية', 'FileText', 5);