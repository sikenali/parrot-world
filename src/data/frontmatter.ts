export interface ParsedDoc {
  data: Record<string, unknown>;
  content: string;
}

export function parseFrontmatter(raw: string): ParsedDoc {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  return { data: parseYaml(match[1]), content: match[2] || '' };
}

export function parseYaml(text: string): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  const lines = text.split(/\r?\n/);
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      i++;
      continue;
    }

    if (trimmed.startsWith('- ')) {
      i++;
      continue;
    }

    const sep = trimmed.indexOf(':');
    if (sep === -1) {
      i++;
      continue;
    }

    const key = trimmed.slice(0, sep).trim();
    let value = trimmed.slice(sep + 1).trim();

    if (value === '') {
      const nested = collectNested(lines, i + 1);
      if (nested.listItems.length > 0) {
        out[key] = nested.listItems;
      } else if (Object.keys(nested.pairs).length > 0) {
        out[key] = nested.pairs;
      } else {
        out[key] = '';
      }
      i = nested.nextIndex;
      continue;
    }

    out[key] = parseScalar(value);
    i++;
  }

  return out;
}

function collectNested(
  lines: string[],
  start: number,
): { listItems: unknown[]; pairs: Record<string, unknown>; nextIndex: number } {
  const listItems: unknown[] = [];
  const pairs: Record<string, unknown> = {};
  let i = start;
  let baseIndent = -1;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith('#')) {
      i++;
      continue;
    }
    const indent = line.length - line.trimStart().length;
    if (baseIndent === -1) baseIndent = indent;
    if (indent < baseIndent) break;

    const trimmed = line.trim();
    if (trimmed.startsWith('- ')) {
      const rest = trimmed.slice(2).trim();
      const objSep = rest.indexOf(':');
      if (objSep !== -1) {
        const obj: Record<string, unknown> = {};
        const objKey = rest.slice(0, objSep).trim();
        let objValue = rest.slice(objSep + 1).trim();
        if (objValue === '') {
          objValue = '';
        }
        obj[objKey] = parseScalar(objValue);
        listItems.push(obj);
        i++;
        continue;
      }
      listItems.push(parseScalar(rest));
      i++;
      continue;
    }

    const sep = trimmed.indexOf(':');
    if (sep === -1) {
      i++;
      continue;
    }
    const key = trimmed.slice(0, sep).trim();
    const value = trimmed.slice(sep + 1).trim();
    pairs[key] = parseScalar(value);
    i++;
    continue;
  }

  return { listItems, pairs, nextIndex: i };
}

function parseScalar(value: string): unknown {
  if (value.length >= 2 && value.startsWith('"') && value.endsWith('"')) {
    return value.slice(1, -1);
  }
  if (value.length >= 2 && value.startsWith("'") && value.endsWith("'")) {
    return value.slice(1, -1);
  }
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value === 'null' || value === '~') return null;
  if (value !== '' && !isNaN(Number(value))) {
    const num = Number(value);
    if (Number.isFinite(num)) return num;
  }
  return value;
}
