// export-db.mjs
// Usage:
//   SUPABASE_SERVICE_KEY=eyJ... node export-db.mjs           # dump full
//   SUPABASE_SERVICE_KEY=eyJ... node export-db.mjs --peek    # chỉ đếm + schema
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs/promises';
import path from 'node:path';

const URL = 'https://dkwlzsamdpgzbusakmmh.supabase.co';
const KEY = process.env.SUPABASE_SERVICE_KEY;
if (!KEY) {
  console.error('❌ Thiếu env SUPABASE_SERVICE_KEY.');
  console.error('   Lấy tại: Supabase Dashboard → Settings → API → service_role (secret).');
  console.error('   Chạy: SUPABASE_SERVICE_KEY=... node export-db.mjs');
  process.exit(1);
}

const PEEK = process.argv.includes('--peek');
const OUT = './dump';
const sb = createClient(URL, KEY, { auth: { persistSession: false } });

// List toàn bộ bảng + view trong schema public
async function listTables() {
  // PostgREST không có endpoint list tables, dùng RPC pg_catalog qua /rest/v1/rpc
  // Fallback: gọi thẳng PostgREST OpenAPI
  const res = await fetch(`${URL}/rest/v1/`, {
    headers: { apikey: KEY, Authorization: `Bearer ${KEY}` },
  });
  if (!res.ok) throw new Error(`OpenAPI ${res.status}: ${await res.text()}`);
  const spec = await res.json();
  // PostgREST trả /definitions chứa mọi table/view
  return Object.keys(spec.definitions || spec.components?.schemas || {})
    .filter(n => !n.startsWith('_'))
    .sort();
}

// Lấy schema chi tiết 1 bảng
async function getSchema(table) {
  const { data, error } = await sb.rpc('execute_sql', {
    sql: `select column_name, data_type, is_nullable, column_default
          from information_schema.columns
          where table_schema='public' and table_name='${table}'
          order by ordinal_position`,
  }).maybeSingle?.() ?? {};
  // Nếu không có RPC execute_sql, fallback dùng OpenAPI spec
  return null;
}

async function dumpTable(table) {
  const rows = [];
  let from = 0;
  const PAGE = 1000;
  while (true) {
    const { data, error } = await sb
      .from(table)
      .select('*')
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`[${table}] ${error.message}`);
    if (!data || data.length === 0) break;
    rows.push(...data);
    if (data.length < PAGE) break;
    from += PAGE;
  }
  return rows;
}

(async () => {
  console.log('▶ URL:', URL);
  console.log('▶ Mode:', PEEK ? 'PEEK (counts only)' : 'FULL DUMP');
  console.log('');

  let tables;
  try {
    tables = await listTables();
  } catch (e) {
    console.error('❌ Không list được bảng:', e.message);
    console.error('   → Service_role key sai hoặc RLS block. Kiểm tra key.');
    process.exit(1);
  }

  console.log(`▶ ${tables.length} bảng/view tìm thấy:\n   ${tables.join(', ')}\n`);

  if (!PEEK) await fs.mkdir(OUT, { recursive: true });

  const summary = [];
  for (const t of tables) {
    try {
      if (PEEK) {
        const { count, error } = await sb.from(t).select('*', { count: 'exact', head: true });
        if (error) { summary.push({ table: t, rows: '?', err: error.message }); continue; }
        summary.push({ table: t, rows: count });
      } else {
        const rows = await dumpTable(t);
        const file = path.join(OUT, `${t}.json`);
        await fs.writeFile(file, JSON.stringify(rows, null, 2));
        summary.push({ table: t, rows: rows.length, file });
      }
    } catch (e) {
      summary.push({ table: t, rows: '?', err: e.message });
    }
  }

  console.log('\n📊 KẾT QUẢ:');
  console.table(summary);

  if (!PEEK) {
    await fs.writeFile(path.join(OUT, '_summary.json'), JSON.stringify(summary, null, 2));
    console.log(`\n✅ Dump xong → ${path.resolve(OUT)}/`);
    console.log('   Mỗi bảng 1 file JSON + _summary.json');
  }
})();