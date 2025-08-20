-- Enable Row Level Security on contacts table
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for contacts table
CREATE POLICY "Users can view their own contacts" 
ON public.contacts 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own contacts" 
ON public.contacts 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own contacts" 
ON public.contacts 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own contacts" 
ON public.contacts 
FOR DELETE 
USING (auth.uid() = user_id);

-- Enable Row Level Security on userdata table
ALTER TABLE public.userdata ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for userdata table
CREATE POLICY "Users can view their own userdata" 
ON public.userdata 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own userdata" 
ON public.userdata 
FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Users can create their own userdata" 
ON public.userdata 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Enable Row Level Security on products table (public read access)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products" 
ON public.products 
FOR SELECT 
USING (true);

-- Enable Row Level Security on profiles table if not already enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles table
CREATE POLICY "Users can view their own profiles" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profiles" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profiles" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);