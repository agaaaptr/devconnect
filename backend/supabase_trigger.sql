create function public.handle_new_user() returns trigger as $$ 
begin 
  insert into public.users (id, email, username, name) 
  values ( 
    new.id, 
    new.email, 
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)), 
    coalesce(new.raw_user_meta_data->>'name', new.email) 
  );
  return new; 
end; 
$$ language plpgsql security definer;

create trigger on_auth_user_created 
after insert on auth.users 
for each row execute procedure public.handle_new_user();