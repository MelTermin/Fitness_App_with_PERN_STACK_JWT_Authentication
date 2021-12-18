CREATE TABLE users (
  user_id UUID DEFAULT uuid_generate_v4(),
  user_name varchar(255) not null,
  user_email varchar(255) not null unique,
  user_password varchar(255) not null,
  primary key(user_id)
);

CREATE TABLE tracker_form (
  tracker_form_id SERIAL,
  user_id UUID,
  exercise VARCHAR(200),
  repetition VARCHAR(200),
  weight VARCHAR(200),
  duration VARCHAR(200),
  date DATE DEFAULT CURRENT_DATE,
  PRIMARY KEY(tracker_form_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);