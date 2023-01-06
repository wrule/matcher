
const pattern = `function ^[a-zA-Z_][a-zA-Z0-9_]* ( ) { }`;

const p = {
  '$id': /^[a-zA-Z_][a-zA-Z0-9_]*/,
  '$number': /^\d+/,
  '$assignment': `$id = $number`,
  '$function': `function $id ( ) { $paragraph }`,
  '$statement': ['$assignment', '$function'],
  '$paragraph': '$command*',
};

const doc = `
function main() {

}`;

function
match_pop(doc: string, matcher: string | RegExp) {
  if (matcher instanceof RegExp || matcher.startsWith('^')) {
    const regex = new RegExp(matcher);
    const result = regex.exec(doc);
    if (result) return { matcher, result: result[0], next: doc.slice(result[0].length) };
  } else if (doc.startsWith(matcher))
    return { matcher, result: matcher, next: doc.slice(matcher.length) };
  throw { doc, matcher };
}

function parse(pattern: string, doc: string) {
  const result: [string | RegExp, string][] = [];
  const matchers = pattern.split(/\s+/);
  doc = match_pop(doc, /\s*/).next;
  matchers.forEach((matcher) => {
    const matcher_result = match_pop(doc, matcher);
    result.push([matcher_result.matcher, matcher_result.result]);
    doc = matcher_result.next;
    doc = match_pop(doc, /\s*/).next;
  });
  return result;
}

function main() {
  console.log(parse(pattern, doc));
}

main();