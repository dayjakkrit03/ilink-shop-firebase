-- Fix the contacts table security by adding proper WITH CHECK clauses and ensuring authentication is required

-- Drop existing policies to recreate them with better security
DROP POLICY IF EXISTS "Users can view their own contacts" ON public.contacts;
DROP POLICY IF EXISTS "Users can create their own contacts" ON public.contacts;
DROP POLICY IF EXISTS "Users can update their own contacts" ON public.contacts;
DROP POLICY IF EXISTS "Users can delete their own contacts" ON public.contacts;

-- Create more secure policies that require authentication and proper user ownership
CREATE POLICY "Authenticated users can view their own contacts"
ON public.contacts
FOR SELECT
TO authenticated
USING (auth.uid() = uid);

CREATE POLICY "Authenticated users can create their own contacts"
ON public.contacts
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = uid);

CREATE POLICY "Authenticated users can update their own contacts"
ON public.contacts
FOR UPDATE
TO authenticated
USING (auth.uid() = uid)
WITH CHECK (auth.uid() = uid);

CREATE POLICY "Authenticated users can delete their own contacts"
ON public.contacts
FOR DELETE
TO authenticated
USING (auth.uid() = uid);

-- Ensure the uid column cannot be NULL (security requirement)
ALTER TABLE public.contacts ALTER COLUMN uid SET NOT NULL;

-- Add a constraint to ensure uid is always set to the authenticated user's ID
-- This prevents users from creating contacts for other users
CREATE OR REPLACE FUNCTION public.ensure_contact_user_id()
RETURNS TRIGGER AS $$
BEGIN
    -- Always set the uid to the current authenticated user
    IF TG_OP = 'INSERT' THEN
        NEW.uid := auth.uid();
    END IF;
    
    -- Prevent changing the uid on updates
    IF TG_OP = 'UPDATE' AND OLD.uid != NEW.uid THEN
        RAISE EXCEPTION 'Cannot change contact ownership';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger to automatically set and protect the uid
DROP TRIGGER IF EXISTS trigger_ensure_contact_user_id ON public.contacts;
CREATE TRIGGER trigger_ensure_contact_user_id
    BEFORE INSERT OR UPDATE ON public.contacts
    FOR EACH ROW
    EXECUTE FUNCTION public.ensure_contact_user_id();