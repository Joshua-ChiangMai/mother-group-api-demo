export function renderDashboardPage() {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Project Alpha Prototype</title>
    <style>
      :root {
        --bg: #f3efe6;
        --panel: #fffdf8;
        --ink: #213547;
        --muted: #6b7280;
        --accent: #a8442f;
        --accent-soft: #f7dfd8;
        --border: #e6dccd;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: Georgia, "Times New Roman", serif;
        background:
          radial-gradient(circle at top right, rgba(168, 68, 47, 0.12), transparent 28%),
          linear-gradient(180deg, #f8f3ea 0%, var(--bg) 100%);
        color: var(--ink);
      }
      .shell {
        max-width: 1280px;
        margin: 0 auto;
        padding: 32px 20px 56px;
      }
      .hero {
        background: linear-gradient(135deg, rgba(168, 68, 47, 0.95), rgba(120, 56, 35, 0.9));
        color: white;
        border-radius: 24px;
        padding: 28px;
        box-shadow: 0 24px 60px rgba(60, 32, 22, 0.18);
      }
      .hero h1 {
        margin: 0 0 10px;
        font-size: clamp(2rem, 4vw, 3.25rem);
      }
      .hero p {
        margin: 0 0 18px;
        max-width: 760px;
        line-height: 1.6;
      }
      .hero-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
      }
      .hero-actions a, button {
        cursor: pointer;
      }
      .link-pill, .action {
        border: none;
        border-radius: 999px;
        padding: 10px 16px;
        text-decoration: none;
        font-size: 0.95rem;
      }
      .link-pill {
        background: rgba(255, 255, 255, 0.16);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.26);
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 18px;
        margin-top: 24px;
      }
      .card {
        background: var(--panel);
        border: 1px solid var(--border);
        border-radius: 20px;
        padding: 18px;
        box-shadow: 0 16px 40px rgba(80, 56, 40, 0.08);
      }
      .card h2 {
        margin: 0 0 8px;
        font-size: 1.35rem;
      }
      .meta {
        color: var(--muted);
        font-size: 0.95rem;
        margin-bottom: 12px;
        line-height: 1.5;
      }
      textarea, pre {
        width: 100%;
        border-radius: 16px;
        border: 1px solid var(--border);
        background: #fffaf2;
        padding: 12px;
        font-family: Consolas, Monaco, monospace;
        font-size: 0.9rem;
      }
      textarea {
        min-height: 188px;
        resize: vertical;
      }
      pre {
        min-height: 160px;
        overflow: auto;
        white-space: pre-wrap;
        word-break: break-word;
      }
      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin: 12px 0;
      }
      .action {
        background: var(--accent);
        color: white;
      }
      .action.secondary {
        background: var(--accent-soft);
        color: var(--accent);
      }
      .footer-note {
        margin-top: 18px;
        color: var(--muted);
        font-size: 0.95rem;
      }
      @media (max-width: 640px) {
        .shell { padding: 18px 14px 32px; }
        .hero { padding: 20px; border-radius: 20px; }
        .card { padding: 16px; }
      }
    </style>
  </head>
  <body>
    <div class="shell">
      <section class="hero">
        <h1>Project Alpha Prototype Dashboard</h1>
        <p>
          This page gives you a lightweight visual way to test the standalone NestJS prototype.
          Use the cards below to load data or create new records, and use Swagger for more complete API exploration.
        </p>
        <div class="hero-actions">
          <a class="link-pill" href="/docs" target="_blank" rel="noreferrer">Open Swagger</a>
          <a class="link-pill" href="/docs-json" target="_blank" rel="noreferrer">Open Swagger JSON</a>
        </div>
      </section>

      <section class="grid" id="cards"></section>

      <p class="footer-note">
        Default app URL: <strong>http://localhost:3001</strong>. This dashboard uses same-origin requests to the API.
      </p>
    </div>

    <script>
      const resources = [
        {
          key: 'mothers',
          title: 'Mothers',
          description: 'Applicants and group leaders.',
          sample: {
            name: 'Jane Doe',
            email: 'jane@example.com',
            phone: '080-111-2222',
            locationPreference: 'N',
            availabilityNotes: 'Weekday mornings work best.'
          }
        },
        {
          key: 'groups',
          title: 'Groups',
          description: 'Bible study groups led by a mother record.',
          sample: {
            name: 'North Sunrise Group',
            leaderMotherId: 1,
            locationRegion: 'N',
            capacity: 12,
            description: 'A prototype morning study group.'
          }
        },
        {
          key: 'group-meetings',
          title: 'Group Meetings',
          description: 'Regular meeting slots for a group.',
          sample: {
            groupId: 1,
            name: 'Wednesday Gathering',
            meetingDay: 'Wednesday',
            startTime: '09:00',
            endTime: '11:00',
            locationText: 'North Community Hall'
          }
        },
        {
          key: 'applications',
          title: 'Applications',
          description: 'An applicant mother applying to a group.',
          sample: {
            motherId: 2,
            groupId: 1,
            reviewerMotherId: 1,
            name: 'Application for North Sunrise Group',
            status: 'pending',
            availabilityNotes: 'Can interview next Tuesday.'
          }
        },
        {
          key: 'group-memberships',
          title: 'Group Memberships',
          description: 'Accepted mothers who become active members.',
          sample: {
            motherId: 2,
            groupId: 1,
            name: 'North Sunrise Membership',
            status: 'active'
          }
        }
      ];

      function formatJson(value) {
        return JSON.stringify(value, null, 2);
      }

      function renderCards() {
        const container = document.getElementById('cards');

        container.innerHTML = resources.map((resource) => \`
          <article class="card">
            <h2>\${resource.title}</h2>
            <div class="meta">\${resource.description}<br />Endpoint: <code>/\${resource.key}</code></div>
            <textarea id="payload-\${resource.key}">\${formatJson(resource.sample)}</textarea>
            <div class="actions">
              <button class="action secondary" data-action="load" data-key="\${resource.key}">Load All</button>
              <button class="action" data-action="create" data-key="\${resource.key}">Create Record</button>
            </div>
            <pre id="output-\${resource.key}">No requests yet.</pre>
          </article>
        \`).join('');
      }

      async function apiRequest(resourceKey, method, body) {
        const response = await fetch('/' + resourceKey, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: body ? JSON.stringify(body) : undefined
        });

        const text = await response.text();
        let parsed;

        try {
          parsed = JSON.parse(text);
        } catch {
          parsed = text;
        }

        return {
          status: response.status,
          ok: response.ok,
          body: parsed
        };
      }

      async function handleAction(event) {
        const button = event.target.closest('button[data-action]');

        if (!button) {
          return;
        }

        const action = button.dataset.action;
        const key = button.dataset.key;
        const output = document.getElementById('output-' + key);
        const textarea = document.getElementById('payload-' + key);

        output.textContent = 'Loading...';

        try {
          if (action === 'load') {
            const result = await apiRequest(key, 'GET');
            output.textContent = formatJson(result);
            return;
          }

          const payload = JSON.parse(textarea.value);
          const result = await apiRequest(key, 'POST', payload);
          output.textContent = formatJson(result);
        } catch (error) {
          output.textContent = formatJson({
            error: error.message || 'Request failed'
          });
        }
      }

      renderCards();
      document.addEventListener('click', handleAction);
    </script>
  </body>
</html>`;
}
