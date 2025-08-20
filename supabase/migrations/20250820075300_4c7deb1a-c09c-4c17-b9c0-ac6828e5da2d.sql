-- Remove the overly permissive policy
DROP POLICY IF EXISTS "Only authenticated users can access userdata" ON public.userdata;

-- Add a column to link userdata to Supabase auth users (if not exists)
-- This will help us create proper user-specific policies
ALTER TABLE public.userdata 
ADD COLUMN IF NOT EXISTS auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create a more secure policy - users can only access their own data
-- For now, we'll restrict access entirely until proper user linking is implemented
CREATE POLICY "Users can only access their own userdata"
ON public.userdata
FOR ALL
USING (false); -- Completely restrict access for now

-- Create a policy for admins/system use only (using a function)
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN AS $$
BEGIN
  -- This function can be modified later to check for admin roles
  -- For now, it returns false to prevent any access
  RETURN false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE POLICY "Admin access to userdata"
ON public.userdata
FOR ALL
USING (public.is_admin_user());

-- Add index for performance on the new auth_user_id column
CREATE INDEX IF NOT EXISTS idx_userdata_auth_user_id ON public.userdata(auth_user_id);