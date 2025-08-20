-- Enable Row Level Security on contacts table
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for contacts table using the correct column name (uid)
CREATE POLICY "Users can view their own contacts" 
ON public.contacts 
FOR SELECT 
USING (auth.uid() = uid);

CREATE POLICY "Users can create their own contacts" 
ON public.contacts 
FOR INSERT 
WITH CHECK (auth.uid() = uid);

CREATE POLICY "Users can update their own contacts" 
ON public.contacts 
FOR UPDATE 
USING (auth.uid() = uid);

CREATE POLICY "Users can delete their own contacts" 
ON public.contacts 
FOR DELETE 
USING (auth.uid() = uid);

-- Enable Row Level Security on userdata table 
-- Note: userdata table appears to be a legacy table with its own user system
-- Making it accessible only to authenticated users for now
ALTER TABLE public.userdata ENABLE ROW LEVEL SECURITY;

-- Create policy to restrict access to userdata (only authenticated users can see it)
CREATE POLICY "Only authenticated users can access userdata" 
ON public.userdata 
FOR ALL 
USING (auth.role() = 'authenticated');

-- Ensure profiles table has INSERT policy
CREATE POLICY "Users can create their own profiles" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);