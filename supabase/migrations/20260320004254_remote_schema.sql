drop extension if exists "pg_net";


  create table "public"."battle_brackets" (
    "id" uuid not null default extensions.uuid_generate_v4(),
    "event_id" uuid not null,
    "round" integer not null,
    "participant1_id" uuid,
    "participant2_id" uuid,
    "winner_id" uuid,
    "next_bracket_id" uuid,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."battle_brackets" enable row level security;


  create table "public"."event_participants" (
    "id" uuid not null default extensions.uuid_generate_v4(),
    "event_id" uuid not null,
    "user_id" uuid not null,
    "status" text default 'confirmed'::text,
    "registered_at" timestamp with time zone default now()
      );


alter table "public"."event_participants" enable row level security;


  create table "public"."event_roles" (
    "id" uuid not null default gen_random_uuid(),
    "event_id" uuid,
    "profile_id" uuid,
    "role" text,
    "notes" text,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."event_roles" enable row level security;


  create table "public"."events" (
    "id" uuid not null default extensions.uuid_generate_v4(),
    "creator_id" uuid not null,
    "title" text not null,
    "description" text,
    "event_type" text not null,
    "event_date" timestamp with time zone not null,
    "location" text not null,
    "address" text,
    "price" numeric(10,2) default 0,
    "max_participants" integer,
    "image_url" text,
    "styles" text[],
    "status" text default 'upcoming'::text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."events" enable row level security;


  create table "public"."organizers" (
    "id" uuid not null default extensions.uuid_generate_v4(),
    "profile_id" uuid,
    "organization_name" text,
    "phone" text,
    "website" text,
    "verified" boolean default false,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."organizers" enable row level security;


  create table "public"."profiles" (
    "id" uuid not null,
    "email" text,
    "full_name" text,
    "artistic_name" text,
    "current_location" text default 'Lisboa'::text,
    "bio" text,
    "avatar_url" text,
    "instagram_handle" text,
    "website" text,
    "phone" text,
    "is_freelancer" boolean default false,
    "user_type" text default 'user'::text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."profiles" enable row level security;


  create table "public"."ratings" (
    "id" uuid not null default extensions.uuid_generate_v4(),
    "rated_user_id" uuid not null,
    "rater_user_id" uuid not null,
    "event_id" uuid,
    "rating" integer,
    "comment" text,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."ratings" enable row level security;


  create table "public"."workshop_offers" (
    "id" uuid not null default extensions.uuid_generate_v4(),
    "artist_id" uuid not null,
    "title" text not null,
    "description" text,
    "price_per_hour" numeric(10,2),
    "price_per_workshop" numeric(10,2),
    "styles_taught" text[],
    "can_travel" boolean default true,
    "travel_info" text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."workshop_offers" enable row level security;

CREATE UNIQUE INDEX battle_brackets_pkey ON public.battle_brackets USING btree (id);

CREATE UNIQUE INDEX event_participants_event_id_user_id_key ON public.event_participants USING btree (event_id, user_id);

CREATE UNIQUE INDEX event_participants_pkey ON public.event_participants USING btree (id);

CREATE UNIQUE INDEX event_roles_event_id_profile_id_role_key ON public.event_roles USING btree (event_id, profile_id, role);

CREATE UNIQUE INDEX event_roles_pkey ON public.event_roles USING btree (id);

CREATE UNIQUE INDEX events_pkey ON public.events USING btree (id);

CREATE INDEX idx_event_participants_event ON public.event_participants USING btree (event_id);

CREATE INDEX idx_event_participants_user ON public.event_participants USING btree (user_id);

CREATE INDEX idx_event_roles_event ON public.event_roles USING btree (event_id);

CREATE INDEX idx_event_roles_profile ON public.event_roles USING btree (profile_id);

CREATE INDEX idx_events_date ON public.events USING btree (event_date);

CREATE INDEX idx_events_location ON public.events USING btree (location);

CREATE INDEX idx_events_type ON public.events USING btree (event_type);

CREATE INDEX idx_profiles_location ON public.profiles USING btree (current_location);

CREATE INDEX idx_profiles_user_type ON public.profiles USING btree (user_type);

CREATE INDEX idx_workshop_offers_artist ON public.workshop_offers USING btree (artist_id);

CREATE UNIQUE INDEX organizers_pkey ON public.organizers USING btree (id);

CREATE UNIQUE INDEX organizers_profile_id_key ON public.organizers USING btree (profile_id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX ratings_pkey ON public.ratings USING btree (id);

CREATE UNIQUE INDEX ratings_rated_user_id_rater_user_id_event_id_key ON public.ratings USING btree (rated_user_id, rater_user_id, event_id);

CREATE UNIQUE INDEX workshop_offers_pkey ON public.workshop_offers USING btree (id);

alter table "public"."battle_brackets" add constraint "battle_brackets_pkey" PRIMARY KEY using index "battle_brackets_pkey";

alter table "public"."event_participants" add constraint "event_participants_pkey" PRIMARY KEY using index "event_participants_pkey";

alter table "public"."event_roles" add constraint "event_roles_pkey" PRIMARY KEY using index "event_roles_pkey";

alter table "public"."events" add constraint "events_pkey" PRIMARY KEY using index "events_pkey";

alter table "public"."organizers" add constraint "organizers_pkey" PRIMARY KEY using index "organizers_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."ratings" add constraint "ratings_pkey" PRIMARY KEY using index "ratings_pkey";

alter table "public"."workshop_offers" add constraint "workshop_offers_pkey" PRIMARY KEY using index "workshop_offers_pkey";

alter table "public"."battle_brackets" add constraint "battle_brackets_event_id_fkey" FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE not valid;

alter table "public"."battle_brackets" validate constraint "battle_brackets_event_id_fkey";

alter table "public"."battle_brackets" add constraint "battle_brackets_next_bracket_id_fkey" FOREIGN KEY (next_bracket_id) REFERENCES public.battle_brackets(id) not valid;

alter table "public"."battle_brackets" validate constraint "battle_brackets_next_bracket_id_fkey";

alter table "public"."battle_brackets" add constraint "battle_brackets_participant1_id_fkey" FOREIGN KEY (participant1_id) REFERENCES public.profiles(id) not valid;

alter table "public"."battle_brackets" validate constraint "battle_brackets_participant1_id_fkey";

alter table "public"."battle_brackets" add constraint "battle_brackets_participant2_id_fkey" FOREIGN KEY (participant2_id) REFERENCES public.profiles(id) not valid;

alter table "public"."battle_brackets" validate constraint "battle_brackets_participant2_id_fkey";

alter table "public"."battle_brackets" add constraint "battle_brackets_winner_id_fkey" FOREIGN KEY (winner_id) REFERENCES public.profiles(id) not valid;

alter table "public"."battle_brackets" validate constraint "battle_brackets_winner_id_fkey";

alter table "public"."event_participants" add constraint "event_participants_event_id_fkey" FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE not valid;

alter table "public"."event_participants" validate constraint "event_participants_event_id_fkey";

alter table "public"."event_participants" add constraint "event_participants_event_id_user_id_key" UNIQUE using index "event_participants_event_id_user_id_key";

alter table "public"."event_participants" add constraint "event_participants_status_check" CHECK ((status = ANY (ARRAY['confirmed'::text, 'waiting_list'::text, 'cancelled'::text]))) not valid;

alter table "public"."event_participants" validate constraint "event_participants_status_check";

alter table "public"."event_participants" add constraint "event_participants_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE not valid;

alter table "public"."event_participants" validate constraint "event_participants_user_id_fkey";

alter table "public"."event_roles" add constraint "event_roles_event_id_fkey" FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE not valid;

alter table "public"."event_roles" validate constraint "event_roles_event_id_fkey";

alter table "public"."event_roles" add constraint "event_roles_event_id_profile_id_role_key" UNIQUE using index "event_roles_event_id_profile_id_role_key";

alter table "public"."event_roles" add constraint "event_roles_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES public.profiles(id) ON DELETE CASCADE not valid;

alter table "public"."event_roles" validate constraint "event_roles_profile_id_fkey";

alter table "public"."event_roles" add constraint "event_roles_role_check" CHECK ((role = ANY (ARRAY['winner'::text, 'top3'::text, 'host'::text, 'judge'::text, 'dj'::text, 'mc'::text, 'participant'::text]))) not valid;

alter table "public"."event_roles" validate constraint "event_roles_role_check";

alter table "public"."events" add constraint "events_creator_id_fkey" FOREIGN KEY (creator_id) REFERENCES public.profiles(id) ON DELETE CASCADE not valid;

alter table "public"."events" validate constraint "events_creator_id_fkey";

alter table "public"."events" add constraint "events_event_type_check" CHECK ((event_type = ANY (ARRAY['battle'::text, 'workshop'::text, 'cypher'::text, 'jam'::text, 'other'::text]))) not valid;

alter table "public"."events" validate constraint "events_event_type_check";

alter table "public"."events" add constraint "events_status_check" CHECK ((status = ANY (ARRAY['upcoming'::text, 'ongoing'::text, 'finished'::text, 'cancelled'::text]))) not valid;

alter table "public"."events" validate constraint "events_status_check";

alter table "public"."organizers" add constraint "organizers_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES public.profiles(id) ON DELETE CASCADE not valid;

alter table "public"."organizers" validate constraint "organizers_profile_id_fkey";

alter table "public"."organizers" add constraint "organizers_profile_id_key" UNIQUE using index "organizers_profile_id_key";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."profiles" add constraint "profiles_user_type_check" CHECK ((user_type = ANY (ARRAY['user'::text, 'artist'::text, 'organizer'::text]))) not valid;

alter table "public"."profiles" validate constraint "profiles_user_type_check";

alter table "public"."ratings" add constraint "ratings_event_id_fkey" FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE SET NULL not valid;

alter table "public"."ratings" validate constraint "ratings_event_id_fkey";

alter table "public"."ratings" add constraint "ratings_rated_user_id_fkey" FOREIGN KEY (rated_user_id) REFERENCES public.profiles(id) ON DELETE CASCADE not valid;

alter table "public"."ratings" validate constraint "ratings_rated_user_id_fkey";

alter table "public"."ratings" add constraint "ratings_rated_user_id_rater_user_id_event_id_key" UNIQUE using index "ratings_rated_user_id_rater_user_id_event_id_key";

alter table "public"."ratings" add constraint "ratings_rater_user_id_fkey" FOREIGN KEY (rater_user_id) REFERENCES public.profiles(id) ON DELETE CASCADE not valid;

alter table "public"."ratings" validate constraint "ratings_rater_user_id_fkey";

alter table "public"."ratings" add constraint "ratings_rating_check" CHECK (((rating >= 1) AND (rating <= 5))) not valid;

alter table "public"."ratings" validate constraint "ratings_rating_check";

alter table "public"."workshop_offers" add constraint "workshop_offers_artist_id_fkey" FOREIGN KEY (artist_id) REFERENCES public.profiles(id) ON DELETE CASCADE not valid;

alter table "public"."workshop_offers" validate constraint "workshop_offers_artist_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, user_type, created_at, updated_at)
  VALUES (
    NEW.id, 
    NEW.email, 
    NEW.raw_user_meta_data->>'full_name', 
    'user', 
    NOW(), 
    NOW()
  );
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.rls_auto_enable()
 RETURNS event_trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'pg_catalog'
AS $function$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN
    SELECT *
    FROM pg_event_trigger_ddl_commands()
    WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
      AND object_type IN ('table','partitioned table')
  LOOP
     IF cmd.schema_name IS NOT NULL AND cmd.schema_name IN ('public') AND cmd.schema_name NOT IN ('pg_catalog','information_schema') AND cmd.schema_name NOT LIKE 'pg_toast%' AND cmd.schema_name NOT LIKE 'pg_temp%' THEN
      BEGIN
        EXECUTE format('alter table if exists %s enable row level security', cmd.object_identity);
        RAISE LOG 'rls_auto_enable: enabled RLS on %', cmd.object_identity;
      EXCEPTION
        WHEN OTHERS THEN
          RAISE LOG 'rls_auto_enable: failed to enable RLS on %', cmd.object_identity;
      END;
     ELSE
        RAISE LOG 'rls_auto_enable: skip % (either system schema or not in enforced list: %.)', cmd.object_identity, cmd.schema_name;
     END IF;
  END LOOP;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$
;

grant delete on table "public"."battle_brackets" to "anon";

grant insert on table "public"."battle_brackets" to "anon";

grant references on table "public"."battle_brackets" to "anon";

grant select on table "public"."battle_brackets" to "anon";

grant trigger on table "public"."battle_brackets" to "anon";

grant truncate on table "public"."battle_brackets" to "anon";

grant update on table "public"."battle_brackets" to "anon";

grant delete on table "public"."battle_brackets" to "authenticated";

grant insert on table "public"."battle_brackets" to "authenticated";

grant references on table "public"."battle_brackets" to "authenticated";

grant select on table "public"."battle_brackets" to "authenticated";

grant trigger on table "public"."battle_brackets" to "authenticated";

grant truncate on table "public"."battle_brackets" to "authenticated";

grant update on table "public"."battle_brackets" to "authenticated";

grant delete on table "public"."battle_brackets" to "service_role";

grant insert on table "public"."battle_brackets" to "service_role";

grant references on table "public"."battle_brackets" to "service_role";

grant select on table "public"."battle_brackets" to "service_role";

grant trigger on table "public"."battle_brackets" to "service_role";

grant truncate on table "public"."battle_brackets" to "service_role";

grant update on table "public"."battle_brackets" to "service_role";

grant delete on table "public"."event_participants" to "anon";

grant insert on table "public"."event_participants" to "anon";

grant references on table "public"."event_participants" to "anon";

grant select on table "public"."event_participants" to "anon";

grant trigger on table "public"."event_participants" to "anon";

grant truncate on table "public"."event_participants" to "anon";

grant update on table "public"."event_participants" to "anon";

grant delete on table "public"."event_participants" to "authenticated";

grant insert on table "public"."event_participants" to "authenticated";

grant references on table "public"."event_participants" to "authenticated";

grant select on table "public"."event_participants" to "authenticated";

grant trigger on table "public"."event_participants" to "authenticated";

grant truncate on table "public"."event_participants" to "authenticated";

grant update on table "public"."event_participants" to "authenticated";

grant delete on table "public"."event_participants" to "service_role";

grant insert on table "public"."event_participants" to "service_role";

grant references on table "public"."event_participants" to "service_role";

grant select on table "public"."event_participants" to "service_role";

grant trigger on table "public"."event_participants" to "service_role";

grant truncate on table "public"."event_participants" to "service_role";

grant update on table "public"."event_participants" to "service_role";

grant delete on table "public"."event_roles" to "anon";

grant insert on table "public"."event_roles" to "anon";

grant references on table "public"."event_roles" to "anon";

grant select on table "public"."event_roles" to "anon";

grant trigger on table "public"."event_roles" to "anon";

grant truncate on table "public"."event_roles" to "anon";

grant update on table "public"."event_roles" to "anon";

grant delete on table "public"."event_roles" to "authenticated";

grant insert on table "public"."event_roles" to "authenticated";

grant references on table "public"."event_roles" to "authenticated";

grant select on table "public"."event_roles" to "authenticated";

grant trigger on table "public"."event_roles" to "authenticated";

grant truncate on table "public"."event_roles" to "authenticated";

grant update on table "public"."event_roles" to "authenticated";

grant delete on table "public"."event_roles" to "service_role";

grant insert on table "public"."event_roles" to "service_role";

grant references on table "public"."event_roles" to "service_role";

grant select on table "public"."event_roles" to "service_role";

grant trigger on table "public"."event_roles" to "service_role";

grant truncate on table "public"."event_roles" to "service_role";

grant update on table "public"."event_roles" to "service_role";

grant delete on table "public"."events" to "anon";

grant insert on table "public"."events" to "anon";

grant references on table "public"."events" to "anon";

grant select on table "public"."events" to "anon";

grant trigger on table "public"."events" to "anon";

grant truncate on table "public"."events" to "anon";

grant update on table "public"."events" to "anon";

grant delete on table "public"."events" to "authenticated";

grant insert on table "public"."events" to "authenticated";

grant references on table "public"."events" to "authenticated";

grant select on table "public"."events" to "authenticated";

grant trigger on table "public"."events" to "authenticated";

grant truncate on table "public"."events" to "authenticated";

grant update on table "public"."events" to "authenticated";

grant delete on table "public"."events" to "service_role";

grant insert on table "public"."events" to "service_role";

grant references on table "public"."events" to "service_role";

grant select on table "public"."events" to "service_role";

grant trigger on table "public"."events" to "service_role";

grant truncate on table "public"."events" to "service_role";

grant update on table "public"."events" to "service_role";

grant delete on table "public"."organizers" to "anon";

grant insert on table "public"."organizers" to "anon";

grant references on table "public"."organizers" to "anon";

grant select on table "public"."organizers" to "anon";

grant trigger on table "public"."organizers" to "anon";

grant truncate on table "public"."organizers" to "anon";

grant update on table "public"."organizers" to "anon";

grant delete on table "public"."organizers" to "authenticated";

grant insert on table "public"."organizers" to "authenticated";

grant references on table "public"."organizers" to "authenticated";

grant select on table "public"."organizers" to "authenticated";

grant trigger on table "public"."organizers" to "authenticated";

grant truncate on table "public"."organizers" to "authenticated";

grant update on table "public"."organizers" to "authenticated";

grant delete on table "public"."organizers" to "service_role";

grant insert on table "public"."organizers" to "service_role";

grant references on table "public"."organizers" to "service_role";

grant select on table "public"."organizers" to "service_role";

grant trigger on table "public"."organizers" to "service_role";

grant truncate on table "public"."organizers" to "service_role";

grant update on table "public"."organizers" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

grant delete on table "public"."ratings" to "anon";

grant insert on table "public"."ratings" to "anon";

grant references on table "public"."ratings" to "anon";

grant select on table "public"."ratings" to "anon";

grant trigger on table "public"."ratings" to "anon";

grant truncate on table "public"."ratings" to "anon";

grant update on table "public"."ratings" to "anon";

grant delete on table "public"."ratings" to "authenticated";

grant insert on table "public"."ratings" to "authenticated";

grant references on table "public"."ratings" to "authenticated";

grant select on table "public"."ratings" to "authenticated";

grant trigger on table "public"."ratings" to "authenticated";

grant truncate on table "public"."ratings" to "authenticated";

grant update on table "public"."ratings" to "authenticated";

grant delete on table "public"."ratings" to "service_role";

grant insert on table "public"."ratings" to "service_role";

grant references on table "public"."ratings" to "service_role";

grant select on table "public"."ratings" to "service_role";

grant trigger on table "public"."ratings" to "service_role";

grant truncate on table "public"."ratings" to "service_role";

grant update on table "public"."ratings" to "service_role";

grant delete on table "public"."workshop_offers" to "anon";

grant insert on table "public"."workshop_offers" to "anon";

grant references on table "public"."workshop_offers" to "anon";

grant select on table "public"."workshop_offers" to "anon";

grant trigger on table "public"."workshop_offers" to "anon";

grant truncate on table "public"."workshop_offers" to "anon";

grant update on table "public"."workshop_offers" to "anon";

grant delete on table "public"."workshop_offers" to "authenticated";

grant insert on table "public"."workshop_offers" to "authenticated";

grant references on table "public"."workshop_offers" to "authenticated";

grant select on table "public"."workshop_offers" to "authenticated";

grant trigger on table "public"."workshop_offers" to "authenticated";

grant truncate on table "public"."workshop_offers" to "authenticated";

grant update on table "public"."workshop_offers" to "authenticated";

grant delete on table "public"."workshop_offers" to "service_role";

grant insert on table "public"."workshop_offers" to "service_role";

grant references on table "public"."workshop_offers" to "service_role";

grant select on table "public"."workshop_offers" to "service_role";

grant trigger on table "public"."workshop_offers" to "service_role";

grant truncate on table "public"."workshop_offers" to "service_role";

grant update on table "public"."workshop_offers" to "service_role";


  create policy "Participants can view their participations"
  on "public"."event_participants"
  as permissive
  for select
  to public
using (((auth.uid() = user_id) OR (auth.uid() IN ( SELECT events.creator_id
   FROM public.events
  WHERE (events.id = event_participants.event_id)))));



  create policy "Users can register for events"
  on "public"."event_participants"
  as permissive
  for insert
  to public
with check ((auth.uid() = user_id));



  create policy "event_roles_public_read"
  on "public"."event_roles"
  as permissive
  for select
  to public
using (true);



  create policy "Creators can manage their events"
  on "public"."events"
  as permissive
  for all
  to public
using ((auth.uid() = creator_id));



  create policy "Events are viewable by everyone"
  on "public"."events"
  as permissive
  for select
  to public
using (true);



  create policy "Profiles are viewable by everyone"
  on "public"."profiles"
  as permissive
  for select
  to public
using (true);



  create policy "Users can insert their own profile"
  on "public"."profiles"
  as permissive
  for insert
  to public
with check ((auth.uid() = id));



  create policy "Users can update their own profile"
  on "public"."profiles"
  as permissive
  for update
  to public
using ((auth.uid() = id));



  create policy "Artists can manage their own offers"
  on "public"."workshop_offers"
  as permissive
  for all
  to public
using ((auth.uid() = artist_id));



  create policy "Workshop offers are viewable by everyone"
  on "public"."workshop_offers"
  as permissive
  for select
  to public
using (true);


CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_workshop_offers_updated_at BEFORE UPDATE ON public.workshop_offers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


  create policy "Anyone can view avatars"
  on "storage"."objects"
  as permissive
  for select
  to public
using ((bucket_id = 'avatars'::text));



  create policy "Authenticated users can upload avatars"
  on "storage"."objects"
  as permissive
  for insert
  to public
with check (((bucket_id = 'avatars'::text) AND (auth.role() = 'authenticated'::text)));



  create policy "Public Access"
  on "storage"."objects"
  as permissive
  for insert
  to public
with check ((bucket_id = 'avatars'::text));



  create policy "Public View"
  on "storage"."objects"
  as permissive
  for select
  to public
using ((bucket_id = 'avatars'::text));



  create policy "Users can delete their own avatar"
  on "storage"."objects"
  as permissive
  for delete
  to public
using (((bucket_id = 'avatars'::text) AND (auth.uid() = owner)));



  create policy "Users can update their own avatar"
  on "storage"."objects"
  as permissive
  for update
  to public
using (((bucket_id = 'avatars'::text) AND (auth.uid() = owner)));



