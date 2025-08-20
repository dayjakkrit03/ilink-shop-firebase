-- Remove the overly permissive public read policy for profiles
DROP POLICY IF EXISTS "Allow public read access" ON public.profiles;

-- Create a more secure policy - users can only view their own profiles
CREATE POLICY "Users can view their own profiles only"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

-- Optional: Create a policy for authenticated users to view basic profile info of others
-- This is commented out for maximum security, uncomment if needed for app functionality
-- CREATE POLICY "Authenticated users can view basic profile info"
-- ON public.profiles
-- FOR SELECT
-- USING (auth.role() = 'authenticated');

-- Ensure the existing update and insert policies are properly configured
-- Update the existing update policy to be more explicit
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profiles"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Ensure the insert policy exists and is properly configured
DROP POLICY IF EXISTS "Users can create their own profiles" ON public.profiles;
CREATE POLICY "Users can insert their own profiles"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = id);