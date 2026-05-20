const { after, before, test } = require('node:test');
const assert = require('node:assert/strict');
const { existsSync, rmSync } = require('fs');
const path = require('path');
const request = require('supertest');

const dbPath = path.join(__dirname, 'project-alpha.e2e.sqlite');
let app;

before(async () => {
  process.env.PROJECT_ALPHA_DB_LOCATION = dbPath;
  process.env.PROJECT_ALPHA_DB_AUTOSAVE = 'true';

  if (existsSync(dbPath)) {
    rmSync(dbPath, { force: true });
  }

  const { createApp } = require('../dist/create-app');
  app = await createApp();
  await app.init();
});

after(async () => {
  if (app) {
    await app.close();
  }

  if (existsSync(dbPath)) {
    rmSync(dbPath, { force: true });
  }
});

test('creates the main related records through the API', async () => {
  const dashboardResponse = await request(app.getHttpServer()).get('/');
  assert.equal(dashboardResponse.status, 200);
  assert.match(dashboardResponse.text, /Project Alpha Prototype Dashboard/);

  const docsResponse = await request(app.getHttpServer()).get('/docs-json');
  assert.equal(docsResponse.status, 200);
  assert.equal(docsResponse.body.info.title, 'Project Alpha Prototype API');

  const leaderResponse = await request(app.getHttpServer()).post('/mothers').send({
    name: 'Leader Mom',
    email: 'leader@example.com',
    locationPreference: 'N',
  });

  assert.equal(leaderResponse.status, 201);

  const applicantResponse = await request(app.getHttpServer()).post('/mothers').send({
    name: 'Applicant Mom',
    email: 'applicant@example.com',
    locationPreference: 'N',
  });

  assert.equal(applicantResponse.status, 201);

  const groupResponse = await request(app.getHttpServer()).post('/groups').send({
    name: 'North Morning Group',
    leaderMotherId: leaderResponse.body.id,
    locationRegion: 'N',
    capacity: 10,
  });

  assert.equal(groupResponse.status, 201);

  const meetingResponse = await request(app.getHttpServer()).post('/group-meetings').send({
    groupId: groupResponse.body.id,
    name: 'Wednesday Study',
    meetingDay: 'Wednesday',
    startTime: '09:00',
    endTime: '11:00',
    locationText: 'North Community Hall',
  });

  assert.equal(meetingResponse.status, 201);

  const applicationResponse = await request(app.getHttpServer()).post('/applications').send({
    motherId: applicantResponse.body.id,
    groupId: groupResponse.body.id,
    reviewerMotherId: leaderResponse.body.id,
    name: 'Application for North Morning Group',
    status: 'accepted',
  });

  assert.equal(applicationResponse.status, 201);

  const membershipResponse = await request(app.getHttpServer()).post('/group-memberships').send({
    motherId: applicantResponse.body.id,
    groupId: groupResponse.body.id,
    name: 'North Morning Membership',
  });

  assert.equal(membershipResponse.status, 201);

  const groupsListResponse = await request(app.getHttpServer()).get('/groups');
  assert.equal(groupsListResponse.status, 200);
  assert.equal(groupsListResponse.body.length, 1);
  assert.equal(groupsListResponse.body[0].meetings.length, 1);

  const membershipsListResponse = await request(app.getHttpServer()).get('/group-memberships');
  assert.equal(membershipsListResponse.status, 200);
  assert.equal(membershipsListResponse.body.length, 1);
  assert.equal(membershipsListResponse.body[0].mother.id, applicantResponse.body.id);
  assert.equal(membershipsListResponse.body[0].group.id, groupResponse.body.id);
});
