CREATE TABLE mothers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(50),
  location_preference VARCHAR(1) CHECK (location_preference IN ('N', 'S', 'E', 'W')),
  availability_notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE groups (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  leader_mother_id INTEGER NOT NULL,
  location_region VARCHAR(1) NOT NULL CHECK (location_region IN ('N', 'S', 'E', 'W')),
  capacity INTEGER NOT NULL DEFAULT 12,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_groups_leader
    FOREIGN KEY (leader_mother_id) REFERENCES mothers(id)
    ON DELETE RESTRICT
);

CREATE TABLE group_meetings (
  id SERIAL PRIMARY KEY,
  group_id INTEGER NOT NULL,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  meeting_day VARCHAR(20) NOT NULL,
  start_time VARCHAR(10) NOT NULL,
  end_time VARCHAR(10) NOT NULL,
  location_text VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_group_meetings_group
    FOREIGN KEY (group_id) REFERENCES groups(id)
    ON DELETE CASCADE
);

CREATE TABLE applications (
  id SERIAL PRIMARY KEY,
  mother_id INTEGER NOT NULL,
  group_id INTEGER NOT NULL,
  reviewer_mother_id INTEGER,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  status VARCHAR(30) NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'interview_scheduled', 'accepted', 'rejected')),
  availability_notes TEXT,
  interview_scheduled_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_applications_mother
    FOREIGN KEY (mother_id) REFERENCES mothers(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_applications_group
    FOREIGN KEY (group_id) REFERENCES groups(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_applications_reviewer
    FOREIGN KEY (reviewer_mother_id) REFERENCES mothers(id)
    ON DELETE SET NULL
);

CREATE TABLE group_memberships (
  id SERIAL PRIMARY KEY,
  mother_id INTEGER NOT NULL,
  group_id INTEGER NOT NULL,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'inactive')),
  joined_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_group_memberships UNIQUE (mother_id, group_id),
  CONSTRAINT fk_group_memberships_mother
    FOREIGN KEY (mother_id) REFERENCES mothers(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_group_memberships_group
    FOREIGN KEY (group_id) REFERENCES groups(id)
    ON DELETE CASCADE
);
